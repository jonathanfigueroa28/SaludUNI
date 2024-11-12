import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [specialties, setSpecialties] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [selectedSpecialty, setSelectedSpecialty] = useState('');
    const [patientName, setPatientName] = useState('');

    useEffect(() => {
        axios.get('/api/specialties')
            .then(response => setSpecialties(response.data))
            .catch(error => console.error('Error fetching specialties:', error));

        axios.get('/api/appointments')
            .then(response => setAppointments(response.data))
            .catch(error => console.error('Error fetching appointments:', error));
    }, []);

    const handleAddAppointment = () => {
        const newAppointment = { specialty: selectedSpecialty, patient: patientName };
        axios.post('/api/appointments', newAppointment)
            .then(response => setAppointments([...appointments, response.data]))
            .catch(error => console.error('Error adding appointment:', error));
    };

    return (
        <div className="App">
            <h1>Centro Médico - Gestión de Citas</h1>

            <div>
                <h2>Agendar Nueva Cita</h2>
                <label>
                    Especialidad:
                    <select value={selectedSpecialty} onChange={e => setSelectedSpecialty(e.target.value)}>
                        <option value="">Seleccionar...</option>
                        {specialties.map(specialty => (
                            <option key={specialty} value={specialty}>{specialty}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Nombre del Paciente:
                    <input 
                        type="text" 
                        value={patientName} 
                        onChange={e => setPatientName(e.target.value)} 
                    />
                </label>
                <button onClick={handleAddAppointment}>Agregar Cita</button>
            </div>

            <div>
                <h2>Citas Programadas</h2>
                <ul>
                    {appointments.map((appointment, index) => (
                        <li key={index}>{appointment.patient} - {appointment.specialty}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default App;
