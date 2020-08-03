const router = require('express').Router();
const nodemailer = require('nodemailer');

const articles = require(`../models/articles`);
const labelledentries = require(`../models/labelledentries`);
const labellers = require(`../models/labellers`);
const labellingstatuses = require(`../models/labellingstatuses`);

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

    const queryPromises = [];
    queryPromises.push(articles.find({}, { articleID: 1}).then(results => {return {articles: results}}));
    queryPromises.push(labelledentries.find({}).then(results => {return {labelledentries: results}}));
    queryPromises.push(labellers.find({}).then(results => {return {labellers: results}}));
    queryPromises.push(labellingstatuses.find({}).then(results => {return {labellingstatuses: results}}));

    return new Promise( function ( resolve , reject ) {
        Promise.all(queryPromises)
            .then(arrOfObjects => Object.assign({}, ...arrOfObjects)) //just flattens the objects
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
    });
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