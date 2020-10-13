module.exports = (google_oauth20, passport) => {
  const GoogleStrategy = require("passport-google-oauth20").Strategy;
  var data = {};
  var image;
  passport.use(
    new GoogleStrategy(
      {
        clientID:
          "82181218727-pdvc9i24fs0njbsov9vb1ihrrmnghg8m.apps.googleusercontent.com",
        clientSecret: "7Nbyfc9N99CPx9avBJf-ZsRs",
        callbackURL: "http://localhost:3000/callback",
      },
      function (acceToken, refreshToken, profile, done) {
        data.name = profile.displayName;
        image = profile._json.picture;
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

  google_oauth20.get(
    "/google",
    passport.authenticate("google", { scope: ["profile"] })
  );

  google_oauth20.get(
    "/callback",
    passport.authenticate("google"),
    (req, res) => {
      // res.send("Login successfully!")
      // res.send(data);
      res.send(
        "<center><h1>" + data.name + "</h1><img src='" + image + "'</img>"
      );
    }
  );
};
