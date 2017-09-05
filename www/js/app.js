"use strict";

angular.module('PsiPlannerApp', ['ionic', 'ngCordova', 'dbManager', 'ui.calendar'])

.config(['dbConnectionManagerProvider', function(dbConnectionManagerProvider) {
    dbConnectionManagerProvider.setDatabaseName('PsiPlanner');
    dbConnectionManagerProvider.setLocation('default');
}])

.config(['dbFixturesManagerProvider', function(dbFixturesManagerProvider) {
    /* Sets the version of the database */
    dbFixturesManagerProvider.setDatabaseVersion(1);

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
        url: '/add-event',
        views: {
            'menuContent': {
                templateUrl: 'templates/pages/event.html',
                controller: 'EventController'
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
        },
        subjectsService: 'SubjectsService',
        resolve: {
            subjects: ['SubjectsService', '$ionicLoading', function(SubjectsService, $ionicLoading) {
                $ionicLoading.show({
                    content: 'Loading',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                return SubjectsService.getAll()
                .then(function(subjects) {
                    return subjects;
                })
                .catch(function(error) {
                    console.error(error);
                })
                .finally(function() {
                    $ionicLoading.hide();
                })
            }]
        }
    })

    .state('app.subject', {
        url: '/subjects/:subjectId',
        views: {
            'menuContent': {
                templateUrl: 'templates/pages/subject.html',
                controller: 'SubjectController'
            }
        },
        subjectsService: 'SubjectsService',
        resolve: {
            subjectData: ['SubjectsService', '$stateParams', '$ionicLoading', function(SubjectsService, $stateParams, $ionicLoading) {
                var result = {subject: null, classes: null, preCorrelatives: null, sucCorrelatives: null};
                var subjectId = null;
                $ionicLoading.show({
                    content: 'Loading',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                return SubjectsService.getById($stateParams.subjectId)
                .then(function(subject) {
                    subjectId = subject.id;
                    result.subject = subject;
                    return SubjectsService.getClasses(subjectId);
                })
                .then(function(classes) {
                    result.classes = classes;
                    return SubjectsService.getPreCorrelatives(subjectId);
                    return result;
                })
                .then(function(preCorrelatives) {
                    result.preCorrelatives = preCorrelatives;
                    return SubjectsService.getPostCorrelatives(subjectId);
                })
                .then(function(sucCorrelatives) {
                    result.sucCorrelatives = sucCorrelatives;
                    return result;
                })
                .catch(function(error) {
                    console.error(error);
                })
                .finally(function() {
                    $ionicLoading.hide();
                })
            }]
        }
    })

    .state('app.mySubjects', {
        url: '/my-subjects',
        views: {
            'menuContent': {
                templateUrl: 'templates/pages/my-subjects.html',
                controller: 'MySubjectsController'
            }
        },
        subjectsService: 'SubjectsService',
        resolve: {
            mySubjects: ['SubjectsService', '$ionicLoading', function(SubjectsService, $ionicLoading) {
                $ionicLoading.show({
                    content: 'Loading',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                return SubjectsService.getMySubjects()
                .then(function(mySubjects) {
                    return mySubjects;
                })
                .catch(function(error) {
                    console.error(error);
                })
                .finally(function() {
                    $ionicLoading.hide();
                })
            }]
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
