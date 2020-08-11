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

        const user = await Employee.findOne(
            {firstName: Request.Parameters['given-name'].toLowerCase()}
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