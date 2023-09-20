const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const secretKey = 'testing'; // change after finishing testing
const bcrypt = require("bcrypt");

const connectionPool = mysql.createPool({
  host: 'eventconnect.c9p90bi9jzjz.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'SuperPassword12$',
  // Eventually change the database (please)
  database: 'Event_Connect'
});

exports.login = async (req, res) => {
  const { email, password } = req.body;



  connectionPool.query('SELECT id, password FROM users WHERE email = ?', [email], async (err, rows) => {
    if (err) {
      console.error('Error executing query:', err.stack);
      return res.status(500).json({ error: 'Error retrieving user' });
    }
    if (rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const hashedPasswordFromDB = rows[0].password;

    // Compare the provided plaintext password with the hashed password from the database
    const isMatch = await bcrypt.compare(password, hashedPasswordFromDB);

    if (isMatch === false) {
      return res.status(404).json({ error: 'Password is incorrect' });
    } 

      // Generate a JWT token with a unique identifier for the user
      const userId = rows[0].id;
      const token = jwt.sign({ userId }, secretKey, { expiresIn: '1h' });

      // Store the token in a cookie
      res.cookie('token', token, {
        httpOnly: true, // Cookie is accessible only through the HTTP(S) requests
        maxAge: 3600000, // Cookie expiration time in milliseconds (1 hour)
      });

      res.json({ message: 'Login successful', token });
    
  });
};

