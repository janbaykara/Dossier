app.controller('AppController', function($scope, $http, SessionService) {
  // Auth services
  $scope.sessionStatus = function() { return SessionService.status(); }
  $scope.logout = function() { SessionService.logout(); }

  // Load user's details from API
  $scope.user = SessionService.pre(); // preload name & uid from session injection
});

app.controller('SigninController', function($scope, SessionService) {
  // console.log("Signing in...");
  SessionService.logout();
});
