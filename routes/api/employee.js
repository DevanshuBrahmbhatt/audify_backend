const router = require("express").Router();
const EmployeeController = require("../../controllers/employee.controller");

router.post("/create", EmployeeController.create);


module.exports = router;
