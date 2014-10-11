app.controller('AppController', function($scope, $sails) {

  (function () {
    $sails.get("/things")
      .success(function (data) {
        $scope.bars = data;
      })
      .error(function (data) {
        alert("Houston, we've got a problem!");
      });

    $sails.on("message", function (message) {
      if (message.verb === "create") {
        $scope.things.push(message.data);
      }
    });
  }());

});
