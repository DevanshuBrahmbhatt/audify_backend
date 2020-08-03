const Afterware = require("../lib/afterware");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
const Collection = require("../models/employee");
class EmployeeController {
  static async create(req, res) {
    try {
      const empId = req.body.empId;
      if (!empId && empId === "") {
        return Afterware.sendResponse(req, res, 400, {
          status: "Validation Error",
          message: "Enter Proper EmployeeId",
        });
      }
      if (!(await EmployeeController.empExists(empId))) {
        return Afterware.sendResponse(req, res, 400, {
          status: "error",
          message: "Employee already Exists",
        });
      } else {
        const collection = new Collection();
        collection.empId = empId;
        collection.firstName = req.body.firstName;
        collection.lastName = req.body.lastName;
        collection.role = req.body.role;
        collection.joinDate = req.body.joinDate;
        collection.mobileNo = req.body.mobileNo;
        collection.save();
      }
      return Afterware.sendResponse(req, res, 400, {
        status: "success",
        message: "new Employee collection created successfully",
      });
    } catch (error) {
      console.log(error);
      return Afterware.sendResponse(req, res, 500, {
        status: "error",
        message: "Internal Server Error",
      });
    }
  }
  static async viewEmp(req, res) {
    try {
      const empId = req.params.empId;
      if (!empId && empId === "") {
        return Afterware.sendResponse(req, res, 400, {
          status: "Validation Error",
          message: "Enter Proper EmpID",
        });
      } else {
        const collections = await Collection.find({ empId: empId });
        return Afterware.sendResponse(req, res, 200, {
          status: "success",
          data: collections,
        });
      }
    } catch (error) {
      console.log(error);
      return Afterware.sendResponse(req, res, 500, {
        status: "error",
        message: "Internal Server Error",
      });
    }
  }
  static async viewAll(req, res) {
    try {
      const collections = await Collection.find({});
      return Afterware.sendResponse(req, res, 200, {
        status: "success",
        data: collections,
      });
    } catch (error) {
      console.log(error);
      return Afterware.sendResponse(req, res, 500, {
        status: "error",
        message: "Internal Server Error",
      });
    }
  }
  static async update(req, res) {
    try {
      const empId = req.params.empId;
      if (!empId && empId === "") {
        return Afterware.sendResponse(req, res, 400, {
          status: "Validation Error",
          message: "Enter Proper EmpId",
        });
      } else {
        await Collection.updateOne(
          { empId: empId },
          {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            role: req.body.role,
            joinDate: req.body.joinDate,
            mobileNo: req.body.mobileNo,
          }
        );
      }
      return Afterware.sendResponse(req, res, 200, {
        status: "success",
        message: "Employee Data updated successfully",
      });
    } catch (error) {
      console.log(error);
      return Afterware.sendResponse(req, res, 500, {
        status: "error",
        message: "Internal Server Error",
      });
    }
  }
  static async delete(req, res) {
    try {
      const empId = req.params.empId;
      if (!empId && empId === "") {
        return Afterware.sendResponse(req, res, 400, {
          status: "Validation Error",
          message: "Enter Proper EmpId",
        });
      }
      await Collection.deleteOne({ empId: empId });
      return Afterware.sendResponse(req, res, 200, {
        status: "success",
        message: "Employee deleted Successfully",
      });
    } catch (error) {
      console.log(error);
      return Afterware.sendResponse(req, res, 500, {
        status: "error",
        message: "Internal Server Error",
      });
    }
  }
  static async empExists(empId) {
    const checkEmp = await Collection.find({ empId: empId });
    if (checkEmp.length === 0) {
      return true;
    } else {
      return false;
    }
  }
}
module.exports = loyeeControll;
