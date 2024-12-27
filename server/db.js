require('dotenv').config();
const { Pool } = require('pg');

// Validación para garantizar que DB_PASSWORD sea un string
if (!process.env.DB_PASSWORD || typeof process.env.DB_PASSWORD !== 'string') {
    throw new Error('DB_PASSWORD no está configurado o no es un string válido. Por favor, revisa tu archivo .env');
}

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD, // Esto ahora será tratado como string
    database: process.env.DB_NAME,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

async function query(sql, params) {
    const client = await pool.connect();
    try {
        const res = await client.query(sql, params);
        return res.rows;
    } finally {
        client.release();
    }
}

module.exports = {
    query,
};
