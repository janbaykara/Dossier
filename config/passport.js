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
  done(null, user.uid);
});

passport.deserializeUser(function(id, done) {
  User.find({uid:id}).exec(function (err, user) {
    console.log("Deserializing user:")
    console.log(user);
    done(err, user);
  });
});

var verifyHandler = function (token, tokenSecret, profile, done) {
  console.log("Verify Handling");
  process.nextTick(function () {
    console.log("(Next tick)");
    User.find({uid: profile.id}).exec(function (err, user) {
      if (user.length > 0) {
        console.log("I have asserted that user exists. Here he is:")
        console.log(user);
        console.log("Logging user in: "+user.name);
        return done(null, user);
      } else {
        console.log("Creating new user: "+profile.displayName);
        User.create({
          "name": profile.displayName,
          "uid": profile.id,
          "provider": profile.provider
        }).exec(function (err, user) {
          console.log("User created:"+user.name);
          console.log(user);
          return done(null, user);
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
