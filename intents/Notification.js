const _ = require('lodash');
const NotificationSch = require("../models/notification");
const Employee = require("../models/employee");

class Notification {
    
  static async send (req, res, Request) {

    const name = Request.Parameters['given-name'];
    const user = await Employee.findOne(
      {firstName: {$regex: new RegExp(name, "i")}}
    );

    const note = new NotificationSch();
    note.to = user.email;
    note.notification = `${Request.User.name} sent you a notification for "${Request.Parameters.any}"`;
    note.save();

    return res.send({
      payload: {
        google: {
          expectUserResponse: true,
          richResponse: {
            items: [
              {
                simpleResponse: {
                  textToSpeech: `I have sent the notification to ${name}. What else can I help you with?`
                }
              }
            ]
          }
        }
      }
    });
  }
}

module.exports = Notification;