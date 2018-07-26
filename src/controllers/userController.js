 const userQueries = require("../db/queries.users.js");
 const passport = require("passport");
 const publishableKey = process.env.PUBLISHABLE_KEY;

 module.exports = {
 
   index(req, res, next) {
     res.redirect("/");
   },

   signUp(req, res, next) {

     res.render("users/signup");
   },

   create(req, res, next){
     let newUser = {
       username: req.body.username,
       email: req.body.email,
       password: req.body.password,
       passwordConfirmation: req.body.passwordConfirmation
     };

     userQueries.createUser(newUser, (err, user) => {
       if(err){
         req.flash("error", err);
         res.redirect("/users/signup");
       } else {

         passport.authenticate("local")(req, res, () => {
           req.flash("notice", "You've successfully signed up!");
           res.redirect("users/welcome_user");
         })
       }
     res.render("users/welcome_user");
     });
   },

   signInForm(req, res, next){
     res.render("users/sign_in");
   },

   signIn(req, res, next){
     passport.authenticate("local")(req, res, () => {
       if(!req.user){
         req.flash("notice", "Sign in failed. Please try again.")
         res.redirect("/users/sign_in");
       } else {
         req.flash("notice", "You've successfully signed in!");
         res.redirect("users/welcome_user");
       }
     })
     res.render("users/welcome_user");
   },

   signOut(req, res, next){
     req.logout();
     req.flash("notice", "You've successfully signed out!");
     res.redirect("/");
   },

   upgradeForm(req, res, next){
     res.render("users/upgrade_downgrade", {publishableKey});
   },

   upgrade(req, res, next){
     userQueries.upgrade(req.user.dataValues.id);
     res.render("users/payment_response");
   },

   downgrade(req, res, next){
     userQueries.downgrade(req.user.dataValues.id);
     req.flash("notice", "You are no longer a premium user!");
     res.redirect("/");
   }
}
