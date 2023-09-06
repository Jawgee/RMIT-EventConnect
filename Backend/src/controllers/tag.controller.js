// SHOULD NOT BE HERE NEED TO FIGURE OUT HOW TO DECLARE THIS AND EXPORT FROM APP FILE

const mysql = require("mysql");

const connectionPool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "test", // change this to your local database
});

const allowedColumns = ["pitch", "metaverse", "virtual", "stand", "round_table"];

exports.getUserByTag = async (req, res) => {
    const bool = req.params.bool;
    const column = req.params.column;

    const query = `SELECT * FROM users JOIN Tags ON users.id = Tags.user_id WHERE Tags.${column} = ?`;

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
        Tags.pitch,
        Tags.metaverse,
        Tags.virtual,
        Tags.stand,
        Tags.round_table
      FROM users
      JOIN Tags ON users.id = Tags.user_id
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
        Tags.pitch,
        Tags.metaverse,
        Tags.virtual,
        Tags.stand,
        Tags.round_table
      FROM events
      JOIN Tags ON events.id = Tags.event_id
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

}

exports.updateUserInterests = async (req, res) => {
    const userId = req.params.user_id; // User ID
    const updateData = req.body; // JSON object with interests to update

    // Validate the columns using the validation function
    validateColumns(updateData);

    // Construct the SET part of the update query
    const setPart = Object.keys(updateData)
        .map((column) => `${column} = ?`)
        .join(", ");

    const query = `UPDATE Tags SET ${setPart} WHERE user_id = ?`;

    const values = [...Object.values(updateData), userId];

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
    const event_id = req.params.event_id; // User ID
    const updateData = req.body; // JSON object with interests to update

    // Validate the columns using the validation function
    validateColumns(updateData);

    // Construct the SET part of the update query
    const setPart = Object.keys(updateData)
        .map((column) => `${column} = ?`)
        .join(", ");

    const query = `UPDATE Tags SET ${setPart} WHERE event_id = ?`;

    const values = [...Object.values(updateData), event_id];

    connectionPool.query(query, values, (err, result) => {
        if (err) {
            console.error("Error executing query:", err.stack);
            return res.status(500).json({ error: "Error updating event tags" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "event not found or no changes made" });
        }

        res.json({ message: "Event tags updated successfully", OriginalJSON: updateData });
    });
};

const validateColumns = (updateData) => {
    const allowedColumns = ["pitch", "metaverse", "virtual", "stand", "round_table"];
    const invalidColumns = Object.keys(updateData).filter((column) => !allowedColumns.includes(column));

    if (invalidColumns.length > 0) {
        return {
            errorCode: 400,
            errorMessage: `Invalid column name(s): ${invalidColumns.join(", ")}`,
        };
    }

    return null; // Validation passed
};
