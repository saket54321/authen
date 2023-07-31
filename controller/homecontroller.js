const User=require('../model/model');

module.exports.home=function(req,res){
    return res.render('home');
}
module.exports.signup=function(req,res){
    if (req.isAuthenticated()) {
        res.redirect('/profile');
      } 
      
      
    return res.render('signup')
    
    
}
module.exports.profile=function (req, res)  {
    if (req.isAuthenticated()) {
        // we can only acess the profile if user is sign in
        // in passport authentication user is send in cookie to extract any information
        // use req.user
      return res.render('profile', { user: req.user });
    } else {
      return res.redirect('/sign');
    }
  };
module.exports.signin=function(req,res){
    // isAuthenticated is built in function in passport and check that user is sign in or not
    // by checking the cokie
    if (req.isAuthenticated()) {
        return res.redirect('/profile');
      } 
        return res.render('sign');
      
    //return res.render('sign');
    };


module.exports.create=async function(req,res){
    //check the password matches the confirm password
//    
try {
    //sign up page
    // 1. Check if password and confirmPassword are equal
    if (req.body.password != req.body.confirmpassword) {
        return res.redirect('back');
    }

    // 2. Check if the user already exists
    const user = await User.findOne({ email: req.body.email });
    
    

    if (!user) {
        // 3. Create the user
         User.create(req.body);
        return res.redirect('/sign');
    } else {
        return res.redirect('/sign');
    }
} catch (error) {
    console.log(error);
    return res.redirect('back');
}

}
//it is for manual authentication
// module.exports.createsession=async function(req,res){
//     try{
//         let user=await  User.findOne({ email: req.body.email });
//         if(user){
//             if(user.password!=req.body.password){
//                 return res.redirect('back');
//             }
           
//             res.cookie('user_id',user.id);
//             return res.redirect('/profile');
//         }
//         else{
//             return res.redirect('/');
//         }

//     }
//     catch(err){
//         console.log(error);
//         return res.redirect('back');
//     }


// }

module.exports.createsession=async function(req,res){
    //console.log("hello");
    
    return res.redirect('/profile');
}
module.exports.signout=function (req, res,next)  {
    req.logout(function(err) {
        if (err) {
          return next(err);
        }
        res.redirect("/sign");
      });
  };
