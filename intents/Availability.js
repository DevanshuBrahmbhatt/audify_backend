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

        return res.send({
            payload: {
              google: {
                expectUserResponse: true,
                richResponse: {
                  items: [
                    {
                      simpleResponse: {
                        textToSpeech: `${user.firstName} is currently ${user.status}.`
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