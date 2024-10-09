const passport = require('passport');
const Strategy= require('passport-local');
const { testUsers } = require('../utils/constants');

passport.serializeUser((user,done) => { //stores the user object we validated in the object
    //console.log('Inside serialise User');
    //console.log(user);
    done(null,user.id); //needs to pass something that is unique
});

passport.deserializeUser((id,done) => {
    //console.log('Inside deserialise User');
    //console.log(`${id}`);
    try{
        const findUser = testUsers.find((user) => user.id === id);
        if(!findUser) throw new Error("Cannot find user");
        done(null,findUser);
    }catch(err){
        done(err,null);
    }
})

passport.use(
    new Strategy((username, password, done) => { //Function to validate the user
        //console.log(`Username: ${username}`);
        //console.log(`Password: ${password}`);
        try {
            const findUser = testUsers.find((user) => user.username === username);

            if(!findUser) throw new Error("User was not found");
            if(findUser.password !== password) throw new Error("Invalid Credentials");
            done(null,findUser); //move on and return the user
        } catch (error) {
            
            done(error, null); //move on from the verify function
        }
        
    })
);

module.exports = passport;