app.factory('User', function($resource) {
  return $resource('/api/users/:id',
    { id: '@resource_id' }, {
      'search': { method: 'GET', isArray: true }
  });
});

//

app.factory('Dossier', function($resource) {
  return $resource('/api/dossiers/:id',
    { id: '@resource_id' }, {
      'search': { method: 'GET', isArray: true }
  });
});

//

app.factory('Category', function($resource) {
  Category = $resource('/api/categories/:id',
    { id: '@resource_id' }, {
      'search': { method: 'GET', isArray: true }
  });

  Category.isChild = function(cat) {
    if(cat.parent && cat.parent.id != null) return true;
    else return false;
  }

  Category.root = {
    id: null,
    name: "Uncategorised"
  }

  return Category;
});

//

app.factory('SessionService', function($http, $state, User) {
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
    }
  };
});
