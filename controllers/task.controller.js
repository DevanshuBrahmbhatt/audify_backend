const Afterware = require("../lib/afterware");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
const Collection = require("../models/task");

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
}

module.exports = TaskController;
