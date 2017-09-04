"user strict";

angular.module('PsiPlannerApp')

.controller('MySubjectsController', MySubjectsController);

MySubjectsController.$inject = ['$scope', 'mySubjects'];

function MySubjectsController($scope, mySubjects) {
    $scope.mySubjects = mySubjects;
}
