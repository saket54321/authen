const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const User=require('../model/model');


passport.use(new LocalStrategy({
  usernameField:'email',
  passReqToCallback:true
},
async function(req,email,password,done){
  try{
  const user= await User.findOne({email,email});
  
      
      if(!user || user.password!=password){
        
          return done(null,false);
      }
      else{
        //console.log(user);
      return done(null,user);
      }
  }
  catch{
      
          console.log('error in finding user');
          return done(err);
      
  }

  

}
));

// passport.use(new LocalStrategy(async function(email, password, done) {
//   try {
//     const user = await User.findOne({ email: email });
//     console.log(user);
    
//     if (user) {
//       return done(null, user);
//     } else {
//       return done(null, false);
//     }
//   } catch (err) {
//     console.log('Error in finding user:', err);
//     return done(err); // Pass the error to the done callback
//   }
// }));
// passport.use( new LocalStrategy({usernameField: 'email',passwordField: 'password'},async (email, password, done) => {
//   try {
//     // Find the user with the given username
//     const user = await User.findOne({ email:email });
//     //console.log(user);

//     // If the user does not exist, return an error
//     if (!user) {
//       console.log('User not found');
//       return done(null, false, { message: 'Incorrect email' });
//     }

    
//     //decrypt and check password from stored one
//     //const passwordMatches = await bcrypt.compare(password, user.password);


//     //verify password
//     //
    

//     // Otherwise, return the user object
//     return done(null, user);
    
//   } catch (err) {
//       console.log('Error while authenticating user');
//     return done(err);
//   }
// }));

  
// this is for cookie at the time of sign
  passport.serializeUser((user, done) => {
    //console.log(user.id);
    done(null, user.id);
  });
  // if the user id is found it send back user with the respond
  passport.deserializeUser(async function(id,done){
    try{
    const user= await User.findById(id)
    //console.log(user);
        
        return done(null,user);
    }
    catch(err){
        
            console.log('error in finding user');
            return done(err);
        
    }

    

});
  module.exports=passport;