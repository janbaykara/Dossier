app.factory('SessionService', function($http, $state, $location) {

  var bogusSession = injectedSession;
  var pre;
  var status;

  function init() {
                               // Logged in  : Logged out
    pre = checkSession() ? bogusSession.user : { name: 'Logged out', uid: '0' };
              status = pre.uid != "0" ? true : false;
  }

  function checkSession() {
    if(bogusSession != null)
      return Object.keys(bogusSession).length !== 0;
    else
      return false;
  }

  init();

  return {
    pre: function() { return pre; },

    status: function() { return status; },

    logout: function() {
      $http.get("/logout").then(function (data, status, headers, config) {
        bogusSession = null;
        init();
        if($state.current.name != 'signin') $state.go("index");
      })
    },

    checkAuth: function() {
      if(this.status() == false && $state.current.name != 'signin') {
        $location.path('/');
      } else {
        $location.path('/home');
      }
    }

  };
});
