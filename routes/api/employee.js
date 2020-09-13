const router = require("express").Router();
const EmployeeController = require("../../controllers/employee.controller");

router.post("/create", EmployeeController.create);
router.get("/viewAll",EmployeeController.viewAll);
router.get("/view/:empId",EmployeeController.viewEmp);
router.put("/update/:empId", EmployeeController.update);
router.delete("/delete/:empId", EmployeeController.delete);
router.post("/login", EmployeeController.login);
router.get("/getNotifications", EmployeeController.getNotifications);
router.delete("/deleteNotifications/:id", EmployeeController.deleteNotifications);
router.post("/saveTokens", EmployeeController.saveTokens);


module.exports = router;
