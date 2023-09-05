module.exports = (express, app) => {
    const controller = require("../controllers/user.controller.js");
    const router = express.Router();

    /*
      Old routes:
      router.get("/listUsers", controller.listUsers);
      router.get("/getUser/:id", controller.getUserByID);
      router.post("/createUser", controller.createUser);
      router.put("/updateUser/:id", controller.updateUser);
      router.delete("/deleteUser/:id", controller.deleteUser);
    */

    // Get all users
    router.get("/all", controller.listUsers);

    // Get a user by ID
    router.get("/:id", controller.getUserByID);

    // Create new user/register
    router.post("/register", controller.createUser);

    // Update user
    router.put("/:id", controller.updateUser);

    // Delete user
    router.delete("/:id", controller.deleteUser);

    // Add routes to server.
    app.use("/api/users", router);
};
