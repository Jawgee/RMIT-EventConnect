const mysql = require('mysql');

// const connectionPool = mysql.createPool({
//   host: 'eventconnect.c9p90bi9jzjz.us-east-1.rds.amazonaws.com',
//   user: 'admin',
//   password: 'SuperPassword12$',
//   database: 'Event_Connect'
// });

const connectionPool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'test'
});

module.exports = connectionPool;
