module.exports = (express, app) => {
    const controller = require("../controllers/event.controller.js");
    const router = express.Router();

    // Get all events
    router.get("/all", controller.listEvents);

    // Get a event by ID
    router.get("/:id", controller.getEventByID);
    
    // Get attendee list
    router.get("/attendees/:id", controller.getAttendeeList);

    router.post("/create", controller.createEvent);


    // Add routes to server.
    app.use("/api/events", router);
};
