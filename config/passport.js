/*
  Auth.js
*/

var passport = require('passport')
  , local = require('./local.js')
  , TwitterStrategy = require('passport-twitter').Strategy
  , DropboxStrategy = require('passport-dropbox').Strategy

passport.serializeUser(function(user, done) {
  console.log("Serializing user:")
  console.log(user);
  done(null, {
    name: user.name,
    id: user.id
  });
});

passport.deserializeUser(function(user, done) {
  console.log("Deserializing user: "+user.name)
  User.findOne({uid: user.uid}).exec(function (err, user) {
    if(err) {
      // # !!!
      // Error going on with null @user var passed from verifyHandler, crashes Passport
      console.log("Deserializing - CANNOT find user...")
      console.log(err);
      done(err, null);
    }
    console.log("Deserializing - finding user...")
    console.log(user);
    done(err, user);
  });
});

var verifyHandler = function (token, tokenSecret, profile, done) {
  console.log("Verify Handling");
  console.log(profile);

  process.nextTick(function () {
    User.findOne({uid: profile.id}).exec(function (err, user) {
      if(err) {
        console.log("Roops, something went wrong finding user to auth")
        console.log(err);
        createNewUser(profile);
      } else if (user != null) {
        console.log("I have asserted that user exists. Here he is:")
        console.log(user);
        console.log("Logging user in: "+user.name);
        return done(null, user);
      } else {
        console.log("User does not exist...");
        createNewUser(profile);
      }

      function createNewUser(profile) {
        console.log("Creating new user: "+profile.displayName);

        process.nextTick(function () {
          var thisProfile = {
            "uid": profile.id,
            "name": profile.displayName,
            "provider": profile.provider
          };
          console.log("Creating profile with:")
          console.log(thisProfile);
          User.create(thisProfile).exec(function (err, user) {
            // # !!! EMPTY USER (OCCASSIONAL, CREATED OBJ)
            // User.create sometimes blanks out, passes empty vars to auth
            // May be to do with unique schema, duplicate names
            // However, database is still populated, so probably not...
            console.log(err,user);
            process.nextTick(function () {
              if(err || user == null || user.name == undefined) {
                console.log("User probably created, but I ... uh... forgot where I put it...");
                console.log(err);
                return done(null, null);
              }
              console.log("User created:"+user.name);
              console.log(user);
              return done(null, user);
            });
          });
        });
      }
    });
  });
};

module.exports = {
  express: {
    customMiddleware: function (app) {
      passport.use(new TwitterStrategy({
        consumerKey: local.TWITTER_CONSUMER_KEY,
        consumerSecret: local.TWITTER_CONSUMER_SECRET,
        callbackURL: 'http://localhost:1337/auth/twitter/callback'
        },
        verifyHandler
      ));

      passport.use(new DropboxStrategy({
        consumerKey: local.DROPBOX_CLIENT_ID,
        consumerSecret: local.DROPBOX_CLIENT_SECRET,
        callbackURL: 'http://localhost:1337/auth/dropbox/callback'
        },
        verifyHandler
      ));

      app.use(passport.initialize());
      app.use(passport.session());
    }
  }
};
