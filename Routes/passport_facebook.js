module.exports = (app, passport) => {
  // app.use(passport.initialize());
  var passportFacebook = require("passport-facebook").Strategy;
  var data = {};
  var image;
  passport.use(
    new passportFacebook(
      {
        clientID: "633434900701368",
        clientSecret: "3664ee408d9bdebb1a52dc509db401cf",
        callbackURL: "http://localhost:3000/auth/facebook/callback",
        profileFields: ["id", "displayName", "photos", "email"],
      },
      function (acceToken, refreshToken, profile, done) {
        data.name = profile.displayName;
        image = profile.photos[0].value;
        // console.log(image);
        console.log(profile);
        console.log(acceToken);
        done(null, profile);
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  app.get("/auth/facebook", passport.authenticate("facebook"));

  app.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook"),
    (req, res) => {
      // res.send("Login successfully!")
      // res.send(data);
      res.send(
        "<center><h1>" + data.name + "</h1><img src='" + image + "'</img>"
      );
    }
  );
};
