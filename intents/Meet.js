("use strict");
const _ = require("lodash");
const Employee = require("../models/employee");

const functions = require("firebase-functions");
const { google } = require("googleapis");
const { WebhookClient } = require("dialogflow-fulfillment");

// Enter your calendar ID below and service account JSON below
const calendarId = "v6nupko5v9a712ed50audfq7a4@group.calendar.google.com";
const serviceAccount = {
  web: {
    client_id:
      "993657414746-f5gd3savlrf609ugk5nrdb1jvaf4idbt.apps.googleusercontent.com",
    project_id: "audify",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_secret: "qP4HjaM7jq-m93NZ6Zabb6b_",
    redirect_uris: ["https://audify-9c8e3.firebaseapp.com/__/auth/handler"],
    javascript_origins: [
      "http://localhost",
      "http://localhost:5001",
      "https://audify-9c8e3.firebaseapp.com",
      ""
    ],
  },
};

// Set up Google Calendar Service account credentials
const serviceAccountAuth = new google.auth.JWT({
  email: serviceAccount.client_email,
  key: serviceAccount.private_key,
  scopes: "https://www.googleapis.com/auth/calendar",
});

const calendar = google.calendar("v3");
process.env.DEBUG = "dialogflow:*"; // enables lib debugging statements

const timeZone = "America/Los_Angeles";
const timeZoneOffset = "-07:00";

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(
  (request, response) => {
    const agent = new WebhookClient({ request, response });
    console.log("Parameters", agent.parameters);
    const appointment_type = agent.parameters.agenda;


    let intentMap = new Map();
    intentMap.set("Schedule Appointment", makeAppointment);
    agent.handleRequest(intentMap);

    
     function  makeAppointment(agent) {
    //   Calculate appointment start and end datetimes (end = +1hr from start)
      console.log("In Make"+"Parameters", agent.parameters.date);

      const dateTimeStart = new Date(
        Date.parse(
          agent.parameters.date.split("T")[0] +
            "T" +
            agent.parameters.time.split("T")[1].split("-")[0] +
            timeZoneOffset
        )
      );
      const dateTimeEnd = new Date(
        new Date(dateTimeStart).setHours(dateTimeStart.getHours() + 1)
      );
      const appointmentTimeString = dateTimeStart.toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        hour: "numeric",
        timeZone: timeZone,
      });

      // Check the availibility of the time, and make an appointment if there is time on the calendar
      return createCalendarEvent(dateTimeStart, dateTimeEnd, appointment_type)
        .then(() => {
          agent.add(
            `Ok, let me see if we can fit you in. ${appointmentTimeString} is fine!.`
          );
        })
        .catch(() => {
          agent.add(
            `I'm sorry, there are no slots available for ${appointmentTimeString}.`
          );
        });
    }

  }
);

function createCalendarEvent(dateTimeStart, dateTimeEnd, appointment_type) {
  return new Promise((resolve, reject) => {
    calendar.events.list(
      {
        auth: serviceAccountAuth, // List events for time period
        calendarId: calendarId,
        timeMin: dateTimeStart.toISOString(),
        timeMax: dateTimeEnd.toISOString(),
      },
      (err, calendarResponse) => {
        // Check if there is a event already on the Calendar
        if (err || calendarResponse.data.items.length > 0) {
          reject(
            err ||
              new Error("Requested time conflicts with another appointment")
          );
        } else {
          // Create event for the requested time period
          calendar.events.insert(
            {
              auth: serviceAccountAuth,
              calendarId: calendarId,
              resource: {
                summary: appointment_type + " Appointment",
                description: appointment_type,
                start: { dateTime: dateTimeStart },
                end: { dateTime: dateTimeEnd },
              },
            },
            (err, event) => {
              err ? reject(err) : resolve(event);
            }
          );
        }
      }
    );
  });
}

