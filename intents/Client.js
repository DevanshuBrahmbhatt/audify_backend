const { chat } = require("googleapis/build/src/apis/chat");
const _ = require("lodash");
const Clientsc = require("../models/client");

class Client {
  static async sendUpdates(req, res, Request) {
    const name = Request.Parameters["client_name"];

    console.log("Name" + name);
    let message;
    const user = await Clientsc.findOne({
      firstName: { $regex: new RegExp(name, "i") },
    });
    console.log("User vadu" + user.firstName);

    if (user) {
      await Clientsc.updateOne(
        { firstName: user.firstName },

        {
          chat: {
            name: user.firstName,
            message: Request.Parameters["updates"],
          },
        }
      );
      message = `Update send to ${user.firstName}`;
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

  static async getUpdates(req, res, Request) {
    const client = await Clientsc.findOne({
      firstName: Request.User.given_name,
    });

    console.log("data" + client);
    let message;
    if (client.chat[0].message) {
      message = ` Hello your work update is ${client.chat[0].message}, And Would you like to send them feedback  `;
    } else {
      message = `Sorry, I couldn't find the work updates for you`;
    }

    return res.send({
      payload: {
        google: {
          expectUserResponse: true,
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
