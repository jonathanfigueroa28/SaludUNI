const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    max: 10, 
    idleTimeoutMillis: 30000, 
    connectionTimeoutMillis: 2000, 
});

// Función para ejecutar consultas
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