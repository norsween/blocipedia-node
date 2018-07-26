require("dotenv").config();
const User = require("./models").User;
const bcrypt = require("bcryptjs");
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = {
  createUser(newUser, callback){

    // use bcrypt to generate a salt which is passed to hashSync function 
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(newUser.password, salt);

    // Store hashed password in database when we create User object 
    return User.create({
      username: newUser.username,
      email: newUser.email,
      password: hashedPassword
    })
    .then((user) => {
      const msg = {
	to: newUser.email,
	from: 'testUser@example.com',
	subject: 'User Confirmation',
	text: 'Welcome to Blocipedia!',
	html: '<strong>Please login to your account to confirm membership!</strong>',
      };
	console.log(msg);
      sgMail.send(msg);
      callback(null, user);
    })
    .catch((err) => {
      callback(err);
	console.log(err);
    })
  },

  upgrade(id, callback){
    return User.findById(id)
    .then((user) => {
      if(!user){
        return callback("User does not exist!");
      } else {
        return user.updateAttributes({role: "premium"});
      }
    }) .catch((err) => {
      callback(err);
    })
  },

  downgrade(id, callback){
    return User.findById(id)
    .then((user) => {
      if(!user){
        return callback("User does not exist!");
      } else {
        return user.updateAttributes({role: "standard"});
      }
    }) .catch((err) => {
      callback(err);
    })
  }
}
