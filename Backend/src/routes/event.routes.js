module.exports = (express, app) => {
    const controller = require("../controllers/event.controller.js");
    const router = express.Router();

    // Get all users
    router.get("/all", controller.listEvents);

    // Get a user by ID
    router.get("/:id", controller.getEventByID);

    router.post("/create", controller.createEvent);


    // Add routes to server.
    app.use("/api/events", router);
};
