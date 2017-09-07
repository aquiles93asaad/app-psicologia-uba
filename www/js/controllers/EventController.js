"user strict";

angular.module('PsiPlannerApp')

.controller('EventController', EventController);

EventController.$inject = ['$scope', '$ionicLoading', 'SubjectsService', 'EventsService'];

function EventController($scope, $ionicLoading, SubjectsService, EventsService) {
    document.addEventListener("deviceready", function () {

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
            console.log($scope.event);
        };

        $ionicLoading.show({
            content: 'Loading',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });

        SubjectsService.getMySubjects()
        .then(function(mySubjects) {
            $scope.mySubjects = mySubjects;
            $scope.event = {
                subject_id: null,
                title: null,
                description: null,
                color: null,
                date_start: null,
                date_end: null,
                alert_date: null
            };
        })
        .catch(function(error) {
            console.error(error);
        })
        .finally(function() {
            $ionicLoading.hide();
            console.log($scope.event.subject_id);
        })
    });

}
