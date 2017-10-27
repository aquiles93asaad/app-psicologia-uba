"user strict";

angular.module('PsiPlannerApp')

.controller('CalendarController', CalendarController);

CalendarController.$inject = [
    '$scope',
    '$rootScope',
    '$state',
    '$ionicSideMenuDelegate',
    '$ionicGesture',
    'EventsService',
    'DateTransformerService',
    'uiCalendarConfig'
];

function CalendarController(
    $scope,
    $rootScope,
    $state,
    $ionicSideMenuDelegate,
    $ionicGesture,
    EventsService,
    DateTransformerService,
    uiCalendarConfig
) {
    $scope.events = [];
    $scope.eventSources = [$scope.events];

    $scope.goToPrevMonth = function() {
        angular.element('.calendar-container').fullCalendar('prev');
    };

    $scope.goToNextMonth = function() {
        angular.element('.calendar-container').fullCalendar('next');
    };

    document.addEventListener("deviceready", function () {

        $ionicSideMenuDelegate.canDragContent(false);
        var doubleClick = null;
        var clickTimer = null;
        var height = window.outerHeight - angular.element('.bar.bar-header').outerHeight() - 60; // 60px of the calendar bar-header
        var width = window.outerWidth;

        $scope.uiConfig = {
            calendar:{
                aspectRatio: width/height,
                editable: true,
                dayClick: function(date, jsEvent, view) {
                    var singleClick = date.format();

                    if(doubleClick == singleClick) {
                        $state.go('app.event', { chosenDate: date.format() });
                    } else {
                        doubleClick = date.format();
                        clearInterval(clickTimer);
                        clickTimer = setInterval(function(){
                            doubleClick = null;
                            clearInterval(clickTimer);
                        }, 500);
                    }
                },
                eventClick: function(calEvent, jsEvent, view) {
                    $state.go('app.event', { eventId: calEvent.id });
                },
                customButtons: {
                    prevIcon: {
                       icon: ' fa fa-chevron-left',
                       click: function() {
                           angular.element('.calendar-container').fullCalendar('prev');
                       }
                   },
                   nextIcon: {
                        icon: ' fa fa-chevron-right',
                        click: function() {
                            angular.element('.calendar-container').fullCalendar('next');
                        }
                   }
               },
                header:{
                    left: 'prevIcon',
                    center: 'title',
                    right: 'nextIcon'
                },
                lang: 'es',
                views: {
                    month: {
                        columnFormat: 'ddd'
                    }
                },
                dayNamesShort: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
                displayEventTime: false
            }
        };
    }, false);

    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        if(toState.name == 'app.calendar') {
            getEvents();
        }
    });

    $rootScope.$on('database-ready' ,function() {
        getEvents();
    });

    function getEvents() {
        EventsService.getAll()
        .then(function(results) {
            $scope.events.length = 0;
            var i = 0;
            for(i; i<results.length; i++) {
                $scope.events.push({
                    title: results[i].title,
                    start: new Date(moment(results[i].date_start).format('YYYY-MM-DDTHH:mm')),
                    end: new Date(moment(results[i].date_end).format('YYYY-MM-DDTHH:mm')),
                    color: results[i].color,
                    id: results[i].id,
                    stick: true
                });
            }
        })
        .catch(function(error) {
            console.error(error);
        });
    }
}
