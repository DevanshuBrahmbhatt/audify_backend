const router = require("express").Router();
const TaskController = require("../../controllers/task.controller");


router.get("/viewAll",TaskController.viewAll);



module.exports = router;
