 const passport=require('passport');
 const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
 //it is used to generate random password when signup using google
 const crypto=require('crypto');

 const User=require('../model/model.js');
 //middle of passport to use googleStrategy
 passport.use(new GoogleStrategy({
    // it came from console.cloud.google.com
    clientID: "212459921693-6vv20gif718sq90uthip36chprt792uv.apps.googleusercontent.com",
   clientSecret: "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",
   // it is call backurl google send when user found
    callbackURL: "http://localhost:8000/auth/google/callback" // Replace with your callback URL
   },
   // profile contain many thing and many email
   async function(accessToken, refreshToken, profile, done) {
    try{
    const user=await User.findOne({email:profile.emails[0].value});
        
        //console.log(profile);
        if(user){
            return done(null, user);

        }
        // when user not find than it create the user
        else{
            User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex')
            })
        }
    }

    catch(err){
        return "error";
    }
}));
    


 module.exports=passport;
