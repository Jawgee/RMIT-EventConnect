module.exports = (express, app) => {
    const controller = require("../controllers/tag.controller.js");
    const router = express.Router();
  
    // Create routes
  
    router.get("/UserByTag/:column/:bool", controller.getUserByTag);//returns users that either like or dislike a certain tag (2 parameters in URL)
    //http://localhost:4000/api/tags/UserByTag/virtual/0

    router.get("/UserTagList/:user_id", controller.getUserTagList); //returns list of a certain user's likes and dislikes
    http://localhost:4000/api/tags/UserList/3

    // router.get("/UserInterests/:user_id", controller.getUserInterests); //returns list of a user's likes NOT WORKING YET
    //http://localhost:4000/api/tags/UserInterests/3

    router.put("/UserInterests/:id", controller.updateUserInterests);
    /*
    URL: http://localhost:4000/api/tags/UserInterests/1
    JSON: {
    "pitch": false,
    "metaverse": true,
    "stand": true
        } 
    */



    // Add routes to server.
    app.use("/api/tags", router);
  };
  
  