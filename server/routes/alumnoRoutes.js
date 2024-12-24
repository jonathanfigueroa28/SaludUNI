const express = require('express');
const router = express.Router();
const alumnoService = require('../services/alumnoService');

// Endpoint para obtener todos los alumnos
router.get('/', async (req, res) => {
    try {
        const alumnos = await alumnoService.obtenerAlumnos();
        res.json(alumnos);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener los alumnos');
    }
});

// Endpoint para insertar un nuevo alumno
router.post('/', async (req, res) => {
    try {
        const { nombre, email, contraseña } = req.body;
        const nuevoAlumno = await alumnoService.insertarAlumno(nombre, email, contraseña);
        res.status(201).json(nuevoAlumno[0]); // Devuelve el primer resultado
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al insertar el alumno');
    }
});

module.exports = router;
