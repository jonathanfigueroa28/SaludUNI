const express = require('express');
const router = express.Router();
const citaService = require('../services/citaService');

// Endpoint para ver las especialidades
router.get('/especialidades', async (req, res) => {
    try {
        const citas = await citaService.obtenerEspecialidades();
        res.json(citas);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener las especialidades');
    }
});


module.exports = router;
