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

app.controller('CategoryController', function($scope, Category) {
  // $scope.categories = Category.get({query:"name=Salaslsls"}, function() {
  //   console.log($scope.categories)
  // });
  $scope.categories = Category.query();

  $scope.create = function() {
    $scope.newCategory = new Category({
      id: null,
      name: $scope.newCategory.name,
      color: $scope.newCategory.color
    });

    Category.save($scope.newCategory, function() {
      $scope.categories[$scope.categories.length] = $scope.newCategory;
    });
  }

  $scope.delete = function(category) {
    category.$delete(function() {
      $scope.categories.filter(function (cat) { return cat == category }) = null;
    });
  }
})
})
