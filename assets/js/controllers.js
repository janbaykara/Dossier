app.controller('SigninController', function($scope, SessionService) {
  // console.log("Signing in...");
  SessionService.logout();
});

app.controller('DossierController', function($scope, Dossier, SessionService, User, Category) {
  $scope.newDossier = {};

  // Get User's dossiers
  $scope.user = User.query({uid: SessionService.user().uid}, function(usr) {
    $scope.user = $scope.user[0];
    console.log($scope.user);
  });

  $scope.categories = Category.query({}, function() {
    $scope.newDossier.category = _.find($scope.categories, function(cat) { return cat.id == Category.root.id; });
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
  $scope.newCategory = {};

  $scope.categories = Category.query({}, function() { // @@@ !!! Fix <select> not updating on category add/remove
    $scope.newCategory.parent = _.find($scope.categories, function(cat) { return cat.id == Category.root.id; });
  });

  console.log(Category.root.id);
  $scope.topLevelCats = Category.query({parent: Category.root.id});
  $scope.assignableCats = _.clone($scope.topLevelCats);
  $scope.assignableCats[$scope.assignableCats.length] = Category.query({id: Category.root.id}, function(root) {
    $scope.assignableCats[$scope.assignableCats.length] = root;
    console.log($scope.assignableCats)
  });

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

  $scope.isChild = function(cat) { return Category.isChild(cat); }
});
