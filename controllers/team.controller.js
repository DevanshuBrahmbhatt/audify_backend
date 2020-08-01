const Afterware = require("../lib/afterware");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
const Collection = require("../models/team");

class TeamController {

  static async teamExists(teamId) {
    const checkTeam = await Collection.find({ teamId: teamId });
    if (checkTeam.length === 0) {
      return true;
    } else {
      return false;
    }
  }

  static async create(req, res) {
    try {
      if (!req.body.teamId && req.body.teamId === "") {
        return AfterWare.sendResponse(request, response, 400, {
          status: "Validation Error",
          message: "Team ID is Required",
        });
      }

      if (!(await TeamController.teamExists(req.body.teamId))) {
        return Afterware.sendResponse(req, res, 400, {
          status: "error",
          message: "Team already Exists",
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

  static async view(req, res) {
    try {
      const teamId = req.params.teamId;

      if (!teamId && teamId === "") {
        return Afterware.sendResponse(req, res, 400, {
          status: "validation error",
          message: "Enter Proper TeamId",
        });
      }

      const collections = await Collection.find({ teamId: teamId });
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
      const teamId = req.params.teamId;

      if (!teamId && teamId === "") {
        return Afterware.sendResponse(req, res, 400, {
          status: "Validation Error",
          message: "Enter Proper TeamId",
        });
      } else {
        await Collection.updateOne(
          { teamId: teamId },
          {
            name: req.body.name,
            manager: req.body.manager,
            employee: req.body.employee,
            project: req.body.project,
          }
        );
      }
      return Afterware.sendResponse(req, res, 200, {
        status: "success",
        message: "Team is Updated",
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
      const teamId = req.params.teamId;
      if (!teamId && teamId === "") {
        return Afterware.sendResponse(req, res, 400, {
          status: "Validation Error",
          message: "Enter Proper TeamId",
        });
      }

      await Collection.deleteOne({ teamId: teamId });
      return Afterware.sendResponse(req, res, 200, {
        status: "Success",
        message: "Team Deleted",
      });
    } catch (error) {
      console.error(error);
      return AfterWare.sendResponse(request, response, 500, {
        status: "error",
        message: "Internal Server Error",
      });
    }
  }

 
}

module.exports = TeamController;
