angular.module('UbaPsicologiaApp')

.controller('CalendarController', CalendarController);

CalendarController.$inject = ['$scope'];

function CalendarController($scope) {
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    $scope.eventSources =[{
        events: [
            {title: 'All Day Event',start: new Date(y, m, 1), backgroundColor: 'red'},
            {title: 'All Day Event',start: new Date(y, m, 1)},
            {title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
            {title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0), allDay: false, backgroundColor: 'red'}
        ]
    }];

    $scope.uiConfig = {
        calendar:{
            height: 450,
            editable: true,
            header:{
                left: 'prev',
                center: 'title',
                right: 'next'
            },
            lang: 'es',
            views: {
                month: {
                    columnFormat: 'd'
                }
            }
            // dayNamesShort: ['L', 'M', 'M', 'J', 'V', 'S', 'D']
        }
    };
}
