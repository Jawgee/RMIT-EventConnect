module.exports = (express, app) => {
    const controller = require("../controllers/login.controller.js");
    const router = express.Router();
  
    // Create routes

    router.post("/login",controller.login);

  
    // Add routes to server.
    app.use("/api/users", router);
  };
  
  