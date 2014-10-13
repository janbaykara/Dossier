app.factory('UserService', function($http, $state, $location) {

  var bogusSession = injectedSession;
  var pre;
  var sessionStatus;

  function init() {
    console.log("Initialising bogus session")
    console.log(bogusSession)
                               // Logged in  : Logged out
    pre = checkSession() ? bogusSession.user : { name: 'Logged out', uid: '0' };
    sessionStatus = pre.uid != "0" ?    true : false;
    // console.log("User logged in? "+sessionStatus);
  }

  function checkSession() {
    if(bogusSession != null)
      return Object.keys(bogusSession).length !== 0;
    else
      return false;
  }

  init();
  var userPromise;

  return {
    pre: function() { return pre; },
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
        bogusSession = null;
        init();
        if($state.current.name != 'signin') $state.go("index");
      })
    },

    checkAuth: function() {
      if(this.sessionStatus() == false && $state.current.name != 'signin') {
        console.log("Redirecting to index...");
        $location.path('/');
      } else {
        console.log("Sending on to home...");
        $location.path('/home');
      }
    }

  };
});
