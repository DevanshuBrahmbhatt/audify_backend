const _ = require('lodash');
const Employee = require("../models/employee");

class SetAvailability {

  static async set (req, res, Request) {
    await Employee.findOneAndUpdate(
        {email: Request.User.email},
        {status: Request.Parameters.availability}
    );
    return res.send({});
  }

  static async get (req, res, Request) {

    const name = Request.Parameters['given-name'];

    const user = await Employee.findOne(
      {firstName: {$regex: new RegExp(name, "i")}}
    );

    let message;
    if(user && user.firstName && user.status){
      message = `${user.firstName} is currently ${user.status}. Would you like to send him a notification?`;
    }else{
      message = `Sorry, I couldn't find the status of ${name}`;
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

  static async getYes(req, res, Request) {
    let name;
    for(let i=0; i<Request.Contexts.length; i++){

      if(_.includes(Request.Contexts[i].name, 'get-availability-followup')){
        name = Request.Contexts[i].parameters['given-name'];
      }
    }

    return res.send({
      followupEventInput: {
          "name": "notification",
          "languageCode": "en-US",
          "parameters": {
              'given-name': name
          }
      }
    });
  }
}

module.exports = SetAvailability;