module.exports = (express, app) => {
    const controller = require("../controllers/user.controller.js");
    const router = express.Router();

    // Get all users
    router.get("/all", controller.listUsers);

    // Get a user by ID
    router.get("/:id", controller.getUserByID);

    // Get a user's list of events they're attending
    router.get("/events/:id", controller.getEventList);

    // Create new user/register
    router.post("/register", controller.createUser);

    // Update user
    router.put("/:id", controller.updateUser);

    // Delete user
    router.delete("/:id", controller.deleteUser);

    // Add routes to server.
    app.use("/api/users", router);
};
