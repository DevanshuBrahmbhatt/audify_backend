const Afterware = require("../lib/afterware");
const moment = require("moment");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
const Collection = require("../models/client");

class ClientController {
  static async create(req, res) {
    try {
      const clientEmail = req.body.email;
      if (!(await ClientController.clientExists(clientEmail))) {
        return Afterware.sendResponse(req, res, 400, {
          status: "error",
          message: "Client already Exists",
        });
      } else {
        const collection = new Collection();
        collection.email = req.body.email;
        collection.password = req.body.password;
        collection.firstName = req.body.firstName;
        collection.lastName = req.body.lastName;
        collection.project = req.body.project;
        collection.mobileNo = req.body.mobileNo;
        collection.save();
      }
      return Afterware.sendResponse(req, res, 200, {
        status: "success",
        message: "new Client collection created successfully",
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
      const clientId = req.params.clientId;
      if (!clientId && clientId === "") {
        return Afterware.sendResponse(req, res, 400, {
          status: "Validation Error",
          message: "Enter Proper clientId",
        });
      } else {
        const collections = await Collection.find({ _id: clientId });
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
  static async delete(req, res) {
    try {
      const clientId = req.params.clientId;
      if (!clientId && clientId === "") {
        return Afterware.sendResponse(req, res, 400, {
          status: "Validation Error",
          message: "Enter Proper clientId",
        });
      }
      await Collection.deleteOne({ _id: clientId });
      return Afterware.sendResponse(req, res, 200, {
        status: "success",
        message: "Client deleted Successfully",
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
      const clientId = req.params.clientId;
      if (!clientId && clientId === "") {
        return Afterware.sendResponse(req, res, 400, {
          status: "Validation Error",
          message: "Enter Proper clientId",
        });
      } else {
        await Collection.updateOne(
          { _id: clientId },
          {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            project: req.body.project,
            mobileNo: req.body.mobileNo,
            email: req.body.email,
            password: req.body.password,
          }
        );
      }
      return Afterware.sendResponse(req, res, 200, {
        status: "success",
        message: "Clientloyee Data updated successfully",
      });
    } catch (error) {
      console.log(error);
      return Afterware.sendResponse(req, res, 500, {
        status: "error",
        message: "Internal Server Error",
      });
    }
  }
  static async clientExists(clientEmail) {
    const checkClient = await Collection.find({ email: clientEmail });
    if (checkClient.length === 0) {
      return true;
    } else {
      return false;
    }
  }
  static async login(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    try {
      const checkClient = await Collection.find({
        $and: [
          {
            email: email,
          },
          {
            password: password,
          },
        ],
      });

      if (checkClient.length === 0) {
        return Afterware.sendResponse(req, res, 400, {
          status: "Validation Error",
          message: "You are not Allowed",
        });
      } else {
        return Afterware.sendResponse(req, res, 200, {
          status: "success",
          message: "Client Logged In",
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
}
module.exports = ClientController;
