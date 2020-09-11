const _ = require("lodash");
const Clientsc = require("../models/client");

class Client {
  static async sendUpdates(req, res, Request) {
    const name = Request.Parameters["client_name"];

    console.log("Name"+name);
    let message;
    const user = await Clientsc.findOne({
      firstName: { $regex: new RegExp(name, "i") },
    });
    console.log("User vadu"+ user.firstName);


    if (user) {
      await Clientsc.updateOne(
        { firstName:  user.firstName },
        
        {chat:
          {
          name: user.firstName,
          message: Request.Parameters["updates"]
        }
      }
      );
      message=`Update send to ${user.firstName}`;
    } else {
      message = `Sorry, I haven't send any updates`;
    }
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

  // static async getUpdates(req, res, Request) {
  //   const name = Request.Parameters["given-name"];

  //   const user = await Employee.findOne({
  //     firstName: { $regex: new RegExp(name, "i") },
  //   });

  //   let message;
  //   if (user && user.firstName && user.status) {
  //     message = `${user.firstName} is currently ${user.status}. Would you like to send him a notification?`;
  //   } else {
  //     message = `Sorry, I couldn't find the status of ${name}`;
  //   }

  //   return res.send({
  //     payload: {
  //       google: {
  //         expectUserResponse: true,
  //         richResponse: {
  //           items: [
  //             {
  //               simpleResponse: {
  //                 textToSpeech: message,
  //               },
  //             },
  //           ],
  //         },
  //       },
  //     },
  //   });
  // }

  // static async getYes(req, res, Request) {
  //   let name;
  //   for (let i = 0; i < Request.Contexts.length; i++) {
  //     if (_.includes(Request.Contexts[i].name, "get-availability-followup")) {
  //       name = Request.Contexts[i].parameters["given-name"];
  //     }
  //   }

  //   return res.send({
  //     followupEventInput: {
  //       name: "notification",
  //       languageCode: "en-US",
  //       parameters: {
  //         "given-name": name,
  //       },
  //     },
  //   });
  // }
}

module.exports = Client;
