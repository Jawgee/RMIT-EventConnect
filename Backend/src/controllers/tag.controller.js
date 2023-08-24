// SHOULD NOT BE HERE NEED TO FIGURE OUT HOW TO DECLARE THIS AND EXPORT FROM APP FILE

const mysql = require('mysql');
const Joi = require('joi');

const connectionPool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'test' // change this to your local database
});

exports.listTags = async (req, res) => {
  connectionPool.query('SELECT * FROM test.tags', (err, rows) => {
    if (err) {
      console.error('Error executing query:', err.stack);
      return res.status(500).json({ error: 'Error retrieving users' });
    }

    res.json(rows);
  });
};


exports.getUserByTag = async (req, res) => {
    const column = req.params.column;
  
    const query = `SELECT * FROM users JOIN Tags ON users.id = Tags.user_id WHERE Tags.${column} = ?`;
  
    connectionPool.query(query, [1], (err, rows) => {
      if (err) {
        console.error('Error executing query:', err.stack);
        return res.status(500).json({ error: 'Error retrieving user' });
      }
      if (rows.length === 0) {
        return res.status(404).json({ error: 'No users have selected this tag' });
      }
      res.json(rows);
    });
  };



exports.updateUserInterests = async (req, res) => {
    const userId = req.params.id; // User ID
    const updateData = req.body; // JSON object with interests to update
  
    // Validate the columns using the validation function
    validateColumns(updateData)
  
    // Construct the SET part of the update query
    const setPart = Object.keys(updateData).map(column => `${column} = ?`).join(', ');

    // Construct the update query
    const query = `UPDATE Tags SET ${setPart} WHERE user_id = ?`;
  
    // Extract values from the updateData object and add the user ID
    const values = [...Object.values(updateData), userId];
  
    // Execute the query
    connectionPool.query(query, values, (err, result) => {
      if (err) {
        console.error('Error executing query:', err.stack);
        return res.status(500).json({ error: 'Error updating user interests' });
      }
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'User not found or no changes made' });
      }
  
      res.json({ message: 'User interests updated successfully', OriginalJSON: updateData });
    });
  };
  


const validateColumns = (updateData) => {
    const allowedColumns = ['pitch', 'metaverse', 'virtual', 'stand', 'round_table'];
    const invalidColumns = Object.keys(updateData).filter(column => !allowedColumns.includes(column));
  
    if (invalidColumns.length > 0) {
      return {
        errorCode: 400,
        errorMessage: `Invalid column name(s): ${invalidColumns.join(', ')}`
      };
    }
  
    return null; // Validation passed
  };
