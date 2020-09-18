const _ = require("lodash");
const Employee = require("../models/employee");
const Team = require("../models/team");
const Meet = require("./MeetFunctions");
const moment = require("moment");

class CreateMeet {
  static async setEvent(req, res, Request) {
    const agenda = Request.Parameters["agenda"];
    const time = Request.Parameters["time"];
    const date = Request.Parameters["date"];
    const team = Request.Parameters["team"];
    const title = Request.Parameters["title"];

    const employeeEmails = [];

    const find_team = await Team.findOne({ name: team });
    // console.log("Response"+find_team);
    console.log(find_team.employee[0].employee);
    console.log(find_team.employee[0].employee.length);

    for (let i = 0; i < find_team.employee[0].employee.length; i++) {
      const emp = await Employee.findOne({
        _id: find_team.employee[0].employee[i],
      });
      console.log(emp);
      console.log(" All EMP" + find_team.employee[0].employee[i]);

      // console.log("here is an emaill " + JSON.stringify(emp.email));

      employeeEmails.push(emp.email);
    }
    console.log("Array of Emp Emails" + employeeEmails);
    const host = await Employee.findOne({ email: Request.User.email });
    await Meet.getAccessToken(
      host.calendarAccess.access_token,
      Meet.getAuthClient()
    );

    let queryObj = {
      start: moment().utc().add(1, "day").format(),
      end: moment().utc().add(1, "day").add(1, "hour").format(),
      visitorEmail: employeeEmails,
      description: agenda,
      title: title,
    };
    await Meet.createEvent(host.calendarAccess.access_token, queryObj);
  }
}

module.exports = CreateMeet;
