const router=require('express').Router();
const team=require('./team');
const employee=require('./employee');
const task=require('./task');

router.use('/team',team);
router.use('/employee',employee);
router.use('/task',task);

module.exports=router;