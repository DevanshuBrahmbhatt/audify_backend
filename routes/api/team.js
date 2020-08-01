const router=require('express').Router();
const TeamController=require('../../controllers/team.controller');

router.post('/create',TeamController.create);
router.get('/view/:teamId',TeamController.view);


module.exports = router;