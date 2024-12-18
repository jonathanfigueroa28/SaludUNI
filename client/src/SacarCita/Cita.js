import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Cita.css';

function AppointmentScheduler() {
    const [specialties, setSpecialties] = useState([]);
    const [selectedSpecialty, setSelectedSpecialty] = useState(null);
    const [schedules, setSchedules] = useState([]);
    const [selectedSchedule, setSelectedSchedule] = useState('');

    const navigate = useNavigate();

    // Cargar especialidades desde el backend
    useEffect(() => {
        axios.get('/api/specialties')
            .then(response => setSpecialties(response.data))
            .catch(error => console.error('Error fetching specialties:', error));
    }, []);

    // Manejar clic en una especialidad
    const handleSpecialtyClick = (specialty) => {
        setSelectedSpecialty(specialty);
        setSchedules([]); // Resetear los horarios mientras se cargan

        axios.get(`/api/schedules/${specialty.name}`)
            .then(response => setSchedules(response.data))
            .catch(error => console.error('Error fetching schedules:', error));
    };

    // Confirmar la cita
    const handleAddAppointment = () => {
        const newAppointment = {
            specialty: selectedSpecialty.name,
            schedule: selectedSchedule,
        };

        axios.post('/api/appointments', newAppointment)
            .then(() => navigate('/citas-programadas'))
            .catch(error => console.error('Error adding appointment:', error));
    };

    return (
        <div>
            <h2>Selecciona una Especialidad</h2>
            {/* Mostrar las especialidades en dos columnas */}
            <div className="specialties-grid">
                {specialties.map(specialty => (
                    <div 
                        key={specialty.name} 
                        className={`specialty-card ${selectedSpecialty?.name === specialty.name ? 'active' : ''}`} 
                        onClick={() => handleSpecialtyClick(specialty)}>
                        <img src={specialty.image} alt={specialty.name} className="specialty-image" />
                        <p>{specialty.name}</p>
                    </div>
                ))}
            </div>

            {/* Mostrar la información de la especialidad seleccionada */}
            {selectedSpecialty && (
                <div className="specialty-info">
                    <h3>{selectedSpecialty.name}</h3>
                    <p>{selectedSpecialty.description}</p>

                    {/* Mostrar horarios si están disponibles */}
                    <h4>Horarios Disponibles</h4>
                    {schedules.length > 0 ? (
                        <div className="schedules">
                            {schedules.map(schedule => (
                                <button 
                                    key={schedule} 
                                    onClick={() => setSelectedSchedule(schedule)} 
                                    className={`schedule ${selectedSchedule === schedule ? 'active' : ''}`}>
                                    {schedule}
                                </button>
                            ))}
                        </div>
                    ) : (
                        <p>Cargando horarios...</p>
                    )}
                </div>
            )}

            {/* Mostrar botón para confirmar la cita */}
            {selectedSpecialty && selectedSchedule && (
                <button onClick={handleAddAppointment} className="confirm-button">
                    Confirmar Cita
                </button>
            )}
        </div>
    );
}

export default AppointmentScheduler;
