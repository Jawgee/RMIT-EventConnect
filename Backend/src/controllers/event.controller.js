const mysql = require("mysql");
const secretKey = "testing"; // change after finishing testing
const { validateEvent } = require("../models/event.model.js"); // Adjust the path as needed


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

  exports.getAttendeeList = async (req, res) => {
    const eventId = req.params.id;

    if (!eventId) {
      return res.status(400).json({ error: "Event ID is required" });
    }
  
    try {
      // Fetch the users enlisted in the event
      connectionPool.query(
        `SELECT u.first_name, u.last_name
         FROM users u
         JOIN user_event ue ON u.id = ue.user_id
         WHERE ue.event_id = ?;`,
        [eventId],
        (err, rows) => {
          if (err) {
            console.error("Error executing query:", err.stack);
            return res.status(500).json({ error: "Error retrieving enlisted users" });
          }
  
          if (rows.length === 0) {
            return res.status(404).json({ error: "No users enlisted in this event" });
          }
  
          // Extract user names from the query result
          const enlistedUsers = rows.map((row) => ({
            first_name: row.first_name,
            last_name: row.last_name,
          }));
          res.json({ enlistedUsers });
        }
      );
    } catch (error) {
      console.error("Error retrieving enlisted users:", error.stack);
      res.status(500).json({ error: "Error retrieving enlisted users" });
    }
  };


  exports.createEvent = async (req, res) => {
    const result = validateEvent(req.body);
    if(result.error) return res.status(400).send(result.error.details[0].message);
  
    const { name, owner, privacy, description, location } = req.body;
  
    try {
      // Check if the name already exists in the database
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
            connectionPool.query("INSERT INTO Tags (event_id, tag_type) VALUES (?, 'event')", [insertedEventId], (tagErr, tagResult) => {
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

  exports.addAttendee = async (req, res) => {
    const eventId = req.params.id;
    const { userId } = req.body;
  
    // Ensure that userId is provided in the request body
    if (!userId) {
      return res.status(400).json({ error: 'userId is required in the request body' });
    }
  
    // Insert the user into the event in the event_user table
    connectionPool.query(
      'INSERT INTO user_event (event_id, user_id) VALUES (?, ?)',
      [eventId, userId],
      (err, result) => {
        if (err) {
          console.error('Error inserting user into event:', err);
          return res.status(500).json({ error: 'Error inserting user into event' });
        }
  
        if (result.affectedRows === 0) {
          return res.status(404).json({ error: 'Event not found' });
        }
  
        res.status(201).json({ message: 'User added to event successfully' });
      }
    );
  };


  exports.editEvent = async (req, res) => {
    const eventId = req.params.id;
    const eventData = req.body;
  
    if (!eventId) {
      return res.status(400).json({ error: 'Event ID is required' });
    }
  
    if (!eventData || Object.keys(eventData).length === 0) {
      return res.status(400).json({ error: 'Request body is empty' });
    }
  
    // Update the event in the database
    connectionPool.query(
      'UPDATE events SET ? WHERE id = ?',
      [eventData, eventId],
      (err, result) => {
        if (err) {
          console.error('Error updating event:', err.stack);
          return res.status(500).json({ error: 'Error updating event' });
        }
  
        if (result.affectedRows === 0) {
          return res.status(404).json({ error: 'Event not found' });
        }
  
        res.status(200).json({ message: 'Event updated successfully' });
      }
    );
  };

  
// Define a route to delete an event and its attendees
// TODO: Delete the users assoicated with event
exports.deleteEvent= async (req, res) => {
  const eventId = req.params.id;

  // Delete users attending the event
  connectionPool.query('DELETE FROM user_event WHERE event_id = ?', [eventId], (err, result) => {
    if (err) {
      console.error('Error deleting users attending event:', err);
      return res.status(500).json({ error: 'Error deleting users attending event' });
    }

    // Check if any users were deleted
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Event not found or no users attending' });
    }

    // Delete the event itself
    connectionPool.query('DELETE FROM events WHERE id = ?', [eventId], (err, result) => {
      if (err) {
        console.error('Error deleting event:', err);
        return res.status(500).json({ error: 'Error deleting event' });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Event not found' });
      }

      res.status(204).end(); // Respond with a 204 No Content status on successful deletion
    });
  });
};

// example EVENT JSON:
// {
//   "name": "randomName",
//   "owner": "Zain nauman",
//   "privacy": "public",
//   "description": "cool event",
//   "location": "MEL BOURNE"
// }