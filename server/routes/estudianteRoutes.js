const express = require('express');
const router = express.Router();
const estudianteService = require('../services/estudianteService');
const bcrypt = require('bcrypt');
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

router.post('/obtener', async (req, res) => {
    try{
        const {codigo} =req.body;
        const estudiante =await estudianteService.obtenerEstudiantePorCodigo(codigo);
        if (!estudiante) {
            return res.status(404).send('Estudiante no encontrado');
        }else{
            res.json(estudiante)
        }
    }catch (err) {
        console.error(err);
        res.status(500).send('Error al autenticar al estudiante');
    }
});
router.post('/login', async (req, res) => {
    try {
        const { codigo, contraseña } = req.body; // El código UNI y la contraseña del usuario

        // Buscar al estudiante por su código (dni)
        const estudiante = await estudianteService.obtenerEstudiantePorCodigo(codigo);

        if (!estudiante) {
            return res.status(404).send('Estudiante no encontrado');
        }

        // Comparar la contraseña proporcionada con la contraseña hasheada en la base de datos
        const passwordMatch = await bcrypt.compare(contraseña, estudiante.contraseña);

        if (passwordMatch) {
            // Si las contraseñas coinciden, autenticamos al usuario
            res.json({ message: 'Autenticación exitosa', estudianteId: estudiante.dni });
        } else {
            res.status(401).send('Contraseña incorrecta');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al autenticar al estudiante');
    }
});
module.exports = router;

