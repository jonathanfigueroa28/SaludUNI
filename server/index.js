const express = require('express');
const app = express();
const port = 3001;

app.use(express.json());

let appointments = [];

app.get('/api/specialties', (req, res) => {
    const specialties = [
        'Cardiología',
        'Dermatología',
        'Ginecología',
        'Pediatría',
        'Neurología',
        'Oftalmología',
        'Oncología'
    ];
    res.json(specialties);
});

app.get('/api/appointments', (req, res) => {
    res.json(appointments);
});

app.post('/api/appointments', (req, res) => {
    const appointment = req.body;
    appointments.push(appointment);
    res.status(201).json(appointment);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
