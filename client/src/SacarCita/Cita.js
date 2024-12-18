import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Cita.css';

function AppointmentScheduler() {
    const [specialties, setSpecialties] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const [selectedSpecialty, setSelectedSpecialty] = useState('');
    const [selectedSchedule, setSelectedSchedule] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/api/specialties')
            .then(response => setSpecialties(response.data))
            .catch(error => console.error('Error fetching specialties:', error));
    }, []);

    const fetchSchedules = (specialty) => {
        axios.get(`/api/schedules/${specialty}`)
            .then(response => setSchedules(response.data))
            .catch(error => console.error('Error fetching schedules:', error));
    };

    const handleSpecialtyClick = (specialty) => {
        setSelectedSpecialty(specialty);
        fetchSchedules(specialty);
    };

    const handleAddAppointment = () => {
        const newAppointment = {
            specialty: selectedSpecialty,
            schedule: selectedSchedule,
        };
    
        console.log('Datos enviados al servidor:', newAppointment);
    
        axios.post('/api/appointments', newAppointment)
            .then(() => {
                console.log('Cita registrada exitosamente.');
                navigate('/citas-programadas');
            })
            .catch(error => {
                console.error('Error al registrar cita:', error);
            });
    };
    

    return (
        <div>
            <h2>Selecciona una Especialidad</h2>
            <div className="specialties">
                {specialties.map(specialty => (
                    <button 
                        key={specialty} 
                        onClick={() => handleSpecialtyClick(specialty)} 
                        className={`specialty ${selectedSpecialty === specialty ? 'active' : ''}`}>
                        {specialty}
                    </button>
                ))}
            </div>

            {selectedSpecialty && (
                <>
                    <h3>Horarios Disponibles para {selectedSpecialty}</h3>
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
                </>
            )}

            {selectedSchedule && (
                <button onClick={handleAddAppointment}>Confirmar Cita</button>
            )}
        </div>
    );
}

export default AppointmentScheduler;