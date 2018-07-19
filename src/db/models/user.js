'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: {
	type: DataTypes.STRING,
	allowNull: false
    },
    password: {
	type: DataTypes.STRING,
	allowNull: false
    },
    email: {
	type: DataTypes.STRING,
	allowNull: false,
	validate: {
	  isEmail: { msg: "must be a valid email" }
	}
    },
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
