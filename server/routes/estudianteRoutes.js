const express = require('express');
const router = express.Router();
const estudianteService = require('../services/estudianteService');

// Endpoint para insertar un nuevo estudiante
router.post('/', async (req, res) => {
    try {
        const {
            nombre,
            apellido,
            dni,
            correo,
            telefono,
            saldo,
            flg_autoseguro,
            contraseña
        } = req.body;

        // Validar que los datos requeridos estén presentes
        if (!nombre || !apellido || !dni || !correo || !telefono || saldo === undefined || flg_autoseguro === undefined || !contraseña) {
            return res.status(400).send('Todos los campos son obligatorios');
        }

        const nuevoEstudiante = await estudianteService.insertarEstudiante({
            nombre,
            apellido,
            dni,
            correo,
            telefono,
            saldo,
            flg_autoseguro,
            contraseña
        });

        res.status(201).json(nuevoEstudiante[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al insertar el estudiante');
    }
});

// Endpoint para obtener todos los estudiantes
router.get('/', async (req, res) => {
    try {
        const estudiantes = await estudianteService.obtenerEstudiantes();
        res.json(estudiantes);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener los estudiantes');
    }
});

module.exports = router;
