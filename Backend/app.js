// Import the required modules and configurations
const express = require("express"); 
const cors = require('cors');
const serverConfig = require("./src/serverConfig.js");  // Import server configuration
const mysql = require('mysql'); 

const app = express();

app.use(express.json());
app.use(cors())

// Create a MySQL connection pool
const connectionPool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  // Eventually change the database (please)
  database: 'test'
});

// Acquire a connection from the pool and execute a query to create a table
connectionPool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
//Erase the table to avoid conflicta or errors
  connection.query(`DROP TABLE users`);
  console.error('Erase the table');

  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      first_name VARCHAR(255),
      last_name VARCHAR(255)
    )`;

  connection.query(createTableQuery, (err) => {
    connection.release();

    if (err) {
      console.error('Error creating table:', err.stack);
      return;
    }

    console.log('Table created successfully.');
  });
});

// Define a route for the root URL
app.get('/', (req, res) => {
  res.send(`Testing connection to port ${serverConfig.PORT}`);  // Respond with a message
});

// Import and use user routes
require("./src/routes/user.routes.js")(express, app);  // Include user-related routes

// Start the server and listen for requests on the specified port
app.listen(serverConfig.PORT, () => {
  console.log(`Server is running on port ${serverConfig.PORT}.`);
});
