var app = angular.module('Dossier', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('index', {
        url: '/',
        views: {
            '': { templateUrl: 'partials/template-content' },
            '@index': { templateUrl: 'partials/view-index' }
        }
    })
    .state('home', {
        url: '/home',
        views: {
            '': { templateUrl: 'partials/template-content' },
            '@home': { templateUrl: 'partials/view-home' }
        }
    })
    .state('dossier', {
        url: '/dossiers/:id',
        views: {
            '': { templateUrl: 'partials/template-content' },
            '@dossier': { templateUrl: 'partials/view-dossier' }
        }
    })
    .state('signin', {
        url: '/signin',
        views: {
            '': { templateUrl: 'partials/template-single' },
            '@signin': { templateUrl: 'partials/view-signin', controller: 'SigninController' }
        }
    })

    $urlRouterProvider.otherwise('/');
})

app.run(function ($rootScope, $location, $state, SessionService) {
  $rootScope.$on('$stateChangeStart', function() {
    SessionService.checkAuth();
  });
})
