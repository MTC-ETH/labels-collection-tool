const router = require('express').Router();
const _ = require('lodash');

const labelledentries = require(`../models/labelledentries`);


//get the next article to be tagged
router.route('/labelled').get((req, res) => {
    console.log("This is the req.body", req.body);

    let token = _.get(req, "query.token", null);
    console.log("token = " + token);
    console.log(process.env.ADMIN_TOKEN);
    if(!token) {
        return res.status(400).send({error: "Please provide token in query"});
    }
    if(token !== process.env.ADMIN_TOKEN) {
        return res.status(400).send({error: "Wrong token"});
    }

    //check that the labellerID exists
    return labelledentries.find({})
        .then(queryRes => {
            console.log(queryRes);
            res.set("Content-Disposition", "attachment; filename=labelled.json");
                    res.type('application/json');
                    res.json(queryRes);
                })
        .catch(err => res.status(500).send(err));
});


//----------------------------------------

module.exports = router;