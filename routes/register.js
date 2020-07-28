const router = require('express').Router();

const nodemailer = require('nodemailer');
const labellers = require(`../models/labellers`);


function sendRegistrationEmailAndWriteInDB(name, surname, email, affiliation, smtpTrans, res) {
    const newLabeller = new labellers({
        name: name,
        surname: surname,
        email: email,
        affiliation: affiliation,
        confirmedEmail: false
    });

    return newLabeller.save()
        .then(savedObject => savedObject._id)
        .then(idToken => {
            const link = "http://localhost:3000/labelling?token=" + idToken;
            // Specify what the email will look like
            const mailOpts = {
                from: process.env.EMAIL, // This is ignored by Gmail
                to: email,
                subject: '[MTC] emotions and stance project registration',
                text:
                    `Dear ${name},
Thank you for registering to the MTC emotion and stance project. You can start working and labelling
articles and comments by clicking on this link: ${link}. This will also confirm your account.

Please note down your personal id for future use: ${idToken}

For any problem or enquiry feel free to reply to this email and we will get back to you.
Thanks for helping us advancing ML research!
All the best,
The emotion and stance MTC team`
            };
            return smtpTrans.sendMail(mailOpts).then(info => console.log(info));
        })
        .then(() => {
            console.log("Email sent successfully. Successfully recorded on DB.");
            res.json('OK. Email sent successfully. Successfully recorded on DB.');
        });
}

function sendAlreadyExistingEmail(name, surname, email, affiliation, idToken, smtpTrans, res) {
    console.log("Email already exists in DB, resending email.");
    const link = "http://localhost:3000/labelling?token=" + idToken;
    // Specify what the email will look like
    const mailOpts = {
        from: process.env.EMAIL, // This is ignored by Gmail
        to: email,
        subject: '[MTC] already registered emotions and stance project',
        text:
            `Dear ${name},
You have attemped to use this email to register to the MTC emotion and stance study, but the email is already in use. 
You can start working by clicking on this link: ${link}. This will also confirm your account if not confirmed yet.

Please note down your personal id for future use: ${idToken}

For any problem or enquiry feel free to reply to this email and we will get back to you.
Thanks for helping us advancing ML research!
All the best,
The emotion and stance MTC team`
    };

    return smtpTrans.sendMail(mailOpts).then(info => console.log(info))
        .then(() => {
            console.log("Email sent successfully.");
            res.status(400).json({error: null, message: "email already in use. A second email with the link " +
                    "to begin the study has been sent to " + email + ". Please use that link or another email."});
        });
}

// POST route from contact form
router.route('/').post((req, res) => {
    console.log("Receveid new email.");
    // Instantiate the SMTP server
    const smtpTrans = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASS
        }
    });

    const {name, surname, email, affiliation} = req.body;

    //first check that given email is not already in the se of registered mails
    return labellers.findOne({email: email}).exec()
        .then(queryRes => {
            //exists already
            if(queryRes !== null) {
                return sendAlreadyExistingEmail(name, surname, email, affiliation, queryRes._id, smtpTrans, res);
            }
            //doesn't exist already
            return sendRegistrationEmailAndWriteInDB(name, surname, email, affiliation, smtpTrans, res);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err, message: "Internal server error, please try again."});
        });
});

module.exports = router;