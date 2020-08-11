const jwtDecode = require('jwt-decode');

const Availability = require('./Availability');

module.exports = (req, res) => {

    // console.log(JSON.stringify(req.body))

    const Request  = {
        Intent: req.body.queryResult.intent,
        QueryText: req.body.queryResult.queryText ? req.body.queryResult.queryText : null,
        Contexts: req.body.queryResult.outputContexts,
        Parameters: req.body.queryResult.parameters,
        User: jwtDecode(req.body.originalDetectIntentRequest.payload.user.idToken)
    };

    // console.log(Request)
    console.log('Intent: ', Request.Intent.displayName)

    switch(Request.Intent.displayName){
        case 'set-availability':
            Availability.set(req, res, Request);
            break;
        
        default:
            console.log('default')
            return res.send({});
            break;
    }
}