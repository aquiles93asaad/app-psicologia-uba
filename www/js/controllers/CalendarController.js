"user strict";

angular.module('PsiPlannerApp')

.controller('CalendarController', CalendarController);

CalendarController.$inject = ['$scope', '$ionicSideMenuDelegate', 'dbFixturesManager'];

function CalendarController($scope, $ionicSideMenuDelegate, dbFixturesManager) {
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

    document.addEventListener("deviceready", function () {

        dbFixturesManager.initialize()
        .then(function() {
            console.log("success");
        });

        $ionicSideMenuDelegate.canDragContent(false);

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
