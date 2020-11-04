const router = require('express').Router();
const team = require('./team');
const employee = require('./employee');
const task = require('./task');
const client = require('./client');
const gitstat = require('./gitstat');

router.use('/team', team);
router.use('/employee', employee);
router.use('/task', task);
router.use('/client', client);
// router.use('/payload', gitstat);
const GitController = require("../../controllers/git.controller");


router.post("/payload", GitController.stat);
router.get("/getStat", GitController.getStat);

module.exports = router;