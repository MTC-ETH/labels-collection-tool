const router = require('express').Router();

const articles = require(`../models/articles`);

//entry point
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

//----------------------------------------

module.exports = router;