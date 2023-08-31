// SHOULD NOT BE HERE NEED TO FIGURE OUT HOW TO DECLARE THIS AND EXPORT FROM APP FILE

const mysql = require('mysql');
const { validateUser } = require('../models/user.model.js'); // Adjust the path as needed
const userModel = require('../models/user.model.js'); // Adjust the path as needed
const jwt = require('jsonwebtoken');
const secretKey = 'testing'; // change after finishing testing

const connectionPool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'test' // change this to your local database
});

exports.listUsers = async (req, res) => {
  connectionPool.query('SELECT * FROM test.users', (err, rows) => {
    if (err) {
      console.error('Error executing query:', err.stack);
      return res.status(500).json({ error: 'Error retrieving users' });
    }

    res.json(rows);
  });
};

exports.getUserByID = async (req, res) => {
  const userId = req.params.id;

  connectionPool.query('SELECT * FROM users WHERE id = ?', [userId], (err, rows) => {
      if (err) {
          console.error('Error executing query:', err.stack);
          return res.status(500).json({ error: 'Error retrieving user' });
      }
      if (rows.length === 0) {
          return res.status(404).json({ error: 'User not found' });
      }
      res.json(rows[0]);
  });
};


exports.createUser = async (req, res) => {
  const result = validateUser(req.body);
  if (result.error) return res.status(400).send(result.error.details[0].message);

  const { first_name, last_name, photo, email, password, role } = req.body;

  // Check if the email already exists in the database
  connectionPool.query(
    'SELECT * FROM users WHERE email = ?',
    [email],
    (checkErr, checkResults) => {
      if (checkErr) {
        console.error('Error executing query:', checkErr.stack);
        return res.status(500).json({ error: 'Error checking user email' });
      }

      if (checkResults.length > 0) {
        return res.status(409).json({ error: 'User with this email already exists' });
      }

      // If email is not already in use, insert the new user
      connectionPool.query(
        'INSERT INTO users (first_name, last_name, photo, email, password, role) VALUES (?,?,?,?,?,?)',
        [first_name, last_name, photo, email, password, role],
        (insertErr, insertResult) => {
          if (insertErr) {
            console.error('Error executing query:', insertErr.stack);
            return res.status(500).json({ error: 'Error inserting user' });
          }

          const insertedUserId = insertResult.insertId;
          const token = jwt.sign({ insertedUserId }, secretKey, { expiresIn: '1h' });
          res.cookie('token', token, {
            httpOnly: true, // Cookie is accessible only through the HTTP(S) requests
            maxAge: 3600000, // Cookie expiration time in milliseconds (1 hour)
          });

          // Insert the user_id into the Tags table
          connectionPool.query(
            'INSERT INTO Tags (user_id) VALUES (?)',
            [insertedUserId],
            (tagErr, tagResult) => {
              if (tagErr) {
                console.error('Error inserting tag:', tagErr.stack);
                return res.status(500).json({ error: 'Error inserting tag for user' });
              }

              res.json({
                id: insertedUserId,
                first_name,
                last_name,
                photo,
                email,
                password,
                role,
                token
              });
            }
          );
        }
      );
    }
  );
};


exports.updateUser = async (req, res) => {
  const result = validateUser(req.body);
  if(result.error) return res.status(400).send(result.error.details[0].message)

  const userId = req.params.id;
  const { first_name, last_name } = req.body;

  connectionPool.query(
      'UPDATE users SET first_name = ?, last_name = ? WHERE id = ?',
      [first_name, last_name, userId],
      (err, result) => {
          if (err) {
              console.error('Error executing query:', err.stack);
              return res.status(500).json({ error: 'Error updating user' });
          }

          if (result.affectedRows === 0) {
              return res.status(404).json({ error: 'User not found' });
          }

          res.json({ id: userId, first_name, last_name });
      }
  ); 
};

exports.deleteUser = async (req, res) => {
  const userId = req.params.id;
  connectionPool.query(
    'DELETE FROM tags WHERE user_id = ?',[userId],(err, result) => {
        if (err) {
            console.error('Error executing query:', err.stack);
            return res.status(500).json({ error: 'Error deleting user'});
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found'});
        }
        res.json({ message: 'User deleted successfully' });
    }
);
  connectionPool.query(
      'DELETE FROM users WHERE id = ?',[userId],(err, result) => {
          if (err) {
              console.error('Error executing query:', err.stack);
              return res.status(500).json({ error: 'Error deleting user'});
          }

          if (result.affectedRows === 0) {
              return res.status(404).json({ error: 'User not found'});
          }
          res.json({ message: 'User deleted successfully' });
      }
  );
};


// example user JSON:
// {
//   "first_name": "validation",
//   "last_name": "validation",
//   "email": "validation@validation.com",
//   "password": "Validation1?"
// }
