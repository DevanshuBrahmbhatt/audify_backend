const router=require('express').Router();
const team=require('./team');
const employee=require('./employee');
const task=require('./task');
const client=require('./client');

router.use('/team',team);
router.use('/employee',employee);
router.use('/task',task);
router.use('/client',client);

module.exports=router;