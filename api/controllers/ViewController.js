module.exports = {
    render: function(req, res, next) {
      console.log("PASSOVER: Rendering skeleton HTML with injected session vars");
      console.log(req.session.passport);
      if(req.session.passport !== undefined) {
        console.log("PASSOVER: Passport session initialised:");
        console.log(req.session.passport.user);
        var session = JSON.stringify(req.session.passport);
      }
      else { // backup placeholder obj so Angular doesn't weep like a lil' bitch
        console.log("PASSOVER: No session properties, use pladeholder obj...");
        var session = JSON.stringify({ user: { name: 'Logged out', uid: "0" } });
      }

      res.view('default', { session: session });
    }
}
