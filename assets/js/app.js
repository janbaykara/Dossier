var app = angular.module('Dossier', ['ui.router', 'ngSails']);

/* AngularJS calling order
1. app.config()
2. app.run()
3. directive's compile functions (if they are found in the dom)
4. app.controller()
5. directive's link functions (again if found)
*/

app.config(function($stateProvider, $urlRouterProvider, $sailsProvider) {

  $sailsProvider.url = 'http://localhost:1337';

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
            '@signin': { templateUrl: 'partials/view-signin' }
        }
    })

    $urlRouterProvider.otherwise('/');
})

app.run(function ($state) {
   $state.transitionTo('index');
})
