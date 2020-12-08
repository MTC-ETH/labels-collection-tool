// Copyright 2020-2021, ETH Zurich, Media Technology Center
//
// This file is part of Labels Collection Tool (LCT) at MTC, in the scope of the project
// Emotion and Stance detection for German text.
//
// Labels Collection Tool (LCT) is a free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Labels Collection Tool (LCT) is distributed in the hope that it will be useful for similar projects,
// but Labels Collection Tool (LCT); without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Lesser Public License for more details.
//
// You should have received a copy of the GNU Lesser Public License
// along with Labels Collection Tool (LCT). If not, see <https://www.gnu.org/licenses/>.

const router = require('express').Router();

const nodemailer = require('nodemailer');
const {getAllData} = require("./utils");

const schedule = require('node-schedule');


//----------- backup by email
/*Create transport to send backup of tags*/

function buildMailerJob() {
    console.log("Scheduling mail backup job");
    return schedule.scheduleJob('00 23 * * *', function () {
        console.log('Mail backup called');
        sendBackupMail();
    });
}

function sendBackupMail() {
    console.log("sendBackupMail called");

    return new Promise(function(resolve, reject) {
        getAllData()
            .then(result => {
                const stringifiedRes = JSON.stringify(result);

                const smtpTrans = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 465,
                    secure: true,
                    auth: {
                        user: process.env.EMAIL,
                        pass: process.env.EMAIL_PASS
                    }
                });

                const mailOpts = {
                    from: process.env.EMAIL, // This is ignored by Gmail
                    to: process.env.EMAIL_BACKUP,
                    subject: '[MTC] emotions and stance backup',
                    text: stringifiedRes
                };

                //we send the email
                smtpTrans.sendMail(mailOpts, function (error, info) {
                    if (error) {
                        console.log(error);
                        reject(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                        resolve(true);
                    }
                });
            })
            .catch(error => {
                console.log(error);
                reject(error)
            });
    })
}

//get the next article to be tagged
router.route('/backupnow').post((req, res) => {
    console.log("backupnow called by client");
    sendBackupMail();
    return res.send(JSON.stringify({message: "backup mail sent"}));
});


//----------------------------------------


module.exports = router;
module.exports.buildMailerJob = buildMailerJob;
module.exports.sendBackupMail = sendBackupMail;