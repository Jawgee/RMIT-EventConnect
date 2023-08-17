module.exports = (express, app) => {
  const controller = require("../controllers/user.controller.js");
  const router = express.Router();

  // Create routes
  router.get("/listUsers", controller.listUsers);
  router.get("/getUser/:id", controller.getUserByID);
  router.post("/createUser", controller.createUser);
  router.put("/updateUser/:id", controller.updateUser);
  router.delete("/deleteUser/:id", controller.deleteUser);

  // Add routes to server.
  app.use("/api", router);
};

