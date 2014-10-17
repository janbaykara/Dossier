app.controller('SigninController', function($scope, SessionService) {
  // console.log("Signing in...");
  SessionService.logout();
});

app.controller('DossierController', function($scope, Dossier, SessionService, User) {
  // Get User's dossiers
  $scope.user = User.query({uid: SessionService.user().uid}, function(usr) {
    $scope.user = $scope.user[0];
    console.log($scope.user);
  });

  $scope.create = function() {
    $scope.newDossier.user = $scope.user.uid
    $scope.dossier = new Dossier($scope.newDossier);
    Dossier.save($scope.dossier, function(dos) {
      $scope.user.dossiers[$scope.user.dossiers.length] = dos;
    });
  }

  $scope.delete = function(dossier) {
    Dossier.delete({id: dossier.id}, function() {
      _.remove($scope.user.dossiers, function(dos) { return dos.id == dossier.id; });
    });
  }
});

app.controller('CategoryController', function($scope, Category) {
  $scope.categories = Category.query();

  $scope.create = function() {
    $scope.category = new Category($scope.newCategory);
    Category.save($scope.category, function(cat) {
      $scope.categories[$scope.categories.length] = cat;
    });
  }

  $scope.delete = function(category) {
    Category.delete({id: category.id}, function() {
      _.remove($scope.categories, function(cat) { return cat.id == category.id; });
    });
  }

  $scope.validCategory = function() {
    if(newCategory.name == null)
      return false;
    else
      return true;
  }
});
