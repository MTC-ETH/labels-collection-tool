const router = require('express').Router();

const articles = require(`../models/articles`);

//get the next article to be tagged
router.route('/article').get((req, res) => {
    console.log("This is the req.body", req.body);
    articles.findOne({}).exec((err, queryRes) => {
        if(err) {
            console.log(err);
            res.error(err);
        } else {
            console.log(JSON.stringify(queryRes));
            res.json(queryRes);
        }
    });
});

// POST an intermediate result of tagging a paragraph
router.route('/tag/paragraph').post((req, res) => {
    console.log("request of tagging paragraph");



    const form_email_name = req.body.name;
    const form_email_email = req.body.email;
    const form_email_message = req.body.message;

    // writes email on db
    const newContactFormSubmit = new ContactMail({
        email_name: form_email_name,
        email_submitted: form_email_email,
        email_message: form_email_message
    });
    console.log(newContactFormSubmit);
    requests_promises.push(
        newContactFormSubmit.save()
            .then(console.log("Email wrote on db.")));


    Promise.all(requests_promises)
        .then(() => {
            console.log("Emails sent sucessfully. Text wrote on db.");
            res.json('Successfully added contact form to db and sent emails');
        }).catch(err => {
        console.log(err);
        res.status(400).json('Error: ' + err); });
});

//----------------------------------------

module.exports = router;