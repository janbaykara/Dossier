app.controller('AppController', function($scope, $interval, $http, UserService) {

  // Load user's details from API
  UserService.async('pre').then(function(user) { $scope.user = user; });

  // Auth services
  $scope.logout = function() { UserService.logout(); }

  $scope.$watch(UserService.sessionStatus, function() {
      $scope.sessionStatus = UserService.sessionStatus();
  });

  $interval(function() {
    $scope.sessionStatus = UserService.sessionStatus();
  },500)
});

app.controller('SigninController', function($scope, UserService) {
  console.log("Signing in...")
  UserService.logout();
});
