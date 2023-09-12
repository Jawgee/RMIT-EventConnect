const mysql = require("mysql");

const connectionPool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "test", // Change this to your local database
});

const allowedColumns = [
  "pitch",
  "metaverse",
  "virtual",
  "stand",
  "round_table",
  "tourism",
  "tech",
  "bio",
  "health",
  "sustainability",
  "agro",
  "fintech",
  "greenTech",
  "mobility",
  "logistic",
  "food",
  "smart_cities",
  "blue_economy",
  "space",
];

exports.getUserByTag = async (req, res) => {
  const bool = req.params.bool;
  const column = req.params.column;

  // Check if the requested column is allowed
  if (!allowedColumns.includes(column)) {
    return res.status(400).json({ error: "Invalid column name" });
  }

  const query = `SELECT * FROM users JOIN tags ON users.id = tags.user_id WHERE tags.${column} = ?`;

  connectionPool.query(query, [bool], (err, rows) => {
    if (err) {
      console.error("Error executing query:", err.stack);
      return res.status(500).json({ error: "Error retrieving user" });
    }
    if (rows.length === 0) {
      return res.status(404).json({ error: "No users have selected this tag" });
    }
    res.json(rows);
  });
};

exports.getUserTagList = async (req, res) => {
  const user_id = req.params.user_id;

  const query = `
    SELECT 
      users.first_name,
      users.last_name,
      ${allowedColumns.map((col) => `tags.${col}`).join(", ")}
    FROM users
    JOIN tags ON users.id = tags.user_id
    WHERE users.id = ?`;

  connectionPool.query(query, [user_id], (err, rows) => {
    if (err) {
      console.error("Error executing query:", err.stack);
      return res.status(500).json({ error: "Error retrieving user interests" });
    }

    if (rows.length === 0) {
      return res.status(404).json({ error: "User not found or no interests found" });
    }

    res.json(rows);
  });
};

exports.getEventTagList = async (req, res) => {
  const event_id = req.params.event_id;

  const query = `
    SELECT 
      events.name,
      events.owner,
      ${allowedColumns.map((col) => `tags.${col}`).join(", ")}
    FROM events
    JOIN tags ON events.id = tags.event_id
    WHERE events.id = ?`;

  connectionPool.query(query, [event_id], (err, rows) => {
    if (err) {
      console.error("Error executing query:", err.stack);
      return res.status(500).json({ error: "Error retrieving event tags" });
    }

    if (rows.length === 0) {
      return res.status(404).json({ error: "Event not found or no tags associated" });
    }

    res.json(rows);
  });
};

exports.updateUserInterests = async (req, res) => {
  const userId = req.params.user_id; // User ID
  const updateData = req.body; // JSON object with interests to update

  // Validate the columns using the validation function
  const validationError = validateColumns(updateData);

  if (validationError) {
    return res.status(validationError.errorCode).json({ error: validationError.errorMessage });
  }

  // Construct the SET part of the update query
  const setPart = allowedColumns
    .filter((col) => updateData[col] !== undefined)
    .map((col) => `${col} = ?`)
    .join(", ");

  const query = `UPDATE tags SET ${setPart} WHERE user_id = ?`;

  const values = [...allowedColumns.map((col) => updateData[col]), userId];

  connectionPool.query(query, values, (err, result) => {
    if (err) {
      console.error("Error executing query:", err.stack);
      return res.status(500).json({ error: "Error updating user interests" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found or no changes made" });
    }

    res.json({ message: "User interests updated successfully", OriginalJSON: updateData });
  });
};

exports.updateEventInterests = async (req, res) => {
  const event_id = req.params.event_id; // Event ID
  const updateData = req.body; // JSON object with interests to update

  // Validate the columns using the validation function
  const validationError = validateColumns(updateData);

  if (validationError) {
    return res.status(validationError.errorCode).json({ error: validationError.errorMessage });
  }

  // Construct the SET part of the update query
  const setPart = allowedColumns
    .filter((col) => updateData[col] !== undefined)
    .map((col) => `${col} = ?`)
    .join(", ");

  const query = `UPDATE tags SET ${setPart} WHERE event_id = ?`;

  const values = [...allowedColumns.map((col) => updateData[col]), event_id];

  connectionPool.query(query, values, (err, result) => {
    if (err) {
      console.error("Error executing query:", err.stack);
      return res.status(500).json({ error: "Error updating event tags" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Event not found or no changes made" });
    }

    res.json({ message: "Event tags updated successfully", OriginalJSON: updateData });
  });
};

const validateColumns = (updateData) => {
  const invalidColumns = Object.keys(updateData).filter((column) => !allowedColumns.includes(column));

  if (invalidColumns.length > 0) {
    return {
      errorCode: 400,
      errorMessage: `Invalid column name(s): ${invalidColumns.join(", ")}`,
    };
  }

  return null; // Validation passed
};
//example update user tags:
/*
{
  "pitch": 1,
  "metaverse": 0,
  "virtual": 1,
  "stand": 0,
  "round_table": 1,
  "tourism": 0,
  "tech": 1,
  "bio": 0,
  "health": 1,
  "sustainability": 0,
  "agro": 1,
  "fintech": 0,
  "greenTech": 1,
  "mobility": 0,
  "logistic": 1,
  "food": 0,
  "smart_cities": 1,
  "blue_economy": 0,
  "space": 1
}

*/