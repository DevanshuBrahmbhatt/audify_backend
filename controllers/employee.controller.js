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
  static async viewEmp(req, res) {}
  static async viewAll(req, res) {}
  static async update(req, res) {}
  static async delete(req, res) {}
  static async checkEmp(empId) {}
}
module.exports = EmployeeController;
