import express from 'express';
import passport from 'passport';
import Strategy from 'passport-local';

const router = express.Router();

//Authenticates the user using the local Db
router.post('/login', passport.authenticate('local'),(req, res) => {
    res.sendStatus(200);
});

//Checks if the user is authenticated or not
router.get('/status', (req,res) => {
    if(req.user) return res.send(req.user);
    return response.sendStatus(401);

});

//Responsible for logging the user out
router.post('/logout', (req,res) =>{
    if(!req.user) return res.sendStatus(401) //not authed
    req.logout((error) => {
        if(error) return res.sendStatus(400);
        res.sendStatus(200);
    })
});

//redirects to the registration page
router.get('/register', (req,res) => {
    res.render('register', { title: 'Pkapenkakis Eshop' });
});

export default router;
