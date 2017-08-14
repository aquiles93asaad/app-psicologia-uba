angular.module('UbaPsicologiaApp', ['ionic', 'ngCordova', 'genericDaoModule', 'ui.calendar'])

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/partials/menu.html',
        controller: 'AppController'
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

    .state('app.correlatives', {
        url: '/correlatives',
        views: {
            'menuContent': {
                templateUrl: 'templates/pages/correlatives.html',
                controller: 'CorrelativesController'
            }
        }
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

    .state('app.subjects', {
        url: '/subjects',
        views: {
            'menuContent': {
                templateUrl: 'templates/pages/subjects.html',
                controller: 'SubjectsController'
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

    .state('app.mySubjects', {
        url: '/my-subjects',
        views: {
            'menuContent': {
                templateUrl: 'templates/pages/my-subjects.html',
                controller: 'MySubjectsController'
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

    .state('app.event', {
        url: '/add-event',
        views: {
            'menuContent': {
                templateUrl: 'templates/pages/event.html',
                controller: 'EventController'
            }
        }
    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/calendar');
})

.run(function($ionicPlatform) {
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
});
