const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const userController = require("../controllers/users");

router.route("/signup")
.get(userController.renderSignupForm)
.post(wrapAsync(userController.userSignup));

router.route("/login")
.get(userController.renderLoginform)
.post(
    saveRedirectUrl,
    passport.authenticate(
        'local',
         {
             failureRedirect: '/user/login',
            failureFlash:true
         }),
        userController.userLogin)

router.get("/logout",userController.userLogout);

module.exports = router;