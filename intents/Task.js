const _ = require('lodash');
const Task = require("../models/task");
const Employee = require("../models/employee");



class Task{
    static async  setTaskName(req,res,Request){

        const name = Request.Parameters['given-name'];
        


    }

    static async  getEmployees(req,res,Request){

    }
}


module.exports = Task;