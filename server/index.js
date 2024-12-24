const express = require('express');
const hashPassword = require('./encriptacion');
const alumnoRoutes = require('./routes/alumnoRoutes');
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

app.get('/api/specialties', (req, res) => {
    res.json(specialties.map(s => s.name));
    console.log('Specialties:', specialties.map(s => s.name));
});

app.get('/api/schedules/:specialty', (req, res) => {
    const specialty = specialties.find(s => s.name === req.params.specialty);
    console.log('Specialty:', specialty);
    if (specialty) {
        res.json(specialty.schedules);
        console.log(`Schedules for ${req.params.specialty}:`, specialty.schedules);
    } else {
        res.status(404).send('Specialty not found');
    }
});

app.get('/api/appointments', (req, res) => {
    res.json(appointments);
});

app.post('/api/appointments', (req, res) => {
    const { specialty, schedule, patient } = req.body;

    // Validar que todos los campos estén presentes
    if (!specialty || !schedule || !patient) {
        console.log('Invalid appointment data');
        console.error('Invalid appointment data:', req.body);
        return res.status(400).json({ error: 'Missing specialty, schedule, or patient' });
    }

    // Agregar la cita si los datos son válidos
    const appointment = { specialty, schedule, patient };
    appointments.push(appointment);
    console.log('Appointment added:', appointment);
    res.status(201).json(appointment);
});

app.use('/api/estudiantes', estudianteRoutes);

app.post('/hash', (req, res) => {
    const { password } = req.body;
    if (!password) {
        return res.status(400).send('La contraseña es requerida');
    }

    const hashedPassword = hashPassword(password);
    res.json({ hashedPassword });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
