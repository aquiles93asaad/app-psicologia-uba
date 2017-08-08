angular.module('UbaPsicologiaApp')

.controller('MySubjectsController', MySubjectsController);

MySubjectsController.$inject = ['$scope'];

function MySubjectsController($scope) {
    $scope.subjects = [
        {id: 1, name: 'Nombre de materia 1'},
        {id: 2, name: 'Nombre de materia 2'},
        {id: 3, name: 'Nombre de materia 3'},
        {id: 4, name: 'Nombre de materia 4'},
        {id: 5, name: 'Nombre de materia 5'},
        {id: 6, name: 'Nombre de materia 6'}
    ];
}
