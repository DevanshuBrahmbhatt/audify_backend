const Collection = require("../models/employee");

class SetAvailability {
    static async set (req, res, Request) {
        await Collection.findOneAndUpdate(
            {email: Request.User.email},
            {status: Request.Parameters.availability}
        );
        return res.send({});
    }
}

module.exports = SetAvailability;