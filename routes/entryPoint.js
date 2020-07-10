const router = require('express').Router();


//entry point
router.route('/').get((req, res) => {
    console.log("This is the req.body", req.body);

    res.json("Response OK");
});

//----------------------------------------

module.exports = router;