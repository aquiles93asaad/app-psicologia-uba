"use strict";

angular.module('PsiPlannerApp', ['ionic', 'ngCordova', 'dbManager', 'ui.calendar'])

.config(['dbConnectionManagerProvider', function(dbConnectionManagerProvider) {
    dbConnectionManagerProvider.setDatabaseName('PsiPlanner');
    dbConnectionManagerProvider.setLocation('default');
}])

.config(['dbFixturesManagerProvider', function(dbFixturesManagerProvider) {
    /* Sets the version of the database */
    dbFixturesManagerProvider.setDatabaseVersion(2);

    /* Set to true to run fixtures and override existing database */
    dbFixturesManagerProvider.enableFixturesRun(false);
}])

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/partials/menu.html',
        controller: 'AppController'
    })

    .state('app.calendar', {
        url: '/calendar',
        views: {
            'menuContent': {
                templateUrl: 'templates/pages/calendar.html',
                controller: 'CalendarController'
            }
        }
    })

    .state('app.event', {
        url: '/add-event/:eventId/:chosenDate',
        views: {
            'menuContent': {
                templateUrl: 'templates/pages/event.html',
                controller: 'EventController'
            }
        }
    })

    .state('app.subject', {
        url: '/subjects/:subjectId',
        views: {
            'menuContent': {
                templateUrl: 'templates/pages/subject.html',
                controller: 'SubjectController'
            }
        }
    })

    .state('app.subjects', {
        url: '/subjects',
        views: {
            'menuContent': {
                templateUrl: 'templates/pages/subjects.html',
                controller: 'SubjectsController'
            }
        }
    })

    .state('app.mySubject', {
        url: '/my-subjects/:subjectId',
        views: {
            'menuContent': {
                templateUrl: 'templates/pages/my-subject.html',
                controller: 'MySubjectController'
            }
        }
    })

    .state('app.mySubjects', {
        url: '/my-subjects',
        views: {
            'menuContent': {
                templateUrl: 'templates/pages/my-subjects.html',
                controller: 'MySubjectsController'
            }
        }
    })

    .state('app.correlatives', {
        url: '/correlatives',
        views: {
            'menuContent': {
                templateUrl: 'templates/pages/correlatives.html',
                controller: 'CorrelativesController'
            }
        }
    })

    .state('app.links', {
        url: '/links',
        views: {
            'menuContent': {
                templateUrl: 'templates/pages/links.html',
                controller: 'LinksController'
            }
        }
    })

    .state('app.information', {
        url: '/information',
        views: {
            'menuContent': {
                templateUrl: 'templates/pages/information.html',
                controller: 'InformationController'
            }
        }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/calendar');
})

.run(function($ionicPlatform, dbFixturesManager, $rootScope) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });

    document.addEventListener("deviceready", function () {

        dbFixturesManager.initialize()
        .then(function() {
            console.log("Data Base initialized and up to date");
            $rootScope.$broadcast('database-ready');
        });

    }, false);
});
