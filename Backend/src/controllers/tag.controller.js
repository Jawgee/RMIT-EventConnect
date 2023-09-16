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

// exports.updateUserInterests = async (req, res) => {
//   const userId = req.params.user_id; // User ID
//   const updateData = req.body; // JSON object with interests to update

//   // Validate the columns using the validation function
//   const validationError = validateColumns(updateData);

//   if (validationError) {
//     return res.status(validationError.errorCode).json({ error: validationError.errorMessage });
//   }

//   // Construct the SET part of the update query
// // Construct the SET part of the update query
// const setPart = allowedColumns
//   .filter((col) => updateData[col] !== undefined)
//   .map((col) => `${col} = ?`)
//   .join(", ");

// // Prepare the values array for the query
// const values = [...allowedColumns.map((col) => updateData[col]), userId];


//   // Check if there are any columns to update
//   if (setPart === "") {
//     return res.status(400).json({ error: "No valid columns provided for update" });
//   }

//   // Build the SQL query
//   const query = `UPDATE tags SET ${setPart} WHERE user_id = ?`;

//   // Execute the query
//   connectionPool.query(query, values, (err, result) => {
//     if (err) {
//       console.error("Error executing query:", err.stack);
//       return res.status(500).json({ error: "Error updating user interests" });
//     }


//     console.log("User ID:", userId);
//     console.log("Update Data:", updateData);
//     console.log("Generated Query:", query);
//     console.log("Query Values:", values);


//     if (result.affectedRows === 0) {
//       return res.status(404).json({ error: "User not found or no changes made" });
//     }

//     res.json({ message: "User interests updated successfully", OriginalJSON: updateData });
//   });
// };

exports.updateUserInterests = async (req, res) => {
  const userId = req.params.user_id;
  const updatedFields = req.body;
  const validationError = validateColumns(updatedFields);

  if (validationError) {
    return res.status(validationError.errorCode).json({ error: validationError.errorMessage });
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

  const updateQuery = `UPDATE tags SET ${setStatements.join(', ')} WHERE user_id = ?`;


  connectionPool.query(updateQuery, values, (err, result) => {
    if (err) {
      console.error("Error executing query:", err.stack);
      return res.status(500).json({ error: "Error updating user" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }


    res.json({ id: userId, ...updatedFields });
  });
};



exports.updateEventInterests = async (req, res) => {
  const event_id = req.params.event_id;
  const updatedFields = req.body;
  const validationError = validateColumns(updatedFields);

  if (validationError) {
    return res.status(validationError.errorCode).json({ error: validationError.errorMessage });
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

  values.push(event_id); // Add the userId for the WHERE clause

  const updateQuery = `UPDATE tags SET ${setStatements.join(', ')} WHERE event_id = ?`;


  connectionPool.query(updateQuery, values, (err, result) => {
    if (err) {
      console.error("Error executing query:", err.stack);
      return res.status(500).json({ error: "Error updating event" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "event not found" });
    }


    res.json({ id: event_id, ...updatedFields });
  });
};

const validateColumns = (updateData) => {
  const invalidColumns = Object.keys(updateData).filter((column) => !allowedColumns.includes(column));

  if (invalidColumns.length > 0) {
    return {
      errorCode: 422,
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