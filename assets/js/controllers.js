app.controller('SigninController', function($scope, SessionService) {
  // console.log("Signing in...");
  SessionService.logout();
});

app.controller('DossierController', function($scope, Dossier, SessionService, User) {
  // Get User's dossiers
  $scope.user = User.query({uid: SessionService.user().uid}, function(usr) {
    $scope.user = $scope.user[0];
    $scope.dossiers = Dossier.query({user: $scope.user.id});
  });

  $scope.create = function() {
    $scope.newDossier.user = $scope.user.id // @@@ +++ Relate this to user model
    $scope.dossier = new Dossier($scope.newDossier);
    Dossier.save($scope.dossier, function(dos) {
      $scope.dossiers[$scope.dossiers.length] = dos;
    });
  }

  $scope.delete = function(dossier) {
    Dossier.delete({id: dossier.id}, function() {
      _.remove($scope.dossiers, function(dos) { return dos.id == dossier.id; });
    })
  }
})
