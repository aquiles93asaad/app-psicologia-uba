angular.module('UbaPsicologiaApp')

.controller('CalendarController', CalendarController);

CalendarController.$inject = ['$scope', '$ionicSideMenuDelegate'];

function CalendarController($scope, $ionicSideMenuDelegate) {
    $ionicSideMenuDelegate.canDragContent(false);
    
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

    $scope.uiConfig = {
        calendar:{
            aspectRatio: 0.7,
            editable: true,
            header:{
                left: 'prev',
                center: 'title',
                right: 'next'
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
}
