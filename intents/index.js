const jwtDecode = require("jwt-decode");
const Availability = require("./Availability");
const Notification = require("./Notification");
const Task = require("./Task");
const Client = require("./Client");
const CreateMeet = require("./CreateMeet");

module.exports = (req, res) => {
  const Request = {
    Intent: req.body.queryResult.intent,
    QueryText: req.body.queryResult.queryText
      ? req.body.queryResult.queryText
      : null,
    Contexts: req.body.queryResult.outputContexts,
    Parameters: req.body.queryResult.parameters,
    User: jwtDecode(req.body.originalDetectIntentRequest.payload.user.idToken),
  };

  // console.log(Request)
  console.log("Intent: ", Request.Intent.displayName);

  switch (Request.Intent.displayName) {
    case "set-availability":
      Availability.set(req, res, Request);
      break;

    case "get-availability":
      Availability.get(req, res, Request);
      break;

    case "get-availability - yes":
      Availability.getYes(req, res, Request);
      break;

    case "send notification":
      Notification.send(req, res, Request);
      break;

    case "check notifications":
      Notification.check(req, res, Request);
      break;

    case "check notifications - yes":
      Notification.read(req, res, Request);
      break;

    case "assign-task":
      Task.setTask(req, res, Request);
      break;

    case "get-task":
      Task.getTask(req, res, Request);
      break;

    case "create-meet":
      CreateMeet.setEvent(req, res, Request);
      break;

    case "client-updates":
      Client.sendUpdates(req, res, Request);
      break;

    case "client-project-updates":
      Client.getUpdates(req, res, Request);
      break;

    default:
      console.log("default");
      return res.send({});
  }
};
