const db = require('../db'); // Conexión a la base de datos
const crypto = require('crypto'); // Para hashear contraseñas

// Función para hashear contraseñas usando SHA-256
function hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

// Función para insertar un nuevo estudiante
async function insertarEstudiante({
    nombre,
    apellido,
    dni,
    correo,
    telefono,
    saldo,
    flg_autoseguro,
    contraseña
}) {
    const hashedPassword = hashPassword(contraseña); // Hasheamos la contraseña

    const sql = `
        INSERT INTO estudiantes (nombre, apellido, dni, correo, telefono, saldo, flg_autoseguro, contraseña)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *;
    `;
    const params = [nombre, apellido, dni, correo, telefono, saldo, flg_autoseguro, hashedPassword];
    return await db.query(sql, params);
}

// Función para obtener todos los estudiantes
async function obtenerEstudiantes() {
    const sql = 'SELECT id, nombre, apellido, dni, correo, telefono, saldo, flg_autoseguro FROM estudiantes';
    return await db.query(sql); // No devolvemos la contraseña por seguridad
}

module.exports = {
    insertarEstudiante,
    obtenerEstudiantes
};
