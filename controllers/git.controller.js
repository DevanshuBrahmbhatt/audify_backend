const Afterware = require("../lib/afterware");
const moment = require("moment");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
const Collection = require("../models/client");

class GitController {
    static async stat(req, res) {
        try {
            const repository = req.body.repository.name;
            const owner = req.body.repository.owner.name;
            const operator = req.body.sender.login;
            const created_at = req.body.head_commit.timestamp;
            const error_message = req.body.head_commit.message;

            res.send(
                repository +
                "" +
                owner +
                "" +
                operator +
                "" +
                created_at +
                "" +
                error_message
            );
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