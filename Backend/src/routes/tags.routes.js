module.exports = (express, app) => {
    const controller = require("../controllers/tag.controller.js");
    const router = express.Router();

    // Routes will need to be updated to be more intuitive

    // Users that either like or dislike a certain tag (2 parameters in URL)
    router.get("/UserByTag/:column/:bool", controller.getUserByTag);
    // http://localhost:4000/api/tags/UserByTag/virtual/0

    // List of a certain user's likes and dislikes
    router.get("/UserTagList/:user_id", controller.getUserTagList);
    // http://localhost:4000/api/tags/UserTagList/3

    // List of a user's likes
    // NOT WORKING YET
    // router.get("/UserInterests/:user_id", controller.getUserInterests);
    // http://localhost:4000/api/tags/UserInterests/3

    // Update interests
    router.put("/UserInterests/:id", controller.updateUserInterests);
    /* http://localhost:4000/api/tags/UserInterests/1
    JSON: {
        "pitch": false,
        "metaverse": true,
        "stand": true
    } 
    */

    // Add routes to server.
    app.use("/api/tags", router);
};
