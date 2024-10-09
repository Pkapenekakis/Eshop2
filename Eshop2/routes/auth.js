const express = require('express');
const passport = require('passport');
const Strategy = require('passport-local');
const router = express.Router();


router.post('/login', passport.authenticate('local'),(req, res) => {
    res.sendStatus(200);
});

//Checks if the user is authenticated or not
router.get('/status', (req,res) => {
    /*console.log("inside status endpoint")
    console.log(req.user)
    console.log(req.session) */
    if(req.user) return res.send(req.user);
    return response.sendStatus(401);

});

router.post('/logout', (req,res) =>{
    if(!req.user) return res.sendStatus(401) //not authed
    req.logout((error) => {
        if(error) return res.sendStatus(400);
        res.sendStatus(200);
    })
});

module.exports = router;
