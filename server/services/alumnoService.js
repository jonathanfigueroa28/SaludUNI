const db = require('../db');

// Obtener todos los alumnos
async function obtenerAlumnos() {
    const sql = 'SELECT * FROM alumno';
    return await db.query(sql);
}

// Insertar un nuevo alumno
async function insertarAlumno(nombre, email, contraseña) {
    const sql = `
        INSERT INTO alumno (nombre, email, contraseña)
        VALUES ($1, $2, $3)
        RETURNING *;
    `;
    const params = [nombre, email, contraseña];
    return await db.query(sql, params);
}

module.exports = {
    obtenerAlumnos,
    insertarAlumno,
};
