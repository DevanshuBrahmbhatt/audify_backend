const router = require("express").Router();
const GitController = require("../../controllers/git.controller");


router.post("/payload", GitController.stat);

module.exports = router;