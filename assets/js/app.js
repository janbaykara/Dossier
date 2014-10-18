var app = angular.module('Dossier.io', ['ui.router', 'ngTagsInput', 'ngResource']);

app.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('index', {
        url: '/',
        views: {
            '': { templateUrl: 'partials/template-content' },
            '@index': { templateUrl: 'partials/view-index' }
        }
    })
    .state('signin', {
        url: '/signin',
        views: {
            '': { templateUrl: 'partials/template-single' },
            '@signin': { templateUrl: 'partials/view-signin', controller: 'SigninController' }
        }
    })
    .state('home', {
        url: '/home',
        views: {
            '': { templateUrl: 'partials/template-content' },
            '@home': { templateUrl: 'partials/view-home' }
        }
    })
    .state('categories', {
        url: '/categories',
        views: {
            '': { templateUrl: 'partials/template-content' },
            '@categories': { templateUrl: 'partials/view-categories' }
        }
    })
    .state('dossier', {
        url: '/dossiers/:id',
        views: {
            '': { templateUrl: 'partials/template-content' },
            '@dossier': { templateUrl: 'partials/view-dossier' }
        }
    })

    $urlRouterProvider.otherwise('/');
})

app.run(function ($rootScope, $location, $state, SessionService, $urlRouter) {
  var whitelist = [ // Publicly viewable states
    'index'
  , 'signin'
  , 'about'
  ];

  $rootScope.$on('$stateChangeStart', function(event, to, toParams, from, fromParams) {
    checkAuth(to.name,$state.current.name,event);
  });

  // @@@ ^^^ Encapsulate in modular helper functions
  // See: https://stackoverflow.com/questions/21891218/using-state-methods-with-statechangestart-tostate-and-fromstate-in-angular-ui
  function checkAuth(to,from,event) {
      var hash = window.location.hash.substr(2);
      console.log("STATUS: "+SessionService.status()+" || FROM: "+from+" || TO: "+to+" || HASH: "+hash);
      if(SessionService.status() == false) {            //console.log("GATEKEEPER: Hello, visitor.");
        if(whitelist.indexOf(to) == -1) {               //console.log("--GATEKEEPER: Snooping where you shouldn't?")
          event.preventDefault(); goIndex();
        } else { asYouWere(); }
      } else {                                          //console.log("GATEKEEPER: You're logged in.");
        if(!from && to != 'home' && !hash) {            //console.log("--GATEKEEPER: But wandering aimlessly...");
          event.preventDefault(); goHome();
        } else { asYouWere(); }
      }
      function goIndex() { $state.go('index'); /* console.log("To / with you!"); */}
      function goHome() { $state.go('home'); /* console.log("... let's take you /#/home."); */}
      function asYouWere() { /* console.log("As you were."); */ }
    }
})

app.controller('AppController', function($scope, $http, SessionService) {
  // Auth services
  $scope.sessionStatus = function() { return SessionService.status(); }
  $scope.logout = function() { SessionService.logout(); }

  // Load user's details from API
  $scope.user = SessionService.user(); // preload name & uid from session injection
});
