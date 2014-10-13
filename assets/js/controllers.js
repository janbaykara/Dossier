app.controller('AppController', function($scope, $http, UserService) {
  // Auth services
  $scope.sessionStatus = function() { return UserService.sessionStatus(); }
  $scope.logout = function() { UserService.logout(); }

  // Load user's details from API
  $scope.user = UserService.pre(); // preload name & uid from session injection
  UserService.async('pre').then(function(user) { $scope.user = user; });
});

app.controller('SigninController', function($scope, UserService) {
  // console.log("Signing in...");
  UserService.logout();
});
