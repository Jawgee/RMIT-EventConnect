module.exports = (express, app) => {
  const controller = require("../controllers/user.controller.js");
  const router = express.Router();

  // Create routes

  /* Idea/suggestion:
    Change routes from /api/listUsers etc right now to be
    /api/users/all (get)
    /api/users/:id (get)
    /api/users/create (post)
    /api/users/:id (put)
    /api/users/:id (del)
    Try and keep the amount of different routes to a minimum
    for simplicty

    and change the use from /api to /api/users
  */
  router.get("/listUsers", controller.listUsers);
  router.get("/getUser/:id", controller.getUserByID);
  router.post("/createUser", controller.createUser);
  router.put("/updateUser/:id", controller.updateUser);
  router.delete("/deleteUser/:id", controller.deleteUser);

  // Add routes to server.
  app.use("/api", router);
};

