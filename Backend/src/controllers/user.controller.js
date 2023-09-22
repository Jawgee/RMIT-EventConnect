const { validateUser } = require("../models/user.model.js");
const { validateUpdateUser } = require("../models/user.model.js"); 
const jwt = require("jsonwebtoken");
const secretKey = "testing"; // change after finishing testing
const bcrypt = require("bcrypt");
const connectionPool = require('../connectionPool.js');

exports.listUsers = async (_, res) => {
  connectionPool.query("SELECT * FROM users", (err, rows) => {
    if (err) {
      console.error("Error executing query:", err.stack);
      return res.status(500).json({ error: "Error retrieving users" });
    }

    res.json(rows);
  });
};

exports.getUserByID = async (req, res) => {
  const userId = req.params.id;

  connectionPool.query("SELECT * FROM users WHERE id = ?", [userId], (err, rows) => {
    if (err) {
      console.error("Error executing query:", err.stack);
      return res.status(500).json({ error: "Error retrieving user" });
    }
    if (rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(rows[0]);
  });
};

exports.getUserByEmail = async (req, res) => {
const email = req.params.email;

connectionPool.query("SELECT * FROM users WHERE email = ?", [email], (err, rows) => {
  if (err) {
    console.error("Error executing query:", err.stack);
    return res.status(500).json({ error: "Error retrieving user" });
  }
  if (rows.length === 0) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json(rows[0]);
});
};

exports.getEventList = async (req, res) => {
  const userId = req.params.id;

  try {
    // Fetch the event names associated with the user
    connectionPool.query(
      `SELECT e.name
       FROM events e
       JOIN user_event ue ON e.id = ue.event_id
       WHERE ue.user_id = ?;`,
      [userId],
      (err, rows) => {
        if (err) {
          console.error("Error executing query:", err.stack);
          return res.status(500).json({ error: "Error retrieving events" });
        }

        if (rows.length === 0) {
          return res.status(404).json({ error: "User has not attended any events" });
        }

        // Extract event names from the query result
        const eventNames = rows.map((row) => row.name);
        res.json({ eventNames });
      }
    );
  } catch (error) {
    console.error("Error retrieving events:", error.stack);
    res.status(500).json({ error: "Error retrieving events" });
  }
};


exports.createUser = async (req, res) => {
  const result = validateUser(req.body);
  if (result.error) return res.status(422).json({error: result.error.details[0].message});

  const { first_name, last_name, photo, email, profile } = req.body;
  const password = await bcrypt.hash(req.body.password, 10);
  
  try {
    // Check if the email already exists in the database
    connectionPool.query("SELECT * FROM users WHERE email = ?", [email], (checkErr, checkResults) => {
      if (checkErr) {
        console.error("Error executing query:", checkErr.stack);
        return res.status(500).json({ error: "Error checking user email" });
      }

      if (checkResults.length > 0) {
        return res.status(409).json({ error: "User with this email already exists" });
      }

      // If email is not already in use, insert the new user
      connectionPool.query(
        "INSERT INTO users (first_name, last_name, photo, email, password, profile) VALUES (?,?,?,?,?,?)",
        [first_name, last_name, photo, email, password, profile],
        (insertErr, insertResult) => {
          if (insertErr) {
            console.error("Error executing query:", insertErr.stack);
            return res.status(500).json({ error: "Error inserting user" });
          }

          const insertedUserId = insertResult.insertId;
          const token = jwt.sign({ insertedUserId }, secretKey, { expiresIn: "1h" });
          res.cookie("token", token, {
            httpOnly: true,
            maxAge: 3600000,
          });

          // Insert the user_id into the tags table with 'user' as the tag_type
          connectionPool.query("INSERT INTO tags (user_id, tag_type) VALUES (?, 'user')", [insertedUserId], (tagErr, _) => {
            if (tagErr) {
              console.error("Error inserting tag:", tagErr.stack);
              return res.status(500).json({ error: "Error inserting tag for user" });
            }

            res.status(200).json({
              id: insertedUserId,
              first_name,
              last_name,
              photo,
              email,
              password,
              profile,
              token,
            });
          });
        }
      );
    });
  } catch (error) {
    console.error("Error creating user:", error.stack);
    res.status(500).json({ error: "Error creating user" });
  }
};

exports.updateUser = async (req, res) => {
  const userId = req.params.id;
  // const updatedFields = req.body;

  // Validate the updated fields
  const updatedFields = validateUpdateUser(req.body);

  const { error } = validateUpdateUser(updatedFields);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  // Check if there are any fields to update
  if (Object.keys(updatedFields).length === 0) {
    return res.status(400).json({ error: "No fields to update provided" });
  }

  const setStatements = [];
  const values = [];

  // Build the SET part of the SQL query dynamically
  for (const [key, value] of Object.entries(updatedFields)) {
    setStatements.push(`${key} = ?`);
    values.push(value);
  }

  values.push(userId); // Add the userId for the WHERE clause

  const updateQuery = `UPDATE users SET ${setStatements.join(', ')} WHERE id = ?`;

  try {
    const result = await queryDatabase(updateQuery, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ id: userId, ...updatedFields });
  } catch (err) {
    console.error("Error executing query:", err.stack);
    return res.status(500).json({ error: "Error updating user" });
  }
};

// Define a helper function to perform database queries with async/await
async function queryDatabase(sqlQuery, values) {
  return new Promise((resolve, reject) => {
    connectionPool.query(sqlQuery, values, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

exports.enlistUser = async (req, res) => {
  const user_id = req.params.id;
  const { event_id } = req.body;

  // Ensure that eventId is provided in the request body
  if (!event_id) {
    return res.status(400).json({ error: 'event_id is required in the request body' });
  }

  // Insert the user into the event in the event_user table
  connectionPool.query(
    'INSERT INTO user_event (event_id, user_id) VALUES (?, ?)',
    [event_id, user_id],
    (err, result) => {
      if (err) {
        console.error('Error inserting user into event:', err);
        return res.status(500).json({ error: 'Error inserting user into event' });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(201).json({ message: 'User added to event successfully' });
    }
  );
};

exports.deleteUser = async (req, res) => {
  const userId = req.params.id;

  // Delete user tags first
  connectionPool.query('DELETE FROM tags WHERE user_id = ?', [userId], (err, _) => {
    if (err) {
      console.error('Error deleting user tags:', err);
      return res.status(500).json({ error: 'Error deleting user tags' });
    }

    // Delete user-event associations (junction table)
    connectionPool.query('DELETE FROM user_event WHERE user_id = ?', [userId], (err, _) => {
      if (err) {
        console.error('Error deleting user-event associations:', err);
        return res.status(500).json({ error: 'Error deleting user-event associations' });
      }

      // Delete the user itself
      connectionPool.query('DELETE FROM users WHERE id = ?', [userId], (err, userResult) => {
        if (err) {
          console.error('Error deleting user:', err);
          return res.status(500).json({ error: 'Error deleting user' });
        }

        if (userResult.affectedRows === 0) {
          return res.status(404).json({ error: 'User not found' });
        }

        res.json({message: 'User deleted successfully'});

        res.status(204).end(); // Respond with a 204 No Content status on successful deletion
      });
    });
  });
};




// example user JSON:
// {
//   "first_name": "John",
//   "last_name": "Doe",
//   "photo": "https://example.com/profile.jpg",
//   "email": "john.doe@example.com",
//   "password": "P@ssw0rd123",
//   "profile": "Entrepreneur"
// }

