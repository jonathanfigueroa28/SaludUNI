import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Cita.css';

function AppointmentScheduler() {
    const [specialties, setSpecialties] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [selectedSpecialty, setSelectedSpecialty] = useState('');
    const [selectedSchedule, setSelectedSchedule] = useState('');
    const [patientName, setPatientName] = useState('');

    useEffect(() => {
        axios.get('/api/specialties')
            .then(response => setSpecialties(response.data))
            .catch(error => console.error('Error fetching specialties:', error));

        axios.get('/api/appointments')
            .then(response => setAppointments(response.data))
            .catch(error => console.error('Error fetching appointments:', error));
    }, []);

    const fetchSchedules = (specialty) => {
        console.log('Fetching schedules for:', specialty);
        axios.get(`/api/schedules/${specialty}`)
            .then(response => {
                console.log('Schedules received:', response.data);
                setSchedules(response.data);
            })
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
        patient: patientName 
    };

    console.log('Appointment to send:', newAppointment);

    axios.post('/api/appointments', newAppointment)
        .then(response => {
            setAppointments([...appointments, response.data]);
        })
        .catch(error => console.error('Error adding appointment:', error));
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
                <>
                    <h3>Agendar Cita</h3>
                    <label>
                        Nombre del Paciente:
                        <input 
                            type="text" 
                            value={patientName} 
                            onChange={e => setPatientName(e.target.value)} 
                        />
                    </label>
                    <button onClick={handleAddAppointment}>Confirmar Cita</button>
                </>
            )}

            <h2>Citas Programadas</h2>
            <ul>
                {appointments.map((appointment, index) => (
                    <li key={index}>{appointment.patient} - {appointment.specialty} ({appointment.schedule})</li>
                ))}
            </ul>

            <Link to="/">Volver a Inicio</Link>
        </div>
    );
}

export default AppointmentScheduler;

