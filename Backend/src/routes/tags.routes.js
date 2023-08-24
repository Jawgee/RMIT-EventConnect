module.exports = (express, app) => {
    const controller = require("../controllers/tag.controller.js");
    const router = express.Router();
  
    // Create routes
  
    router.get("/listTags", controller.listTags);
    //http://localhost:4000/api/tags/getUserByTag/pitch
    router.get("/getUserByTag/:column/:bool", controller.getUserByTag);
    //http://localhost:4000/api/tags/getUserByTag/virtual/0
    router.put("/updateUserInterests/:id", controller.updateUserInterests);
    /*
    URL: http://localhost:4000/api/tags/updateUserInterests/1
    JSON: {
  "pitch": false,
  "metaverse": true,
  "stand": true
    } 
    */



    // Add routes to server.
    app.use("/api/tags", router);
  };
  
  