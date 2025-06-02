import { pool } from './dataBase';

const createTables = async () => {
    try {
        await pool.query(`
      CREATE TABLE IF NOT EXISTS test (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL
      );
    `);
        console.log('✅ Tabla users creada correctamente');
    } catch (error) {
        console.error('❌ Error al crear tablas:', error);
    } finally {
        await pool.end();
    }
};

createTables();
