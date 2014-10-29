app.controller('SigninController', function($scope, SessionService) {
  // console.log("Signing in...");
  SessionService.logout();
});

app.controller('DossierController', function($scope, Dossier, SessionService, User, Category) {
  $scope.newDossier = {};

  // Get User's dossiers
  $scope.user = User.query({uid: SessionService.user().uid}, function(usr) {
    $scope.user = $scope.user[0];
  });

  $scope.categories = Category.query();
  $scope.topLevelCats = Category.query({parent: "null"});

  var currentTopCat = null;
  if($scope.newDossier.cat != currentTopCat) {
    $scope.childCats = Category.query({parent: $scope.newDossier.cat});
    currentTopCat = $scope.newDossier.cat;
    console.log($scope.newDossier.cat)
    console.log($scope.newDossier.childCats)
  }

  if($scope.newDossier.subcategory != null) {
    $scope.newDossier.category = $scope.newDossier.subcat;
  } else {
    $scope.newDossier.category = $scope.newDossier.cat;
  }

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

  $scope.categories = Category.query();
  $scope.assignableCats = Category.query({parent: "null"}, function() {
    $scope.newCategory.parent = $scope.assignableCats[$scope.assignableCats.length] = Category.root;
  });

  $scope.create = function() {
    $scope.category = new Category($scope.newCategory);
    Category.save($scope.category, function(cat) {
      $scope.categories[$scope.categories.length] = cat;
      // @@@ !!! Category dropdown for newly added cats not correct until refresh
    });
  }

  $scope.delete = function(category) {
    Category.delete({id: category.id}, function() {
      _.remove($scope.categories, function(cat) { return cat.id == category.id; });
    });
  }

  $scope.edit = function(category) {
    Category.update({id: category.id}, category);
  }

  $scope.isChild = function(cat) { return Category.isChild(cat); }
});
