const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'tbuy_db',
    password: 'casimiro123',
    port: 5432
});

pool.connect()
    .then(() => {
        console.log('[DB] Conexión a PostgreSQL exitosa ');
    })
    .catch((err) => {
        console.error('[DB] Error de conexión:', err);
    });

module.exports = pool;