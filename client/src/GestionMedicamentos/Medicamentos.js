import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Medicamentos.css';
import { codigoEstudiante } from '../config'; // Importar la constante centralizada

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
        // Verifica si la imagen se obtiene correctamente
        console.log(medicamentos.map(m => m.imagen)); // Verifica las URLs de las imágenes
      
      axios.get('/api/separated-medicamentos') //Endpoint para medicamentos separados
          .then(response => setSeparatedMedicamentos(response.data))
          .catch(error => console.log('Error fetching medicamentos', error));
    }, []);

    // Manejo de consultas
    const handleSearch = (term) => {
      setSearchTerm(term);
      if(term.trim() === ""){
        setFilteredMedicamentos(medicamentos);
        return;
      }
      const filtered = medicamentos.filter(med =>
        med.nombre.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredMedicamentos(filtered);
    };
    
    const handleSelectedMedicamento = (med) => {
      if (selectedMedicamento && selectedMedicamento.id === med.id) {
          // Si ya está seleccionado, ocultar el detalle
          setSelectedMedicamento(null);
      } else {
          // Si no está seleccionado, mostrar el detalle
          axios.get(`/api/medicamentos/${med.id}`)
              .then(response => setSelectedMedicamento(response.data))
              .catch(error => console.error('Error fetching medicamento details: ', error));
      }
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

      const newMed = { id: med.id, nombre: med.nombre, descripcion: med.descripcion, codigoEstudiante: codigoEstudiante };
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
              setSelectedMedicamento(null); // Reiniciar la selección después de la separación

              // Actualizar el saldo del estudiante
              //const updatedSaldo = response.data.saldo;
              //console.log('Saldo actualizado:', updatedSaldo);
              // Aquí puedes mostrar el saldo actualizado en la interfaz, si lo deseas
          })
          .catch(error => {
            if (error.response && error.response.data && error.response.data.error) {
              setMessage('Saldo insuficiente'); // Mostrar el mensaje de error del backend
            } else {
              setMessage('Error al separar el medicamento');
            }
            // Si ocurre un error, revertir la actualización local del stock
            const revertedMedicamentos = medicamentos.map(m => {
              if (m.id === med.id) {
                  return { ...m, stock: m.stock + 1 }; // Revertir la disminución del stock
              }
              return m;
            });
            setMedicamentos(revertedMedicamentos); // Restaurar el stock          
            console.error('Error adding separated medicamento: ', error)
          });
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
            {(searchTerm && filteredMedicamentos.length === 0) ? (
              // Mensaje si no hay coincidencias
              <p>No se encontraron medicamentos</p>
            ) : (
            (filteredMedicamentos.length > 0 ? filteredMedicamentos : medicamentos).map(med => (
                <button 
                    key={med.id}
                    onClick={() => handleSelectedMedicamento(med)}
                    className={`medicamento ${selectedMedicamento === med.id ? 'active' : ''}`}>
                    {med.nombre}
                </button>
              ))
            )}
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
                      <p>Precio: S/. {selectedMedicamento.precio}</p>
                      <img src={selectedMedicamento.imagen} alt={selectedMedicamento.nombre} style={{ width: '150px', height: '150px' }} />
                      <button 
                          onClick={() => handleSeparateMedicamento(selectedMedicamento)}
                      >Separar Medicamento
                      </button>
                    </div>
                ) : (
                    <p>No hay stock disponible para separar este medicamento.</p> // Mensaje opcional cuando no hay stock
                )}
            
            </div>
        )}

        {/* Mensaje de acción */}
        {message && <p>{message}</p>}

        {/* Botón para mostrar la lista de medicamentos separados */}
        <button onClick={toggleSeparatedMedicamentos}>
            {showSeparated ? 'Ocultar medicamentos separados' : 'Mostrar medicamentos separados'}
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