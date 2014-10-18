var app = angular.module('Dossier.io', ['ngAnimate', 'ngResource', 'ui.router', 'ngTagsInput']);

app.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
  .state('standard', {
    url: '',
    abstract: true,
    views: {
      'ui' : { templateUrl: 'partials/layout-standard' }
    }
  })
  .state('simple', {
    url: '',
    abstract: true,
    views: {
      'ui' : { templateUrl: 'partials/layout-simple' }
    }
  })
  // Content views
  .state('standard.index', {
    url: '/',
    views: {
      'content': { templateUrl: 'partials/view-index' }
    }
  })
  .state('simple.signin', {
    url: '/signin',
    views: {
      'content': { templateUrl: 'partials/view-signin', controller: 'SigninController' }
    }
  })
  .state('standard.home', {
    url: '/home',
    views: {
      'content': { templateUrl: 'partials/view-home' }
    }
  })
  .state('standard.categories', {
    url: '/categories',
    views: {
      'content': { templateUrl: 'partials/view-categories' }
    }
  })
  .state('standard.dossier', {
    url: '/dossiers/:id',
    views: {
      'content': { templateUrl: 'partials/view-dossier' }
    }
  })

  $urlRouterProvider.otherwise('/');
})

app.run(function ($rootScope, $location, $state, SessionService, $urlRouter) {
  var whitelist = [ // Publicly viewable states
    'standard.index'
  , 'simple.signin'
  , 'standard.about'
  ];

  $rootScope.$on('$stateChangeStart', function(event, to, toParams, from, fromParams) {
    checkAuth(to.name,$state.current.name,event);
  });

  // @@@ ^^^ Encapsulate in modular helper functions
  // See: https://stackoverflow.com/questions/21891218/using-state-methods-with-statechangestart-tostate-and-fromstate-in-angular-ui
  function checkAuth(to,from,event) {
    if(!SessionService.status() && whitelist.indexOf(to) == -1) {
      event.preventDefault(); $state.go('standard.index');
    } else if(SessionService.status() && !from && to != 'standard.home' && !window.location.hash.substr(2)) {
      event.preventDefault(); $state.go('standard.home');
    }
  }
})

app.controller('AppController', function($scope, $http, SessionService) {
  // Auth services
  $scope.sessionStatus = function() { return SessionService.status(); }
  $scope.logout = function() { SessionService.logout(); }

  // Load user's details from API
  $scope.user = SessionService.user(); // preload name & uid from session injection
});
