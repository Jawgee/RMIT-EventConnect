module.exports = (express, app) => {
    const controller = require("../controllers/user.controller.js");
    const router = express.Router();

    // Get all users
    router.get("/All", controller.listUsers);

    // Get a user by ID
    router.get("/:id", controller.getUserByID);

    // Get a user's list of events they're attending
    router.get("/Events/:id", controller.getEventList);

    // Create new user/register
    router.post("/Register", controller.createUser);

    // enlist into event
    router.post("/Enlist/:id", controller.enlistUser);

    // Update user
    router.put("/:id", controller.updateUser);

    // Delete user
    router.delete("/:id", controller.deleteUser);

    
    app.use("/api/Users", router);
};
