import passport from 'passport';
import Strategy from 'passport-local';
import User from '../mongoose/schemas/user.js';

passport.serializeUser((user,done) => { //stores the user object we validated in the object
    done(null,user.id); //needs to pass something that is unique
});

passport.deserializeUser(async (id,done) => {
    try{
        const findUser = await User.findById(id);
        if(!findUser) throw new Error("Cannot find user");
        done(null,findUser);
    }catch(err){
        done(err,null);
    }
})

export default  passport.use(
    new Strategy(async (username, password, done) => { //Function to validate the user
        try {
            const findUser = await User.findOne({ username });
            if(!findUser) throw new Error("User was not found");
            if(findUser.password !== password) throw new Error("Invalid Credentials");
            done(null,findUser); //move on and return the user
        } catch (error) {
            done(error, null); //move on from the verify function
        }
        
    })
);
