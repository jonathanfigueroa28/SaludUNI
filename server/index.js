const express = require('express');
const app = express();
const port = 3001;

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    next();
});

let appointments = [];

const specialties = [
    { name: 'Cardiología', schedules: ['09:00 AM', '10:00 AM', '11:00 AM'] },
    { name: 'Dermatología', schedules: ['01:00 PM', '02:00 PM', '03:00 PM'] },
    { name: 'Ginecología', schedules: ['10:00 AM', '11:30 AM', '01:30 PM'] },
    { name: 'Pediatría', schedules: ['08:00 AM', '09:30 AM', '11:00 AM'] },
    { name: 'Neurología', schedules: ['02:00 PM', '03:30 PM', '04:00 PM'] },
    { name: 'Oftalmología', schedules: ['09:00 AM', '11:00 AM', '01:00 PM'] },
    { name: 'Oncología', schedules: ['10:00 AM', '12:30 PM', '02:30 PM'] }
];

// Endpoint para obtener especialidades
app.get('/api/specialties', (req, res) => {
    res.json(specialties.map(s => s.name));
    console.log('Specialties:', specialties.map(s => s.name));
});

// Endpoint para obtener horarios disponibles por especialidad
app.get('/api/schedules/:specialty', (req, res) => {
    const specialty = specialties.find(s => s.name === req.params.specialty);
    if (specialty) {
        res.json(specialty.schedules);
        console.log(`Schedules for ${req.params.specialty}:`, specialty.schedules);
    } else {
        res.status(404).send('Specialty not found');
    }
});

// Endpoint para obtener todas las citas
app.get('/api/appointments', (req, res) => {
    res.json(appointments);
});

// Endpoint para agregar una nueva cita
app.post('/api/appointments', (req, res) => {
    const { specialty, schedule } = req.body;

    // Validar que los campos obligatorios estén presentes
    if (!specialty || !schedule) {
        console.error('Invalid appointment data:', req.body);
        return res.status(400).json({ error: 'Missing specialty or schedule' });
    }

    // Agregar la cita si los datos son válidos
    const appointment = { specialty, schedule };
    appointments.push(appointment);
    console.log('Appointment added:', appointment);
    res.status(201).json(appointment);
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
