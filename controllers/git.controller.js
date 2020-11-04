const Afterware = require("../lib/afterware");
const moment = require("moment");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
const Collection = require("../models/gitStat");

class GitController {
    static async stat(req, res) {
        try {
            const repository = req.body.repository.name;
            const owner = req.body.repository.owner.name;
            const operator = req.body.sender.login;
            const created_at = req.body.head_commit.timestamp;
            const error_message = req.body.head_commit.message;

            const collection = new Collection();
            collection.repository = repository;
            collection.owner = owner;
            collection.operator = operator;
            collection.created_at = created_at;
            collection.error_message = error_message;
            collection.save();

            return Afterware.sendResponse(req, res, 200, {
                status: "success",
                message: "new Github operation track successfully",
            });

        } catch (error) {
            console.log(error);
            return Afterware.sendResponse(req, res, 500, {
                status: "error",
                message: "Internal Server Error",
            });
        }
    }

    static async getStat(req, res) {
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
}

module.exports = GitController;