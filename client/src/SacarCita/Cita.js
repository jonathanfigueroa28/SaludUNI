import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Cita.css';

function AppointmentScheduler() {
    const [specialties, setSpecialties] = useState([]);
    const [selectedSpecialty, setSelectedSpecialty] = useState(null);
    const [days, setDays] = useState([]);
    const [selectedDay, setSelectedDay] = useState('');
    const [schedules, setSchedules] = useState([]);
    const [selectedSchedule, setSelectedSchedule] = useState('');
    const [showSummary, setShowSummary] = useState(false);

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
        setSelectedDay('');
        setSchedules([]);
        setSelectedSchedule('');
        setDays(Object.keys(specialty.schedules));
    };

    // Manejar clic en un día
    const handleDayClick = (day) => {
        setSelectedDay(day);
        setSchedules([]); // Reset schedules while fetching new ones

        axios.get(`/api/schedules/${selectedSpecialty.name}/${day}`)
            .then(response => setSchedules(response.data))
            .catch(error => console.error('Error fetching schedules:', error));
    };

    // Confirmar la cita
    const handleAddAppointment = () => {
        const newAppointment = {
            specialty: selectedSpecialty.name,
            schedule: `${selectedDay} ${selectedSchedule}`,
        };

        axios.post('/api/appointments', newAppointment)
            .then(() => navigate('/citas-programadas'))
            .catch(error => console.error('Error adding appointment:', error));
    };

    return (
        <div>
            <h2>Selecciona una Especialidad</h2>
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

            {selectedSpecialty && (
                <div className="specialty-info">
                    <h3>{selectedSpecialty.name}</h3>
                    <p>{selectedSpecialty.description}</p>

                    <h4>Selecciona un Día</h4>
                    <div className="days">
                        {days.map(day => (
                            <button 
                                key={day} 
                                onClick={() => handleDayClick(day)} 
                                className={`day ${selectedDay === day ? 'active' : ''}`}>
                                {day}
                            </button>
                        ))}
                    </div>

                    {selectedDay && (
                        <>
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
                        </>
                    )}
                </div>
            )}

            {selectedSpecialty && selectedDay && selectedSchedule && (
                <div>
                    <button onClick={() => setShowSummary(true)} className="confirm-button">
                        Confirmar Cita
                    </button>
                    
                    {showSummary && (
                        <div className="summary">
                            <h4>Resumen de la Cita</h4>
                            <p>Especialidad: {selectedSpecialty.name}</p>
                            <p>Día: {selectedDay}</p>
                            <p>Horario: {selectedSchedule}</p>
                            <button onClick={handleAddAppointment} className="confirm-button">
                                Confirmar
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default AppointmentScheduler;
