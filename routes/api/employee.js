const router = require("express").Router();
const EmployeeController = require("../../controllers/employee.controller");

router.post("/create", EmployeeController.create);
router.get("/viewAll",EmployeeController.viewAll);
router.get("/view/:empId",EmployeeController.viewEmp);
router.put("/update/:empId", EmployeeController.update);
router.delete("/delete/:empId", EmployeeController.delete);


module.exports = router;
