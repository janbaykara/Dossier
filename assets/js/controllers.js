app.controller('AppController', function($scope, $interval, $sails, $http, UserService) {

  UserService.async('pre').then(function(user) {
    $scope.user = user;
    // console.log(user);
  });

  $scope.UserService = UserService;

  $interval(function() {
    // console.log($scope.user);
  }, 2000);

    $http.get("/api/users")
      .success(function (data) {
        $scope.users = data;
        // console.log($scope.users);
      })
      .error(function (data) {
        alert("Houston, we've got a problem!");
      });

    $sails.on("message", function (message) {
      // console.log(message);
      if (message.verb === "create") {
        $scope.users.push(message.data);
        // console.log($scope.users);
      }
    });

});

app.controller('SigninController', function($scope, UserService) {

  UserService.logout();

});
