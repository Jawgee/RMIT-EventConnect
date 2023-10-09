const express = require("express");
const cors = require('cors');
const serverConfig = require("./src/serverConfig.js");
const fs = require('fs');
const connectionPool = require('./src/connectionPool.js');

const app = express();

app.use(express.json());
app.use(cors());

// Custom error logging function
function logError(message, error) {
  const logDir = 'logs';
  const logFile = 'error.log';
  const logFilePath = `${logDir}/${logFile}`;
  const logMessage = `${new Date().toISOString()} - ${message}\n${error.stack}\n\n`;

  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }

  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      console.error('Error writing to the log file:', err);
    }
  });
}

// Acquire a connection from the pool and execute a query to create a table
connectionPool.getConnection((err, connection) => {
  if (err) {
    logError('Error connecting to the database:', err);
    return;
  }

  const createUserTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      first_name VARCHAR(30) NOT NULL,
      last_name VARCHAR(300) NOT NULL,
      photo VARCHAR(300),
      email VARCHAR(320) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      profile ENUM('entrepreneur','corporate','investor','startup','academy','ecosystem facilitator','accelerator','incubator','sme','agency','ngo') NOT NULL
    )`;

  const createEventTableQuery = `
    CREATE TABLE IF NOT EXISTS events (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      owner VARCHAR(100) NOT NULL,
      sector ENUM('tourism','tech','bio','health','sustainability','agro','fintech','greentech','mobility','logistic','food','smart cities','blue economy','space') NOT NULL,
      profile ENUM('entrepreneur','corporate','investor','startup','academy','ecosystem facilitator','accelerator','incubator','sme','agency','ngo') NOT NULL,
      category ENUM('state of the art','round table','living test','stand','pitch','showroom') NOT NULL,
      frequency ENUM('unique', 'yearly', 'monthly'),
      environment ENUM('red carpet','informal','cocktail','party','prize'),
      privacy ENUM('public', 'private') NOT NULL DEFAULT 'public',
      entrance ENUM('free', 'paid'),
      accessibility ENUM('in-person', 'online', 'hybrid'),
      motivation ENUM('validation', 'investor', 'partner', 'scouting'),
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
      online TINYINT(1) NOT NULL,
      tourism TINYINT(1) NOT NULL,
      tech TINYINT(1) NOT NULL,
      bio TINYINT(1) NOT NULL,
      health TINYINT(1) NOT NULL,
      sustainability TINYINT(1) NOT NULL,
      agro TINYINT(1) NOT NULL,
      fintech TINYINT(1) NOT NULL,
      greenTech TINYINT(1) NOT NULL,
      mobility TINYINT(1) NOT NULL,
      logistic TINYINT(1) NOT NULL,
      food TINYINT(1) NOT NULL,
      smart_cities TINYINT(1) NOT NULL,
      blue_economy TINYINT(1) NOT NULL,
      space TINYINT(1) NOT NULL,
      tag_type ENUM('event', 'user') NOT NULL,
      event_id INT,
      user_id INT,
      FOREIGN KEY (event_id) REFERENCES events(id),
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `;

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
      logError('Error creating user table:', err);
      return;
    }
  });

  connection.query(createEventTableQuery, (err) => {
    if (err) {
      logError('Error creating event table:', err);
      return;
    }
  });

  connection.query(createTagTableQuery, (err) => {
    if (err) {
      logError('Error creating tag table:', err);
      return;
    }
  });

  connection.query(createEventJunctionTableQuery, (err) => {
    connection.release();

    if (err) {
      logError('Error creating event junction table:', err);
      return;
    }
  });
});

// Define a route for the root URL
app.get('/', (req, res) => {
  res.send(`Testing connection to port ${serverConfig.PORT}`);
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

module.exports = app;  // Export the app for testing purposes