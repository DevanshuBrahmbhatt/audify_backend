const router = require("express").Router();
const TaskController = require("../../controllers/task.controller");


router.get("/viewAll",TaskController.viewAll);
router.get("/view/:email",TaskController.view);



module.exports = router;
