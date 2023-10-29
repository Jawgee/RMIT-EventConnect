module.exports = (express, app) => {
    const controller = require("../controllers/tag.controller.js");
    const router = express.Router();

    // Users that either like or dislike a certain tag (2 parameters in URL)
    router.get("/UserByTag/:column/:bool", controller.getUserByTag);

    // List of a certain user's likes and dislikes
    router.get("/UserTagList/:user_id", controller.getUserTagList);

    // List of a event's tags
    router.get("/EventTagList/:event_id", controller.getEventTagList);

    // Update user tags
    router.put("/UserInterests/:user_id", controller.updateUserInterests);

    // Update event tags
    router.put("/EventTags/:event_id", controller.updateEventInterests);

    app.use("/api/Tags", router);
};
// JSON: 
// {
//     "pitch": false,
//     "metaverse": true,
//     "stand": true
// } 