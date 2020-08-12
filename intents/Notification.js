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

  static async check (req, res, Request) {

    const notifications = await NotificationSch.find({
      to: Request.User.email
    });

    let message;
    if(notifications.length){
      message = `You have ${notifications.length} new notifications. Would you like me to read them?`
    }else{
      message = `You have no new notifications. What else can I help you with?`;
    }

    return res.send({
      payload: {
        google: {
          expectUserResponse: true,
          richResponse: {
            items: [
              {
                simpleResponse: {
                  textToSpeech: message
                }
              }
            ]
          }
        }
      }
    });
  }

  static async read (req, res, Request) {

    const notifications = await NotificationSch.find({
      to: Request.User.email
    });

    let message = '';
    if(notifications.length){

      for(let i=0; i<notifications.length; i++){
        message += `${notifications[i].notification}. `;
      }

    }else{
      message = `You have no new notifications. What else can I help you with?`;
    }

    return res.send({
      payload: {
        google: {
          expectUserResponse: true,
          richResponse: {
            items: [
              {
                simpleResponse: {
                  textToSpeech: message
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