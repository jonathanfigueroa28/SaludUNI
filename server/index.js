const express = require('express');
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
    { name: 'Cardiología', schedules: ['09:00 AM', '10:00 AM', '11:00 AM'] },
    { name: 'Dermatología', schedules: ['01:00 PM', '02:00 PM', '03:00 PM'] },
    { name: 'Ginecología', schedules: ['10:00 AM', '11:30 AM', '01:30 PM'] },
    { name: 'Pediatría', schedules: ['08:00 AM', '09:30 AM', '11:00 AM'] },
    { name: 'Neurología', schedules: ['02:00 PM', '03:30 PM', '04:00 PM'] },
    { name: 'Oftalmología', schedules: ['09:00 AM', '11:00 AM', '01:00 PM'] },
    { name: 'Oncología', schedules: ['10:00 AM', '12:30 PM', '02:30 PM'] }
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

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
