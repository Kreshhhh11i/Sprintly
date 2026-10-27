
import dotenv from 'dotenv';

dotenv.config();

const { default: pool } = await import('./src/config/db.js');

async function testConnection() {
  try {
    const result = await pool.query(
      'SELECT NOW() AS server_time, current_database() AS database_name'
    );

    console.log('Database connection successful!');
    console.log(result.rows[0]);
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

await testConnection();
