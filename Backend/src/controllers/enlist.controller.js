const mysql = require("mysql");

const connectionPool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "test", // change this to your local database
});

exports.usersAttendingEvent = async (req, res) => {
    const eventId = req.params.id;
  
    connectionPool.query(
      `SELECT u.first_name, u.last_name, e.name as event_name
       FROM users u
       JOIN user_event ue ON u.id = ue.user_id
       JOIN events e ON e.id = ue.event_id
       WHERE ue.event_id = ?;`,
      [eventId],
      (err, rows) => {
        if (err) {
          console.error("Error executing query:", err.stack);
          return res.status(500).json({ error: "Error retrieving event" });
        }
        if (rows.length === 0) {
          return res.status(404).json({ error: "Event not found" });
        }
        res.json(rows);
      }
    );
  };

  exports.addUserEvent = async (req, res) => {
    const { user_id, event_id } = req.body;
  
    try {
      // Check if the user_id and event_id pair already exists in the user_event table
      connectionPool.query(
        "SELECT * FROM user_event WHERE user_id = ? AND event_id = ?",
        [user_id, event_id],
        (checkErr, checkResults) => {
          if (checkErr) {
            console.error("Error executing query:", checkErr.stack);
            return res.status(500).json({ error: "Error checking user_event table" });
          }
  
          if (checkResults.length > 0) {
            return res.status(409).json({ error: "User is already attending the event" });
          }
  
          // Check if the event_id exists in the events table
          connectionPool.query(
            "SELECT * FROM events WHERE id = ?",
            [event_id],
            (eventCheckErr, eventCheckResults) => {
              if (eventCheckErr) {
                console.error("Error executing query:", eventCheckErr.stack);
                return res.status(500).json({ error: "Error checking events table" });
              }
  
              if (eventCheckResults.length === 0) {
                return res.status(404).json({ error: "Event not found" });
              }
  
              // If everything is valid, insert the user_event record
              connectionPool.query(
                "INSERT INTO user_event (user_id, event_id) VALUES (?, ?)",
                [user_id, event_id],
                (insertErr, insertResult) => {
                  if (insertErr) {
                    console.error("Error executing query:", insertErr.stack);
                    return res.status(500).json({ error: "Error inserting user_event record" });
                  }
                  res.json({ message: "User added to event successfully" });
                }
              );
            }
          );
        }
      );
    } catch (error) {
      console.error("Error adding user to event:", error.stack);
      res.status(500).json({ error: "Error adding user to event" });
    }
  };
  
