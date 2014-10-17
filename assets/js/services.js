app.factory('User', function($resource) {
  return $resource('/api/users/:id',
    { id: '@resource_id' }, {
      'search': { method: 'GET', isArray: true }
  });
});

app.factory('Dossier', function($resource) {
  return $resource('/api/dossiers/:id',
    { id: '@resource_id' }, {
      'search': { method: 'GET', isArray: true }
  });
});

app.factory('Category', function($resource) {
  return $resource('/api/categories/:id',
    { id: '@resource_id' }, {
      'search': { method: 'GET', isArray: true }
  });
});

app.factory('SessionService', function($http, $state, $location, User) {
  var bogusSession = injectedSession, whitelist = [], user, userData, status;

  function init() {            // Logged in  : Logged out
    user = checkSession() ? bogusSession.user : { name: 'Logged out', uid: '0' };
              status = user.uid != "0" ? true : false;

    // Load user from db.
    if(status) {
      user = User.query({uid: user.uid}, function(result) {
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
    whitelist: function(whitelisted) { whitelist = whitelisted; },
    userData: function() { return userData; },
    user: function() { return user; },
    status: function() { return status; },
    logout: function() {
      $http.get("/logout").then(function (data, status, headers, config) {
        bogusSession = null; init();
        if($state.current.name != 'signin') $state.go("index");
      })
    },
    checkAuth: function(to,from) {
      if(this.status() == false) {         console.log("GATEKEEPER: Hello, visitor.");
        if(whitelist.indexOf(to) == -1)    console.log("--GATEKEEPER: Snooping where you shouldn't? To / with you.")
          $location.path('/');
      } else {                             console.log("GATEKEEPER: You're logged in.");
        if(!from && !window.location.hash.substr(2)) {
          $location.path('/home');         console.log("--GATEKEEPER: But wandering aimlessly, let's take you /#/home");
        }
      }
    }
  };
});
