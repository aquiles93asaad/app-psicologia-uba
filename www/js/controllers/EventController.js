"user strict";

angular.module('PsiPlannerApp')

.controller('EventController', EventController);

EventController.$inject = ['$scope'];

function EventController($scope) {
    $scope.event = {
        subject_id: null,
        title: null,
        description: null,
        color: null,
        date_start: null,
        date_end: null,
        alert_date: null
    };

    $scope.mySubjects = [];
    $scope.colors = [
        {id: 'positive', name: 'Azul'},
        {id: 'calm', name: 'Celeste'},
        {id: 'balanced', name: 'Verde'},
        {id: 'energized', name: 'Amarillo'},
        {id: 'assertive', name: 'Rojo'},
        {id: 'royal', name: 'Violeta'},
        {id: 'dark', name: 'Negro'}
    ];

    $scope.addEvent = function() {
        console.log('Hola');
    };

}
