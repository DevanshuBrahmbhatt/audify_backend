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
      const empEmail = req.body.email;
      // if (!empId && empId === "") {
      //   return Afterware.sendResponse(req, res, 400, {
      //     status: "Validation Error",
      //     message: "Enter Proper EmployeeId",
      //   });
      // }
      if (!(await EmployeeController.empExists(empEmail))) {
        return Afterware.sendResponse(req, res, 400, {
          status: "error",
          message: "Employee already Exists",
        });
      } else {
        const collection = new Collection();
        collection.email = req.body.email;
        collection.password = req.body.password;
        collection.firstName = req.body.firstName;
        collection.lastName = req.body.lastName;
        collection.role = req.body.role;
        collection.joinDate = req.body.joinDate;
        collection.mobileNo = req.body.mobileNo;
        collection.save();
      }
      return Afterware.sendResponse(req, res, 200, {
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
        const collections = await Collection.find({ _id: empId });
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
          { _id: empId },
          {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            role: req.body.role,
            joinDate: req.body.joinDate,
            mobileNo: req.body.mobileNo,
            email: req.body.email,
            password: req.body.password,
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
      await Collection.deleteOne({ _id: empId });
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
  static async login(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    try {
      const checkEmp = await Collection.find({
        $and: [
          {
            email: email,
          },
          {
            password: password,
          },
        ],
      });

      if (checkEmp.length === 0) {
        return Afterware.sendResponse(req, res, 400, {
          status: "Validation Error",
          message: "You are not Allowed",
        });
      } else {
        return Afterware.sendResponse(req, res, 200, {
          status: "success",
          message: "Employee Logged In",
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

  static async empExists(empEmail) {
    const checkEmp = await Collection.find({ email: empEmail });
    if (checkEmp.length === 0) {
      return true;
    } else {
      return false;
    }
  }
}
module.exports = EmployeeController;
