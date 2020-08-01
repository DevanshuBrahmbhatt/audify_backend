const router = require("express").Router();
const TeamController = require("../../controllers/team.controller");

router.post("/create", TeamController.create);
router.get("/view/:teamId", TeamController.view);
router.put("/update/:teamId", TeamController.update);
router.delete("/delete/:teamId", TeamController.delete);

module.exports = router;
