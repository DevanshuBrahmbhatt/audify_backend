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
          message = `${user.firstName} is currently ${user.status}.`;
        }else{
          message = `Sorry I couldn't find the status of ${name}`;
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

module.exports = SetAvailability;