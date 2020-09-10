const Afterware = require("../lib/afterware");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
const Collection = require("../models/task");
const Employee = require("../models/employee");

class TaskController {
  static async viewAll(req, res) {
    try {
      const collections = await Collection.find({});
      console.log(collections);
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
  static async view(req, res) {
    try {
      const email = req.params.email;
      const collections1 = await Employee.findOne({ email: email });
      // console.log(collections1);

      const collections = await Collection.find({
        assign_to: collections1.firstName,
      });
      // console.log(collections);
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
}

module.exports = TaskController;
