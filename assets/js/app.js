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
            '': { templateUrl: 'partials/template.content.html' },
            '@index': { templateUrl: 'partials/view.index.html' }
        }
    })

    .state('home', {
        url: '/things',
        views: {
            '': { templateUrl: 'partials/template.content.html' },
            '@home': { templateUrl: 'partials/view.home.html' }
        }
    })

    .state('thing', {
        url: '/things/:id',
        views: {
            '': { templateUrl: 'partials/template.content.html' },
            '@thing': { templateUrl: 'partials/view.thing.html' }
        }
    })

    .state('signin', {
        url: '/signin',
        views: {
            '': { templateUrl: 'partials/template.single.html' },
            '@signin': { templateUrl: 'partials/view.signin.html' }
        }
    })

    .state('sandbox', {
        url: '/sandbox',
        templateUrl: 'partials/template.sandbox.html'
    })

    $urlRouterProvider.otherwise('/');
})

app.run(function ($state) {
   $state.transitionTo('index');
})
