module.exports = (express, app) => {
    const controller = require("../controllers/enlist.controller.js");
    const router = express.Router();

    // Get a user by ID
    router.get("/:id", controller.usersAttendingEvent);

    // creates a user, event pair
    router.post("/", controller.addUserEvent);

    //unenlists a user from an event
    router.delete("", controller.unenlistUser);


    // Add routes to server.
    app.use("/api/enlist", router);
};

//example adding user, event pair

// {
//     "user_id": 1,
//     "event_id":3
// }