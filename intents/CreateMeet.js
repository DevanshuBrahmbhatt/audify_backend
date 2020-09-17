const {google} = require('googleapis');
const axios = require('axios');
const request = require('request');
const moment = require('moment');

function getAuthClient() {
    const oAuth2Client = new google.auth.OAuth2(
        '993657414746-0vio5lmpt74c05tk6og1qkfi73mrb2mv.apps.googleusercontent.com',
        'YxK6Yl_blQMg916D67q5o-2U',
        [
            "https://audify.live"
            // "https://b40d9269de2e.ngrok.io/"
        ]);
    return oAuth2Client;
}

async function getAccessToken(connection, oAuth2Client) {
    return new Promise(async (resolve, reject) => {
        oAuth2Client.setCredentials(connection);
        if (oAuth2Client.isTokenExpiring()) {
            oAuth2Client.refreshAccessToken((err, tokens) => {
                if (err) {
                    reject(err);
                } else {
                    console.log({auth_token : tokens, is_refresh : true});
                    resolve({auth_token : tokens, is_refresh : true});
                }
            })
        } else {
            console.log({auth_token : connection, is_refresh : false});
            resolve({auth_token : connection, is_refresh : false});
        }
    });
}

async function getUserProfile(auth_token) {
    return new Promise(async(resolve, reject) => {
        request.get({
            url : `https://www.googleapis.com/userinfo/v2/me`,
            headers: {
                Authorization: `Bearer ${auth_token}`
            },
            json : true
        }, (err, httpResponse, body) => {
            if (err) {
                reject(err)
            } else {
                console.log(body);
                resolve(body);
            }
        });
    })
}

function getCalendarList(auth_token) {
    return new Promise((resolve, reject) => {
        request.get({
            url : `https://www.googleapis.com/calendar/v3/users/me/calendarList?minAccessRole=owner`,
            headers: {
                Authorization: `Bearer ${auth_token}`
            },
            json : true
        }, (err, httpResponse, body) => {
            if (err) {
                reject(err)
            } else {
                console.log(JSON.stringify(body));
                resolve(body.items);
            }
        });
    })
}

let queryObj = {
    start: moment().utc().add(1, 'day').format(),
    end: moment().utc().add(1, 'day').add(1, 'hour').format(),
    visitorEmail : '17itubs050@ddu.ac.in',
    description : `Hi Devanshu please join meeting`,
    title : "Discussion about project"
};

function createEvent(auth_token, queryObj) {
    let postData = {
        "end": {
            "dateTime": queryObj.end,
            'timeZone': 'Canada/Eastern',
        },
        "start": {
            "dateTime": queryObj.start,
            'timeZone': 'Canada/Eastern',
        },
        "attendees": [
            {
                "email": queryObj.visitorEmail
            }
        ],
        "description": queryObj.description,
        "summary": queryObj.title,
        'conferenceDataVersion': 1,
        'conferenceData': {
            createRequest: {requestId: "7qxalsvy0e"}
        }
    };
    // console.log(postData);
    return new Promise((resolve, reject) => {
        request.post({
            url : `https://www.googleapis.com/calendar/v3/calendars/primary/events?sendNotifications=true&sendUpdates=all&conferenceDataVersion=1`,
            headers: {
                Authorization: `Bearer ${auth_token}`,
                "Content-type" : "application/json"
            },
            body : postData,
            json : true
        }, (err, httpResponse, body) => {
            if (err) {
                reject(err)
            } else {
                console.log(body);
                resolve(body);
            }
        });
    })
}




module.exports= {
    getAuthClient,
    getAccessToken,
    getUserProfile,
    getCalendarList,
    createEvent,
}
createEvent('ya29.a0AfH6SMAjYlPARpfTPmTYU2NZbVMHAo6xzDLGT6yO92GvLWKqTEshPIJ-cZ_GMjgLnerImNzXbB_ldiUAasGgLkkWFj0bDj9a4J3M2W6Tj9tbv8CuJx0nu6eTxf8daDFeJSERT1QtusN__AK9paAUW0A53POsFqGRfDUk', queryObj)

// getCalendarList('ya29.a0AfH6SMBTD65Ks8ltYh335beX5vCuxyNJc_-uXKhXgxJcx1JUZ8BxsnT8JoAYu2XWBI_bW0xQ3x49NS5IITSGgnE8IM441csAhAYXJOTb8GmJ7dk5PdpV-GZ2wZUQ2YvyTYLlTohbsMEO3oApM5VmAQLO7DW6jCuZpSA')

getAccessToken('ya29.a0AfH6SMAjYlPARpfTPmTYU2NZbVMHAo6xzDLGT6yO92GvLWKqTEshPIJ-cZ_GMjgLnerImNzXbB_ldiUAasGgLkkWFj0bDj9a4J3M2W6Tj9tbv8CuJx0nu6eTxf8daDFeJSERT1QtusN__AK9paAUW0A53POsFqGRfDUk', getAuthClient());