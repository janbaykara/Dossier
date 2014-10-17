app.controller('SigninController', function($scope, SessionService) {
  // console.log("Signing in...");
  SessionService.logout();
});
