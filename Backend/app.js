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

  const createUserTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    photo VARCHAR(300),
    email VARCHAR(300) NOT NULL UNIQUE,
    password VARCHAR(20) NOT NULL,
    role VARCHAR(100)
  )`;
  
  const createEventTableQuery = `
  CREATE TABLE IF NOT EXISTS events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    owner VARCHAR(255) NOT NULL,
    privacy ENUM('public', 'private') NOT NULL DEFAULT 'public', -- Added DEFAULT 'public'
    description VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL
  )`;
  
  const createTagTableQuery = `
  CREATE TABLE IF NOT EXISTS tags (
    id INT AUTO_INCREMENT PRIMARY KEY,
    metaverse TINYINT(1) NOT NULL,
    pitch TINYINT(1) NOT NULL,
    round_table TINYINT(1) NOT NULL,
    stand TINYINT(1) NOT NULL,
    virtual TINYINT(1) NOT NULL,
    tag_type ENUM('event', 'user') NOT NULL,
    event_id INT,
    user_id INT,
    FOREIGN KEY (event_id) REFERENCES events(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
  )`;

const createEventJunctionTableQuery = `
  CREATE TABLE IF NOT EXISTS user_event (
    user_id INT,
    event_id INT,
    PRIMARY KEY (user_id, event_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (event_id) REFERENCES events(id)
  )`;

  


  connection.query(createUserTableQuery, (err) => {

    if (err) {
      console.error('Error creating user table:', err.stack);
      return;
    }

    console.log('User table created successfully.');

  });

  connection.query(createTagTableQuery, (err) => {
    if (err) {
      console.error('Error creating tag table:', err.stack);
      return;
    }

    console.log('Tag table created successfully.');

  });

  connection.query(createEventTableQuery, (err) => {

    if (err) {
      console.error('Error creating event table:', err.stack);
      return;
    }

    console.log('event table created successfully.');

  });

  connection.query(createEventJunctionTableQuery, (err) => {
    connection.release();

    if (err) {
      console.error('Error creating event junction table:', err.stack);
      return;
    }

    console.log('event junction table created successfully.');

  });

});

// Define a route for the root URL
app.get('/', (req, res) => {
  res.send(`Testing connection to port ${serverConfig.PORT}`);  // Respond with a message
});

// Import and use user routes
require("./src/routes/user.routes.js")(express, app);  // Include user-related routes
require("./src/routes/tags.routes.js")(express, app);  // Include tag-related routes
require("./src/routes/login.routes.js")(express, app);  // Include login-related routes
require("./src/routes/event.routes.js")(express, app);  // Include event-related routes
require("./src/routes/enlist.routes.js")(express, app);  // Include event-related routes


// Start the server and listen for requests on the specified port
app.listen(serverConfig.PORT, () => {
  console.log(`Server is running on port ${serverConfig.PORT}.`);
});
