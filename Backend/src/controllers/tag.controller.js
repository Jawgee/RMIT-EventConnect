// SHOULD NOT BE HERE NEED TO FIGURE OUT HOW TO DECLARE THIS AND EXPORT FROM APP FILE

const mysql = require('mysql');

const connectionPool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'test' // change this to your local database
});

const allowedColumns = ['pitch', 'metaverse', 'virtual', 'stand', 'round_table'];



exports.getUserByTag = async (req, res) => {
    const bool = req.params.bool;
    const column = req.params.column;
  
    const query = `SELECT * FROM users JOIN Tags ON users.id = Tags.user_id WHERE Tags.${column} = ?`;
  
    connectionPool.query(query, [bool], (err, rows) => {
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

    const query = `UPDATE Tags SET ${setPart} WHERE user_id = ?`;
  
    const values = [...Object.values(updateData), userId];
  
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
  


exports.getUserTagList = async (req, res) => {
    const user_id = req.params.user_id;
    
    const query = `
      SELECT 
        users.first_name,
        users.last_name,
        Tags.pitch,
        Tags.metaverse,
        Tags.virtual,
        Tags.stand,
        Tags.round_table
      FROM users
      JOIN Tags ON users.id = Tags.user_id
      WHERE users.id = ? AND (
        Tags.pitch = 1 OR
        Tags.metaverse = 1 OR
        Tags.virtual = 1 OR
        Tags.stand = 1 OR
        Tags.round_table = 1
      )`;
    
    connectionPool.query(query, [user_id], (err, rows) => {
      if (err) {
        console.error('Error executing query:', err.stack);
        return res.status(500).json({ error: 'Error retrieving user interests' });
      }
      
      if (rows.length === 0) {
        return res.status(404).json({ error: 'User not found or no interests found' });
      }
      
      res.json(rows);
    });
  };
  

  //THIS IS NOT WORKING
  //TODO: FIX THIS

//   exports.getUserInterests = async (req, res) => {
//     const user_id = req.params.user_id;
  
//     const query = `
//       SELECT 
//         users.first_name,
//         users.last_name,
//         ${Object.keys(allowedColumns)
//           .filter(column => allowedColumns[column] === 1)
//           .map(column => `Tags.${column}`)
//           .join(',\n      ')}
//       FROM users
//       JOIN Tags ON users.id = Tags.user_id
//       WHERE users.id = ?`;
    
//     connectionPool.query(query, [user_id], (err, rows) => {
//       if (err) {
//         console.error('Error executing query:', err.stack);
//         return res.status(500).json({ error: 'Error retrieving user interests' });
//       }
      
//       if (rows.length === 0) {
//         return res.status(404).json({ error: 'User not found or no interests found' });
//       }
      
//       res.json(rows);
//     });
//   };


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
