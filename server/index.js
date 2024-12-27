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
let separatedMedicamentos = []; // Medicamentos separados

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

const medicamentos = [
    { id: 1, nombre: 'Paracetamol', descripcion: 'Analgésico y antipirético', stock: 50, disponible: 'Sí', precio: 5, 
        imagen: 'https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/108218L.jpg'
    },
    { id: 2, nombre: 'Ibuprofeno', descripcion: 'Antiinflamatorio', stock: 30, disponible: 'Sí' , precio: 4, 
        imagen: 'https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/015814L.jpg'
    },
    { id: 3, nombre: 'Amoxicilina', descripcion: 'Antibiótico', stock: 0, disponible: 'No' , precio: 8, 
        imagen: 'https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/029188L.jpg'
    }
]


const estudiantes = [
    { codigo: '20204587B', password: 'estudiante1', nombre: 'Juan Rodríguez', matriculado: true, saldo: 50},
    { codigo: '20187505J', password: 'estudiante2', nombre: 'José Perez', matriculado: true, saldo: 45},
    { codigo: '20137865C', password: 'estudiante3', nombre: 'Lucía Gómez', matriculado: false, saldo: 0}
]

// const estudiante = {codigo: '20177506B', password: 'admin', nombre: 'Orfeo Fernández', matriculado: true, saldo: 30};

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

app.use('/api/estudiantes', estudianteRoutes);

app.post('/hash', (req, res) => {
    const { password } = req.body;
    if (!password) {
        return res.status(400).send('La contraseña es requerida');
    }

    const hashedPassword = hashPassword(password);
    res.json({ hashedPassword });
});
// Rutas para Medicamentos// Rutas para Medicamentos// Rutas para Medicamentos// Rutas para Medicamentos// Rutas para Medicamentos// Rutas para Medicamentos

// Rutas para Medicamentos
app.get('/api/medicamentos', (req, res) => {
    res.json(medicamentos);
    console.log('Medicamentos fetched: ', medicamentos);
});

// Obtener detalles de un medicamento por ID
app.get('/api/medicamentos/:id', (req, res) => {
    const medicamento = medicamentos.find(m => m.id === parseInt(req.params.id));
    if (medicamento) {
        res.json(medicamento);
        console.log('Medicamento details:', medicamento);
    } else {
        res.status(404).send('Medicamento not found');
    }
});

// Obtener todos los medicamentos separados
app.get('/api/separated-medicamentos', (req, res) => {
    res.json(separatedMedicamentos);
    console.log('Separated medicamentos fetched: ', separatedMedicamentos);
});

// Medicamentos Separados - Agregar un medicamento separado
app.post('/api/separated-medicamentos', (req, res) => {
    const { id, nombre, descripcion , codigoEstudiante} = req.body;
    if (!id || !nombre || !descripcion || !codigoEstudiante) {
        console.error('Invalid medicamento data:', req.body);
        return res.status(400).json({ error: 'Missing id, nombre, or descripcion' });
    }

    // Buscar el medicamento en la lista principal
    const medicamento = medicamentos.find(m => m.id === id);
    if (!medicamento) {
        console.error('Medicamento not found:', id);
        return res.status(404).json({ error: 'Medicamento not found' });
    }

    // Verificar si el medicamento tiene stock suficiente
    if (medicamento.stock <= 0) {
        console.warn('Insufficient stock for medicamento:', medicamento);
        return res.status(400).json({ error: 'Insufficient stock' });
    }

    // Buscar al estudiante
    const estudiante = estudiantes.find(e => e.codigo === codigoEstudiante);
    if (!estudiante) {
        console.error('Estudiante not found:', codigoEstudiante);
        return res.status(404).json({ error: 'Estudiante not found' });
    }
    
    // Verificar si el estudiante tiene suficiente saldo para separar el medicamento
    if (estudiante.saldo < medicamento.precio) {
        console.warn('Insufficient balance for student:', estudiante);
        return res.status(400).json({ error: 'Insufficient balance' });
    }

    // Reducir el saldo del estudiante
    estudiante.saldo -= medicamento.precio;

    // Reducir el stock del medicamento
    medicamento.stock -= 1;

    // Buscar si el medicamento ya está en la lista de separados
    const existingSeparated = separatedMedicamentos.find(m => m.id === id);

    if (existingSeparated) {
        // Incrementar la cantidad del medicamento separado
        existingSeparated.cantidad += 1;
        console.log('Increased quantity for separated medicamento:', existingSeparated);
    } else {
        // Agregar un nuevo medicamento separado con cantidad inicial 1
        const newMedicamento = { id, nombre, descripcion, cantidad: 1 };
        separatedMedicamentos.push(newMedicamento);
        console.log('New separated medicamento added:', newMedicamento);
    }

    res.status(201).json({ message: 'Medicamento separated successfully', medicamento });
});


// Estudiante

app.get('/api/estudiantes/:codigo', (req, res) => {
    const {codigo} = req.params;
    const estudiante = estudiantes.find((e) => e.codigo === codigo)
    if (estudiante) {
        res.json(estudiante);
        console.log('Estudiante:', estudiante.nombre);
    } else {
        res.status(404).json({ mensaje: 'Estudiante no encontrado'});
        console.log('Estudiante no encontrado');
    }
    
    
});


// Iniciar el servidor
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
