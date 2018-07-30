const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController")
const validation = require("./validation")
const User = require("../../src/db/models").User;

router.get("/users/signup", userController.signUp);
router.post("/users/signup", validation.validateSignupUsers, userController.create);

router.get("/users/sign_in", userController.signInForm);
router.post("/users/sign_in", validation.validateSigninUsers, userController.signIn);

router.get("/users/sign_out", userController.signOut);

router.get("/users/welcome_user", userController.welcomeUser);

router.get("/users/upgrade", userController.upgradeForm);
router.post("/users/:id/upgrade", userController.upgrade);

router.get("/users/downgrade", userController.downgrade);
router.post("/users/:id/downgrade", userController.downgrade);

module.exports = router;
