const Joi = require('joi');
const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 4444;

app.use(express.json());

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

const connectionPool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test' // change this to your local database
});

app.get('/', (req, res) => {
    res.send(`Testing connection to port ${port}`);
});

app.get('/api/users', (req, res) => {
    connectionPool.query('SELECT * FROM test.users', (err, rows) => {
        if (err) {
            console.error('Error executing query:', err.stack);
            return res.status(500).json({ error: 'Error retrieving users' });
        }

        res.json(rows);
    });
});

app.get('/api/users/:id', (req, res) => {
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
});

app.post('/api/users', (req, res) => {
    const result = validateUser(req.body);
    if(result.error) return res.status(400).send(result.error.details[0].message)

    const { first_name, last_name } = req.body;
    connectionPool.query('INSERT INTO users (first_name, last_name) VALUES (?, ?)', [first_name, last_name], (err, result) => { //your database needs to have first_name and last_name columns
        if (err) {
            console.error('Error executing query:', err.stack);
            return res.status(500).json({ error: 'Error inserting user' });
        }

        const insertedUserId = result.insertId;
        res.json({ id: insertedUserId, first_name, last_name });
    });
});

app.put('/api/users/:id', (req, res) => {
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
});

app.delete('/api/users/:id', (req, res) => {
    const userId = req.params.id;
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
});

function validateUser(user) {
    const userSchema = Joi.object({
        first_name: Joi.string().min(3).required(),
        last_name: Joi.string().min(3).required()
    });
    return userSchema.validate(user);
};

//example JSON:
// {
//   "first_name": "Jed",
//   "last_name": "Beattie"
// }