const mysql = require("mysql");

const connectionPool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "test", // change this to your local database
});

exports.usersAttendingEvent = async (req, res) => {
    const event_id = req.params.event_id;
  
    connectionPool.query(
      `SELECT u.first_name, u.last_name, e.name as event_name
       FROM users u
       JOIN user_event ue ON u.id = ue.user_id
       JOIN events e ON e.id = ue.event_id
       WHERE ue.event_id = ?;`,
      [event_id],
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

  exports.eventsUserIsAttending = async (req, res) => {
    const user_id = req.params.user_id;
  
    connectionPool.query(
      `SELECT e.name as event_name, e.owner
       FROM events e
       JOIN user_event ue ON e.id = ue.event_id
       JOIN users u ON u.id = ue.user_id
       WHERE ue.user_id = ?;`,
      [user_id],
      (err, rows) => {
        if (err) {
          console.error("Error executing query:", err.stack);
          return res.status(500).json({ error: "Error retrieving user" });
        }
        if (rows.length === 0) {
          return res.status(404).json({ error: "User not found" });
        }
        res.json(rows);
      }
    );
  }


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
  
  exports.unenlistUser = async (req, res) =>{
    const eventData = req.body;

    // Ensure the request body contains the necessary data
    if (!eventData || !eventData.event_id || !eventData.user_id) {
      return res.status(400).json({ error: 'event_id and user_id are required in the request body' });
    }
  
    const { event_id, user_id } = eventData;
  
    // Delete the user from the event in the user_event table
    connectionPool.query(
      'DELETE FROM user_event WHERE event_id = ? AND user_id = ?',
      [event_id, user_id],
      (err, result) => {
        if (err) {
          console.error('Error deleting user from event:', err);
          return res.status(500).json({ error: 'Error deleting user from event' });
        }
  
        if (result.affectedRows === 0) {
          return res.status(404).json({ error: 'User or event not found' });
        }
  
        res.status(204).end(); // Respond with a 204 No Content status on successful deletion
      }
    );
  };
