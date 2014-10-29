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
    uid: user.uid
  });
});

passport.deserializeUser(function(user, done) {
  // @@@ ??? Why does passport continually query database to deserialise in single pageload?
  console.log("Deserializing user: "+user.name)
  console.log(user)
  User.find({uid: user.uid}).exec(function (err, result) {
    var user = result[0];
    if(err) {
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
  console.log("Finding users matching uid: "+profile.id)
  // @@@ ??? Refactor , move data handling to AuthController and out of config?
  User.find({uid: profile.id}).exec(function (err, user) {
    console.log("Results of query...");
    console.log(err,user);
    var user = user[0];
    if(err) {
      createNewUser(profile);
    } else if (user) {
      console.log("I have asserted that user exists. Here he is:")
      console.log(user);
      console.log("Logging user in: "+user.name);
      return done(null, user);
    } else {
      console.log("User does not currently exist...");
      createNewUser(profile, done);
    }
  });
};

function createNewUser(profile, done) {
  console.log("Creating new user: "+profile.displayName);

  var thisProfile = {
    "uid": profile.id,
    "name": profile.displayName,
    "provider": profile.provider
  };

  User.create(thisProfile).exec(function (err, user) {
    // @@@ !!! EMPTY USER (OCCASSIONAL, CREATED OBJ)
    // User.create sometimes blanks out, passes empty vars to auth
    // May be to do with unique schema, duplicate names
    // However, database is still populated, so probably not...
    console.log("User creation finished.")
    console.log(err,user);

    if(err || user == null || user.name == undefined) {
      console.log("User probably created, but I ... uh... forgot where I put it...");
      console.log(err);
      user = thisProfile; // @@@ ^^^ Hacky fix to User.create() returning null user...
    }

    console.log("User created:"+user.name);
    console.log(user);
    return done(null, user);
  });
}

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
