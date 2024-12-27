import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ScheduledAppointments() {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        axios.get('/api/appointments')
            .then(response => setAppointments(response.data))
            .catch(error => console.error('Error fetching appointments:', error));
    }, []);

    return (
        <div>
            <h2>Citas Programadas</h2>
            <ul>
                {appointments.map((appointment, index) => (
                    <li key={index}>{appointment.specialty} ({appointment.schedule})</li>
                ))}
            </ul>
        </div>
    );
}

export default ScheduledAppointments;
