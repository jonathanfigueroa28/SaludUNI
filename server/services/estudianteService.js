const db = require('../db'); // Conexión a la base de datos
const bcrypt = require('bcrypt'); // Para hashear contraseñas
const { Pool } = require('pg');
const pool = new Pool({
    user: 'admin',
    host: 'localhost',
    database: 'centro_medico_db2',
    password: '12345',
    port: 5432,
  });
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
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(contraseña, saltRounds); // Hasheamos la contraseña

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

async function obtenerEstudiantePorCodigo(codigo) {
    try {
        const sql = 'SELECT id, nombre, apellido, dni, correo, telefono, saldo, flg_autoseguro, contraseña FROM estudiantes WHERE dni = $1';
        const result = await pool.query(sql, [codigo]);
        return result.rows[0]; 
    } catch (error) {
        throw new Error('Error al obtener el estudiante: ' + error.message);
    }
}
module.exports = {
    insertarEstudiante,
    obtenerEstudiantes,
    obtenerEstudiantePorCodigo
};

