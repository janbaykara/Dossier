/**
 * AuthController
 *
 * @module      :: Controller
 * @description :: Contains logic for handling requests.
 */

var passport = require('passport');

var AuthController = {

  logout: function (req, res) {
    req.logout();
    res.send(200,req);
  },

  'twitter': function (req, res, next) {
    console.log("Auth root: /auth/twitter")
    passport.authenticate('twitter')(req, res, next);
  },

  // 'twitter/callback': function (req, res) {
  //     passport.authenticate('twitter', function (req, res) {
  //       res.flash(res[0]);
  //       res.redirect('/#/home');
  //     })(req, res);
  // },

  'twitter/callback': function (req, res, next) {
    console.log("Auth root: /auth/twitter/callback");
    passport.authenticate('twitter', function(err, user, info) {
      console.log("Auth root: /auth/twitter/callback authenticate");
      var user = user[0];
      console.log("Logging user in: "+user.name)
      if (err) { console.log("callback auth error"); return next(err); }
      if (!user) { console.log("callback auth no user"); return res.redirect('/#/login'); }
      req.logIn(user, function(err) {
        console.log("Auth root: /auth/twitter/callback login");
        if (err) { return next(err); }
        res.flash(user);
        res.redirect('/#/home');
      });
    })(req, res, next);
  },

  /*

  'twitter': function () {
    // console.log("Authenticating...");
    passport.authenticate('twitter');
  },

  'twitter/callback': function (req, res, next) {
    passport.authenticate('twitter', function(err, user) {
      console.log("Logging user in: "+user.displayName)
      if (err) { return next(err); }
      if (!user) { return res.redirect('/#/login'); }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.send(200,user);
      });
    })(req, res, next);
  },

*/

  // 'dropbox': function (req, res) {
  //   passport.authenticate('dropbox', { failureRedirect: '/#/login' }, function (err, user) {
  //     req.logIn(user, function (err) {
  //       if (err) {
  //         console.log(err);
  //         res.send(500,user);
  //         return;
  //       }

  //       res.send(200,user)
  //       return;
  //     });
  //   })(req, res);
  // },

  // 'dropbox/callback': function (req, res) {
  //     passport.authenticate('dropbox', function (req, res) {
  //       console.log("dropbox CALLBACK REQUEST =========================================");
  //       console.log(req)
  //       console.log("dropbox CALLBACK RESPONSE ========================================");
  //       console.log(res)
  //     })(req, res);
  // },
};

module.exports = AuthController;
