const mariadb = require('mariadb');

// Modify this based on your database configuration
const pool = mariadb.createPool({
  host: '',
  user: '',
  password: '',
  database: '',
  connectionLimit: 5
});

async function createTables() {
  let connection;
  try {
    connection = await pool.getConnection();

    for (let i = 1; i <= 4000; i++) { // change the numbers here
      const tableName = `wp_test_table_${i}`;
      const createTableQuery = `
        CREATE TABLE ${tableName} (
          id INT,
          name VARCHAR(50),
          email VARCHAR(255),
          address VARCHAR(100)
        )
      `;
      await connection.query(createTableQuery);
      console.log(`Created table ${tableName}`);
    }
  } catch (error) {
    console.error('Error creating tables:', error);
  } finally {
    if (connection) {
      connection.release();
      process.exit();
    }
  }
}

createTables();
