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
    'DateTransformerService'
];

function CalendarController(
    $scope,
    $rootScope,
    $state,
    $ionicSideMenuDelegate,
    $ionicGesture,
    EventsService,
    DateTransformerService
) {

    $scope.eventSources = [];

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
                    ;
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

        $rootScope.$on('database-ready' ,function() {
            EventsService.getAll()
            .then(function(results) {
                var events = []
                var i = 0;
                for(i; i<results.length; i++) {
                    events.push({
                        title: results[i].title,
                        start: DateTransformerService.getStringAsDate(results[i].date_start),
                        end: DateTransformerService.getStringAsDate(results[i].date_end),
                        color: results[i].color
                    });
                }
                $scope.eventSources.push({events: events});
            })
            .catch(function(error) {
                console.error(error);
            });
        });
    }, false);
}
