module.exports = (express, app) => {
    const controller = require("../controllers/event.controller.js");
    const router = express.Router();

    // Get all events
    router.get("/all", controller.listEvents);

    // Get a event by ID
    router.get("/:id", controller.getEventByID);
    
    // Get attendee list
    router.get("/attendees/:id", controller.getAttendeeList);

    router.put("/edit/:id", controller.editEvent);

    router.post("/create", controller.createEvent);

    //MIGHT GET RID OF THIS ONE
    router.post("/addAttendee/:id", controller.addAttendee);

    router.delete("/:id", controller.deleteEvent);


    // Add routes to server.
    app.use("/api/events", router);
};
