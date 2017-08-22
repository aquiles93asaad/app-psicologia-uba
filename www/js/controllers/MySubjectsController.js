angular.module('UbaPsicologiaApp')

.controller('MySubjectsController', MySubjectsController);

MySubjectsController.$inject = ['$scope'];

function MySubjectsController($scope) {
    $scope.subjects = [
        {id: 1, name: 'Psicología General'},
        {id: 2, name: 'Psicología Social'}
    ];
}
