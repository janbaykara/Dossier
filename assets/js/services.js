app.factory('User', function($resource) {
  return $resource('/api/users/:id',
    { id: '@resource_id' }, {
      'search': { method: 'GET', isArray: true }
  });
});


app.factory('SessionService', function($http, $state, $location, User) {
  var bogusSession = injectedSession, user, userData, status;

  function init() {            // Logged in  : Logged out
    user = checkSession() ? bogusSession.user : { name: 'Logged out', uid: '0' };
              status = user.uid != "0" ? true : false;

    // Load user from db.
    if(status) {
      user = User.query({uid: user.uid}, function(result) {
        console.log(result[0]);
        user = result[0];
      });
    }
  }

  function checkSession() {
    if(bogusSession != null) return Object.keys(bogusSession).length !== 0;
    else return false;
  }

  init();

  return {
    userData: function() { return userData; },
    user: function() { return user; console.log(user); },
    status: function() { return status; },
    logout: function() {
      $http.get("/logout").then(function (data, status, headers, config) {
        bogusSession = null; init();
        if($state.current.name != 'signin') $state.go("index");
      })
    },
    checkAuth: function() {
      if(this.status() == false && $state.current.name != 'signin')
        $location.path('/');
      else
        $location.path('/home');
    }
  };
});
