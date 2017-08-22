angular.module('UbaPsicologiaApp')

.controller('SubjectsController', SubjectsController);

SubjectsController.$inject = ['$scope', 'SubjectsService'];

function SubjectsController($scope, SubjectsService) {
    $scope.subjects = [
        {id: 1, name: 'Psicología General'},
        {id: 2, name: 'Estadística'},
        {id: 3, name: 'Psicología Social'},
        {id: 4, name: 'Psicología y Epistemología Genética'},
        {id: 5, name: 'Psicoanálisis, Freud'},
        {id: 6, name: 'Neurofisiología'}
    ];
}
