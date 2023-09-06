module.exports = (express, app) => {
    const controller = require("../controllers/enlist.controller.js");
    const router = express.Router();

    // used to directly a user/event pair to the junction table

    // Get all users attending an event
    router.get("/Attendees/:event_id", controller.usersAttendingEvent);

    // Get all events a user is attending
    router.get("/Events/:user_id", controller.eventsUserIsAttending);

    // creates a user, event pair
    router.post("/", controller.addUserEvent);

    //unenlists a user from an event
    router.delete("/", controller.unenlistUser);

    app.use("/api/Enlist", router);
};

//example adding user, event pair

// {
//     "user_id": 1,
//     "event_id":3
// }