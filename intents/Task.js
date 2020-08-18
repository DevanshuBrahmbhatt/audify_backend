const _ = require("lodash");
const Tasksh = require("../models/task");
const Employee = require("../models/employee");

class Task {
  static async setTaskName(req, res, Request) {
      // console.log("req"+ JSON.stringify(req));
      // console.log("res"+  JSON.stringify(res));
      console.log(Request);
    // const name = Request.Parameters["task-name"];
    // if(name != '' && name!= undefined){
    //   const task =new Tasksh();
    //   task.name=name;
    //   task.save();
    // }

    // console.log(name);
    return res.send({});
  }
}

module.exports = Task;
