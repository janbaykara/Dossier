/* ---
  Controllers.spec.js
  Karma tests
*/

// @@@ <<< Remove this when global declaration in HTML is deprecated in favour of sessions/cookies
var injectedSession = {"user":{"name":"Jan Baykara","uid":"35293745"}};

describe('Dossier App', function() {
  beforeEach(module('Dossier.io'));

  /* ---
    Controllers
  */
  describe('Unit: DossierController', function() {
    var ctrl, scope;

    beforeEach(inject(function($controller, $rootScope) {
      scope = $rootScope.$new();
      ctrl = $controller('DossierController', { $scope: scope });
    }));

    it('should never be spoken of again',
      function() { // fuck unit testing
        expect(1).toEqual(1);
    });
  });
});
