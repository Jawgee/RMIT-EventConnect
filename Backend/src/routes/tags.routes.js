module.exports = (express, app) => {
    const controller = require("../controllers/tag.controller.js");
    const router = express.Router();
  
    // Create routes
  
    router.get("/listTags", controller.listTags);
    router.get("/getUserByTag/:column", controller.getUserByTag);
    router.put("/updateUserInterests/:id", controller.updateUserInterests);
  
    // Add routes to server.
    app.use("/api/tags", router);
  };
  
  