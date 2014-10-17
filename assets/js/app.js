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

app.run(function ($rootScope, $location, $state, SessionService) {
  $rootScope.$on('$stateChangeStart', function() {
    SessionService.checkAuth();
  });
})

app.controller('AppController', function($scope, $http, SessionService) {
  // Auth services
  $scope.sessionStatus = function() { return SessionService.status(); }
  $scope.logout = function() { SessionService.logout(); }

  // Load user's details from API
  $scope.user = SessionService.user(); // preload name & uid from session injection
});
