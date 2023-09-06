module.exports = (express, app) => {
    const controller = require("../controllers/enlist.controller.js");
    const router = express.Router();

    // Get a user by ID
    router.get("/:id", controller.usersAttendingEvent);
    router.post("/", controller.addUserEvent);


    // Add routes to server.
    app.use("/api/enlist", router);
};
