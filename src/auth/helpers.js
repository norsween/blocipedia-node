const bcrypt = require("bcryptjs");

module.exports = {

  // Middleware function passed before protected requests  
  ensureAuthenticated(req, res, next) {
    if (!req.user){
      req.flash("notice", "You must be signed in to do that.")
      return res.redirect("/users/sign_in");
    } else {
      next();
    }
  },

  comparePass(userPassword, databasePassword) {
    return bcrypt.compareSync(userPassword, databasePassword);
  }
}
