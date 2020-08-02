const router=require('express').Router();
const team=require('./team');
const employee=require('./employee');

router.use('/team',team);
router.use('/employee',employee);

module.exports=router;