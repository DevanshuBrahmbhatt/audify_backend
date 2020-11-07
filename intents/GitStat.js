const _ = require("lodash");
const gitStat = require("../models/gitStat");

class GitStat {
    static async getStat(req, res, Request) {
        const git_updates = await gitStat.find({}).sort({ date: -1 });

        console.log(git_updates);
        let message = "";
        if (git_updates.length) {
            let i = git_updates.length - 1;
            while (i >= 0) {
                message += `Hello, Yes you have an update on your ${git_updates[i].repository} repository by ${git_updates[i].operator}  With the message ${git_updates[i].error_message}. Would you like to know more updates? `;
                i--;
                break;
            }

            // for (let i = git_updates.length - 1; i >= 0; i--) {
            //     message += `Hello, Yes you have an update on your ${git_updates[i].repository} repository by ${git_updates[i].operator}  With the message ${git_updates[i].error_message}. `;
            // }
        } else {
            message = `You have no new gitupdates. What else can I help you with?`;
        }

        return res.send({
            payload: {
                google: {
                    expectUserResponse: true,
                    richResponse: {
                        items: [{
                            simpleResponse: {
                                textToSpeech: message,
                            },
                        }, ],
                    },
                },
            },
        });
    }

    static async getStatMore(req, res, Request) {
        const git_updates = await gitStat.find({});


        let message = "";


        if (git_updates.length) {
            for (let i = git_updates.length - 2; i >= 0; i--) {
                message += `Hello, Yes you have an update on your ${git_updates[i].repository} repository by ${git_updates[i].operator}  With the message ${git_updates[i].error_message}. Please Interrupt me if you get the update `;
            }
        } else {
            message = `You have no new gitupdates. What else can I help you with?`;
        }

        return res.send({
            followupEventInput: {
                name: "git-update",
                languageCode: "en-US",

                richResponse: {
                    items: [{
                        simpleResponse: {
                            textToSpeech: message,
                        },
                    }, ],
                },
            },
        });
    }
}

module.exports = GitStat;