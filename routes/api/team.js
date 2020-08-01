const router=require('express').Router();
const TeamController=require('../../controllers/team.controller');

router.post('/create',TeamController.create);


module.exports = router;