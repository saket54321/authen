const express=require('express');
const passport=require('passport');
const router=express.Router();
const homecont=require('../controller/homecontroller');
router.get('/',homecont.home);

router.get('/signup',homecont.signup);
router.get('/profile',homecont.profile);
router.get('/sign',homecont.signin);
router.post('/create',homecont.create);
router.get('/signout',homecont.signout);

//router.post('/create-session',homecont.createsession); for manual authentication signin
//passport authentication
//here local indicate it li local authentication and when fail it comes to sign in page
router.post('/create-session', passport.authenticate('local', {
    
    failureRedirect: '/sign'
  }),homecont.createsession)



// Define routes for Google authentication
router.get('/auth/google', passport.authenticate('google',{scope:['profile','email']}));

//callback from google
router.get('/auth/google/callback', passport.authenticate('google',{failureRedirect:'/sign'}), homecont.createsession);


module.exports=router;

// router.get('/auth/google',
//   passport.authenticate('google', { scope: ['profile'] })
// );

// // Google callback
// router.get('/auth/google/callback',
//   passport.authenticate('google', { successRedirect: '/profile', failureRedirect: '/sign' })
// );

