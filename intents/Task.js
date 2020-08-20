const _ = require("lodash");
const Tasksh = require("../models/task");
const Employee = require("../models/employee");
const employee = require("../models/employee");

class Task {
  static async setTask(req, res, Request) {
    console.log(Request);
    const taskName = Request.Parameters["task-name"];
    const taskDescription = Request.Parameters["task-description"];
    const employeeName = Request.Parameters["given-name"];
    const assignee = Request.User.given_name;

    const task = new Tasksh();
    task.name = taskName;
    task.description = taskDescription;
    task.assignee = assignee;
    task.assign_to = employeeName.toString();
    task.status = "assigned";
    task.save();

    return res.send({
      payload: {
        google: {
          expectUserResponse: false,
          richResponse: {
            items: [
              {
                simpleResponse: {
                  textToSpeech: `I have assigned task name is, ${taskName}. The description is ${taskDescription}. to employee named ${employeeName}.`,
                },
              },
            ],
          },
        },
      },
    });
  }

  static async getTask(req, res, Request) {
    const employee = Request.User.given_name;
    const task = await Tasksh.findOne({ assign_to: employee });
    let message = `Hello! ${task.assign_to}, Today your taskname is ${task.name} and description is ${task.description}`;

    return res.send({
      payload: {
        google: {
          expectUserResponse: false,
          richResponse: {
            items: [
              {
                simpleResponse: {
                  textToSpeech: message,
                },
              },
            ],
          },
        },
      },
    });
  }
}

module.exports = Task;
