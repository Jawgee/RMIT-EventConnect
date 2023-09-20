const mysql = require('mysql');

const connectionPool = mysql.createPool({
  host: 'eventconnect.c9p90bi9jzjz.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'SuperPassword12$',
  // Eventually change the database (please)
  database: 'Event_Connect'
});

module.exports = connectionPool;
