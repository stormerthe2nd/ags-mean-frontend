require("dotenv").config()
const passport = require('passport');
const User = require("../model/user")
var router = require('express').Router();
const GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/callback",
  passReqToCallback: true
},
  function (request, accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });
    done(null, profile)
  }
));

passport.serializeUser(function (user, done) {
  console.log("inside passport s")
  done(null, user)
})

passport.deserializeUser(function (user, done) {
  console.log("inside passport d")
  done(null, user)
})


// Routes

const loggedIn = (req, res, next) => {
  req.user ? next() : res.send("No User")
}

router.get('/', async function (req, res) {
  res.send("<a href='/auth/google'>Google Auth</a>")
});

router.get("/protected", loggedIn, function (req, res) {
  console.log("in protected ", req.user)
  res.json(req.user)
})

router.get("/google", passport.authenticate("google", { scope: ["email", "profile"] })
)

router.get("/callback", (req, res, next) => { console.log("in middleware"); next() }, passport.authenticate("google", {
  successRedirect: "/auth/protected", failureRedirect: "/auth"
}))


module.exports = router;
