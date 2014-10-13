app.factory('UserService', function($http) {

  var pre;
  var sessionStatus;

  function init() {                   // Logged in  : Logged out
    pre = appUser.user != undefined ? appUser.user  : { name: 'Logged out', uid: '0' };
    sessionStatus = pre.uid != "0"  ? true          : false;
  }

  function resetSession() {
    appUser = null;
    init();
    console.log("Reinit'd sess after logout, new sessionStatus: "+sessionStatus)
  }

  init();
  var userPromise;

  return {
    sessionStatus: function() { return sessionStatus; },

    async: function(uid) {
      if ( !userPromise ) {
        if(uid === "pre") { uid = pre.uid; }
        userPromise = $http.get("/api/users?uid="+uid).then(function (data, status, headers, config) {
          user = data.data[0];
          console.log("Loaded User!");
          console.log(user);
          return user;
        })
      }
      return userPromise;
    },

    logout: function() {
      $http.get("/logout").then(function (data, status, headers, config) {
        console.log("Logged out!");
        resetSession();
        console.log(sessionStatus);
      })
    }

  };
});
