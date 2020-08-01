const Afterware = require("../lib/afterware");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
const Collection = require("../models/team");


class TeamController {
  static async create(req, res) {

    try {
      if (!req.body.teamId && req.body.teamId === "") {
        return AfterWare.sendResponse(request, response, 400, {
          status: "Validation Error",
          message: "name is Required",
        });
      } else {
        const collection = new Collection();
        collection.teamId = req.body.teamId;
        collection.name = req.body.name;
        collection.manager = req.body.manager;
        collection.project = req.body.project;
        collection.employee = req.body.employee;
        collection.save();
      }

      return Afterware.sendResponse(req, res, 200, {
        status: "success",
        message: "new team collection created successfully",
      });
    } catch (error) {
      console.log(error);

      return Afterware.sendResponse(req, res, 500, {
        status: "error",
        message: "Internal Server Error",
      });
    }
  }

  static async read(req, res) {}

  static async update(req, res) {}

  static async delete(req, res) {}
}

module.exports = TeamController;