import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Medicamentos.css';

function Medicamentos() {
    const [medicamentos, setMedicamentos] = useState([]); // Lista de medicamentos
    const [selectedMedicamento, setSelectedMedicamento] = useState(null); // Medicamento seleccionado
    const [searchTerm, setSearchTerm] = useState(''); // Término de búsqueda
    const [filteredMedicamentos, setFilteredMedicamentos] = useState([]); // Medicamentos filtrados por búsqueda
    const [separatedMedicamentos, setSeparatedMedicamentos] = useState([]); // Medicamentos separados
    const [showSeparated, setShowSeparated] = useState(false); // Estado para mostrar los medicamentos separados
    const [message, setMessage] = useState(''); // Mensaje para mostrar después de intentar separar un medicamento
  
    // Obtener los medicamentos desde la API
    useEffect(() => {
      axios.get('/api/medicamentos')
        .then(response => setMedicamentos(response.data))
        .catch(error => console.log('Error fetching medicamentos: ', error));
      
      axios.get('/api/separated-medicamentos') //Endpoint para medicamentos separados
          .then(response => setSeparatedMedicamentos(response.data))
          .catch(error => console.log('Error fetching medicamentos', error));
    }, []);

    // Manejo de consultas
    const handleSearch = (term) => {
      setSearchTerm(term);
      const filtered = medicamentos.filter(med =>
        med.nombre.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredMedicamentos(filtered);
    };
    
    // Seleccionar Medicamento
    const handleSelectedMedicamento = (id) => {
      axios.get(`/api/medicamentos/${id}`)
        .then(response => setSelectedMedicamento(response.data))
        .catch(error => console.error('Error fetching medicamento details: ', error));
    };

    // Separar medicamento y enviarlo al backend
    const handleSeparateMedicamento = (med) => {
      // Actualizar el stock localmente en el frontend antes de la solicitud al backend
      const updatedMedicamentos = medicamentos.map(m => {
        if (m.id === med.id && m.stock > 0) {
          return { ...m, stock: m.stock - 1 }; // Decrementar el stock localmente
        }
        return m;
      });
      setMedicamentos(updatedMedicamentos); // Actualizar el estado con el stock actualizado localmente


      const newMed = { id: med.id, nombre: med.nombre, descripcion: med.descripcion };
      axios.post('/api/separated-medicamentos', newMed) // Guardar medicamento separado en el backend
          .then(response => {
              const updatedSeparatedMedicamentos = [...separatedMedicamentos];
              const existingMedicamentoIndex = updatedSeparatedMedicamentos.findIndex(m => m.id === med.id);

              if (existingMedicamentoIndex !== -1) {
                  // Si el medicamento ya está en la lista de separados, actualizamos la cantidad
                  updatedSeparatedMedicamentos[existingMedicamentoIndex].cantidad += 1;
              } else {
                  // Si no está en la lista, lo agregamos con cantidad 1
                  updatedSeparatedMedicamentos.push({ ...med, cantidad: 1 });
              }
              setSeparatedMedicamentos(updatedSeparatedMedicamentos); // Actualizar el estado con el nuevo medicamento
              setMessage('Medicamento separado');
              //setShowSeparated(false); // Ocultar la lista de medicamentos separados después de separar uno
              setSelectedMedicamento(null); // Reiniciar la selección después de la separación
          })
          .catch(error => {
            // Si ocurre un error, revertir la actualización local del stock
            const revertedMedicamentos = medicamentos.map(m => {
              if (m.id === med.id) {
                  return { ...m, stock: m.stock + 1 }; // Revertir la disminución del stock
              }
              return m;
            });
            setMedicamentos(revertedMedicamentos); // Restaurar el stock          
            setMessage('Medicamento no separado')
            console.error('Error adding separated medicamento: ', error)
          });
      //setSelectedMedicamento(null); // Opcional, cerrar detalles del medicamento
    };
    
    const toggleSeparatedMedicamentos = () => {
      setShowSeparated(prevState => !prevState);
    }

return (
    <div>
        <h2>Gestion de Medicamentos</h2>
        <input
            type="text"
            placeholder="Buscar medicamentos ..."
            value={searchTerm}
            onChange={e=>handleSearch(e.target.value)}
        />

        {/* Casilla de búsqueda */}
        <div className="medicamentos-list">
            {(filteredMedicamentos.length > 0 ? filteredMedicamentos : medicamentos).map(med => (
                <button 
                    key={med.id}
                    onClick={() => handleSelectedMedicamento(med.id)}>
                    {med.nombre}
                </button>
            ))}
        </div>
        
        {/* Separar medicamentos */}
        {selectedMedicamento && (
            <div className='medicamento-details'>
                <h3>{selectedMedicamento.nombre}</h3>
                {/* Mostrar el botón solo si hay stock disponible */}
                {selectedMedicamento.stock > 0 ? (
                    <div>
                      <p>Descripcion: {selectedMedicamento.descripcion}</p>
                      <p>Stock: {selectedMedicamento.stock}</p>
                      <p>Disponible: {selectedMedicamento.disponible}</p>
                      <button 
                          onClick={() => handleSeparateMedicamento(selectedMedicamento)}
                      >Separar Medicamento
                      </button>
                    </div>
                ) : (
                    <p>No hay stock disponible para separar este medicamento.</p> // Mensaje opcional cuando no hay stock
                )}
                <button onClick={() => setSelectedMedicamento(null)}>Salir</button>
            </div>
        )}

        {/* Mensaje de acción */}
        {message && <p>{message}</p>}

        {/* Botón para mostrar la lista de medicamentos separados */}
        <button onClick={toggleSeparatedMedicamentos}>
            {showSeparated ? 'Ocultar Medicamentos Separados' : 'Mostrar Medicamentos Separados'}
        </button>

        {/* Mostrar los medicamentos separados */}
        
        {showSeparated && separatedMedicamentos.length > 0 && (
            <div className='separated-medicamentos'>
                <ul>
                    {separatedMedicamentos.map(med => (
                      <li key={med.id}>
                          {med.nombre} - {med.descripcion} - Cantidad: {med.cantidad}
                      </li>
                    ))}
                </ul>
            </div>
        )}
        <Link to="/">Volver a Inicio</Link>
    </div>
  );
}

export default Medicamentos;