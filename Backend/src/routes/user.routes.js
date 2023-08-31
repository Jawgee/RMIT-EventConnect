module.exports = (express, app) => {
  const controller = require("../controllers/user.controller.js");
  const router = express.Router();

  /*
  old: routes
  router.get("/listUsers", controller.listUsers);
  router.get("/getUser/:id", controller.getUserByID);
  router.post("/createUser", controller.createUser);
  router.put("/updateUser/:id", controller.updateUser);
  router.delete("/deleteUser/:id", controller.deleteUser);
  */

  router.get("/all", controller.listUsers);
  router.get("/:id", controller.getUserByID);
  router.post("/register", controller.createUser);
  router.put("/:id", controller.updateUser);
  router.delete("/:id", controller.deleteUser);

  // Add routes to server.
  app.use("/api/users", router);
};

