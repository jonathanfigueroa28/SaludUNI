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
    { 
        name: 'Medicina General', 
        schedules: {
            '2024-12-24': ['09:00 AM', '10:00 AM', '11:00 AM'],
            '2024-12-25': ['09:00 AM', '10:00 AM', '11:00 AM']
        },
        image: 'https://magnetosur.com/wp-content/uploads/2021/11/Que-diferencias-existen-entre-la-medicina-general-y-la-medicina-interna.jpg', 
        description: 'La medicina general es la especialidad médica que se encarga de la atención integral del paciente y de la familia, abordando problemas de salud en cualquier etapa de la vida.'
    },
    { 
        name: 'Oftalmología', 
        schedules: {
            '2024-12-24': ['08:00 AM', '10:00 AM', '12:00 PM'],
            '2024-12-25': ['08:00 AM', '10:00 AM', '12:00 PM']
        },
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpfB915OjuAJvR8NlW0fv9IDZLfz3doYp_Bw&s',
        description: 'La oftalmología es la especialidad médica que se encarga de la prevención, diagnóstico y tratamiento de enfermedades del ojo y estructuras anexas.'
    },
    { 
        name: 'Dermatología', 
        schedules: {
            '2024-12-24': ['02:00 PM', '03:00 PM', '04:00 PM']
            },
        image: 'https://dermatologia.pe/wp-content/uploads/2023/12/Que-hay-que-estudiar-para-ser-dermatologo.jpg',
        description: 'La dermatología es la especialidad médica que se encarga del estudio de la piel, sus estructuras, funciones y enfermedades, así como de la prevención y tratamiento de las mismas.'
    },
    { 
        name: 'Nutrición', 
        schedules: {
            '2024-12-24': ['03:00 PM', '04:00 PM', '05:00 PM']
        },
        image: 'https://images.griddo.universitatcarlemany.com/la-importancia-de-la-nutricion-en-la-salud-1',
        description: 'La nutrición es la ciencia que estudia los alimentos, la digestión, la absorción, el metabolismo y los efectos de los alimentos en la salud y la enfermedad.' 
    },
    { 
        name: 'Psicología', 
        schedules: {
            '2024-12-24': ['04:00 PM', '05:00 PM', '06:00 PM'],
            '2024-12-25': ['04:00 PM', '05:00 PM', '06:00 PM'],
            '2024-12-26': ['04:00 PM', '05:00 PM', '06:00 PM']
        } ,
        image: 'https://static.wikia.nocookie.net/psicologia/images/7/73/Que-es-psicologia.jpg/revision/latest?cb=20181002142724&path-prefix=es',
        description: 'La psicología es la ciencia que estudia la conducta y los procesos mentales de los individuos, así como sus relaciones con el entorno y la sociedad.'
    },
    { 
        name: 'Odontología', 
        schedules: {
            '2024-12-24': ['10:00 AM', '11:00 AM', '12:00 PM'],
            '2024-12-25': ['10:00 AM', '11:00 AM', '12:00 PM'],
            '2024-12-26': ['10:00 AM', '11:00 AM', '12:00 PM'],
            '2024-12-27': ['10:00 AM', '11:00 AM', '12:00 PM'],

        },

        image: 'https://www.teeth22.com/wp-content/uploads/2020/03/absceso-dental-800x399.png',
        description: 'La odontología es la especialidad médica que se encarga del estudio, diagnóstico, prevención y tratamiento de las enfermedades y trastornos de la cavidad oral y estructuras anexas.'

    },
    { 
        name: 'Ginecología', 
        schedules: {
            '2024-12-24': ['08:00 AM', '10:30 AM', '12:00 PM'],
            '2024-12-25': ['08:00 AM', '10:30 AM', '12:00 PM'],
            '2024-12-26': ['08:00 AM', '10:30 AM', '12:00 PM'],
            '2024-12-27': ['08:00 AM', '10:30 AM', '12:00 PM'],
        }, 
        image: 'https://www.infobae.com/resizer/v2/MA2ENCICCBBCPKREAKQBEEVXUY.png?auth=4a071b7ecf4cdb2648d585da96889f034a8df70bb607cc1eaddd6bf972586f97&smart=true&width=350&height=214&quality=85',
        description: 'La ginecología es la especialidad médica que se encarga del estudio, diagnóstico, prevención y tratamiento de las enfermedades del sistema reproductor femenino.'
    },
    {
        name: 'Psiquiatría',
        schedules:  {
            '2024-12-24': ['08:00 AM', '10:30 AM', '12:00 PM'],
            '2024-12-25': ['08:00 AM', '10:30 AM', '12:00 PM'],
            '2024-12-26': ['08:00 AM', '10:30 AM', '12:00 PM'],
            '2024-12-27': ['08:00 AM', '10:30 AM', '12:00 PM'],
        },
        image: 'https://www.hospitalhuaycan.gob.pe/assets/img/servicios/psiquiatria.jpg',
        description: 'La psiquiatría es la especialidad médica que se encarga del estudio, diagnóstico, prevención y tratamiento de los trastornos mentales y emocionales.'
    }
];

app.get('/api/specialties', (req, res) => {
    res.json(specialties);
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
app.get('/api/schedules/:specialty/:day', (req, res) => {
    const specialty = specialties.find(s => s.name === req.params.specialty);
    if (specialty) {
        const schedules = specialty.schedules[req.params.day];
        if (schedules) {
            res.json(schedules);
        } else {
            res.status(404).send('No schedules available for the selected day');
        }
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
