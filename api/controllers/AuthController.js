/**
 * AuthController
 *
 * @module      :: Controller
 * @description :: Contains logic for handling requests.
 */

var passport = require('passport');

var AuthController = {

  logout: function (req, res) {
    console.log("/logout - Logging out")
    req.logout();
    res.send(204);
  },

  'twitter': function (req, res, next) {
    console.log("Auth root: /auth/TWITTER")
    passport.authenticate('twitter')(req, res, next);
  },

  'twitter/callback': function (req, res, next) {
    console.log("Auth root: /auth/TWITTER/callback");
    passport.authenticate('twitter', function(err, user, info) {
      if(user.isArray) user = user[0];

      console.log("Auth root: /auth/TWITTER/callback authenticate");
      console.log("Logging user in: "+user.name)

      req.logIn(user, function(err) {
        console.log("Auth root: /auth/TWITTER/callback login");
        if (err) return next(err);
        res.redirect('/');
      });
    })(req, res, next);
  },

  'dropbox': function (req, res, next) {
    console.log("Auth root: /auth/DROPBOX")
    passport.authenticate('dropbox')(req, res, next);
  },

  'dropbox/callback': function (req, res, next) {
    console.log("Auth root: /auth/DROPBOX/callback");
    passport.authenticate('dropbox', function(err, user, info) {
      if(user.isArray) user = user[0];

      console.log("Auth root: /auth/DROPBOX/callback authenticate");
      console.log("Logging user in: "+user.name)

      req.logIn(user, function(err) {
        console.log("Auth root: /auth/DROPBOX/callback login");
        if (err) return next(err);
        res.redirect('/');
      });
    })(req, res, next);
  },
};

module.exports = AuthController;
