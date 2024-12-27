import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Medicamento.css';
// import { codigoEstudiante } from '../config'; // Importar la constante centralizada

function Medicamentos() {
    const [medicamentos, setMedicamentos] = useState([]); // Lista de medicamentos                                 check
    const [selectedMedicamento, setSelectedMedicamento] = useState(null); // Medicamento seleccionado
    const [searchTerm, setSearchTerm] = useState(''); // Término de búsqueda                                       check
    const [filteredMedicamentos, setFilteredMedicamentos] = useState([]); // Medicamentos filtrados por búsqueda   check
    const [separatedMedicamentos, setSeparatedMedicamentos] = useState([]); // Medicamentos separados
    const [showSeparated, setShowSeparated] = useState(false); // Estado para mostrar los medicamentos separados
  
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
                    </div>
                ) : (
                  <div>
                    <p>Descripcion: {selectedMedicamento.descripcion}</p>
                    <img src={selectedMedicamento.imagen} alt={selectedMedicamento.nombre} style={{ width: '150px', height: '150px' }} />
                    <p>No hay stock disponible para separar este medicamento.</p>
                  </div>
                )}
            
            </div>
        )}

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