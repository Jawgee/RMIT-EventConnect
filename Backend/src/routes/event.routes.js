module.exports = (express, app) => {
    const controller = require("../controllers/event.controller.js");
    const router = express.Router();

    // Get all events
    router.get("/", controller.listEvents);

    // Get a event by ID
    router.get("/:id", controller.getEventByID);
    
    // Get attendee list
    router.get("/Attendees/:id", controller.getAttendeeList);

    // Get event subcategories
    router.get("/Categories/tags", controller.getCategories);

    // Get profile categories
    router.get("/Categories/profile", controller.getProfileCategories);

    // edit event's list of tags
    router.put("/:id", controller.editEvent);

    // create new event
    router.post("/", controller.createEvent);

    //MIGHT GET RID OF THIS ONE
    router.post("/AddAttendee/:id", controller.addAttendee);

    // delete event
    router.delete("/:id", controller.deleteEvent);


    app.use("/api/Events", router);
};
