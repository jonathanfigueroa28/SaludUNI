const db = require('../db'); // Conexión a la base de datos
const bcrypt = require('bcrypt'); // Para hashear contraseñas


async function obtenerEspecialidades() {
    const sql = 'SELECT nombre FROM especialidades';
    return await db.query(sql);
}

module.exports = {
    obtenerEspecialidades
};