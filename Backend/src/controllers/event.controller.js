const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const secretKey = "testing"; // change after finishing testing

const connectionPool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "test", // change this to your local database
});


exports.listEvents = async (req, res) => {
    connectionPool.query("SELECT * FROM events", (err, rows) => {
      if (err) {
        console.error("Error executing query:", err.stack);
        return res.status(500).json({ error: "Error retrieving events" });
      }
  
      res.json(rows);
    });
  };
  
exports.getEventByID = async (req, res) => {
    const eventId = req.params.id;
  
    connectionPool.query("SELECT * FROM events WHERE id = ?", [eventId], (err, rows) => {
      if (err) {
        console.error("Error executing query:", err.stack);
        return res.status(500).json({ error: "Error retrieving event" });
      }
      if (rows.length === 0) {
        return res.status(404).json({ error: "Event not found" });
      }
      res.json(rows[0]);
    });
  };


  exports.createEvent = async (req, res) => {
  
    const { name, owner, privacy, description, location } = req.body;
  
    try {
      // Check if the email already exists in the database
      connectionPool.query("SELECT * FROM events WHERE name = ?", [name], (checkErr, checkResults) => {
        if (checkErr) {
          console.error("Error executing query:", checkErr.stack);
          return res.status(500).json({ error: "Error checking event name" });
        }
  
        if (checkResults.length > 0) {
          return res.status(409).json({ error: "event with this name already exists" });
        }
  
        // If event name is not already in use, insert the new event
        connectionPool.query(
          "INSERT INTO events (name, owner, privacy, description, location) VALUES (?,?,?,?,?)",
          [name, owner, privacy, description, location],
          (insertErr, insertResult) => {
            if (insertErr) {
              console.error("Error executing query:", insertErr.stack);
              return res.status(500).json({ error: "Error inserting event" });
            }
  
            const insertedEventId = insertResult.insertId;
  
            // Insert the event_id into the Tags table with 'event' as the tag_type
            connectionPool.query("INSERT INTO Tags (id, tag_type) VALUES (?, 'event')", [insertedEventId], (tagErr, tagResult) => {
              if (tagErr) {
                console.error("Error inserting tag:", tagErr.stack);
                return res.status(500).json({ error: "Error inserting tag for Event" });
              }
  
              res.status(200).json({
                name,
                owner,
                privacy,
                description,
                location
              });
            });
          }
        );
      });
    } catch (error) {
      console.error("Error creating event:", error.stack);
      res.status(500).json({ error: "Error creating event" });
    }
  };

// example EVENT JSON:
// {
//   "name": "randomName",
//   "owner": "Zain nauman",
//   "privacy": "public",
//   "description": "cool event",
//   "location": "MEL BOURNE"
// }