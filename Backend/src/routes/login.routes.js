module.exports = (express, app) => {
  const controller = require("../controllers/login.controller.js");
  const router = express.Router();

  // Login to app
  router.post("/Login", controller.login);

  app.use("/api/Users", router);
};
