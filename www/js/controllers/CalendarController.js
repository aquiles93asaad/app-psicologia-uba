"user strict";

angular.module('PsiPlannerApp')

.controller('CalendarController', CalendarController);

CalendarController.$inject = ['$scope', '$ionicSideMenuDelegate', '$ionicGesture', '$timeout'];

    function CalendarController($scope, $ionicSideMenuDelegate, $ionicGesture, $timeout) {
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    $scope.eventSources =[{
        events: [
            {title: 'All Day Event',start: new Date(y, m, 1)},
            {title: 'All Day Event',start: new Date(y, m, 1)},
            {title: 'All Day Event',start: new Date(y, m, d - 5)}
        ]
    }];

    $scope.goToPrevMonth = function() {
        angular.element('.calendar-container').fullCalendar('prev');
    };

    $scope.goToNextMonth = function() {
        angular.element('.calendar-container').fullCalendar('next');
    };

    document.addEventListener("deviceready", function () {

        $ionicSideMenuDelegate.canDragContent(false);
        //console.log(angular.element('.calendar-container'));

        $scope.uiConfig = {
            calendar:{
                aspectRatio: 0.72,
                editable: true,
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
                dayNamesShort: ['D', 'L', 'M', 'M', 'J', 'V', 'S']
            }
        };
    }, false);
}
