"user strict";

angular.module('PsiPlannerApp')

.controller('SubjectsController', SubjectsController);

SubjectsController.$inject = ['$scope', 'subjects'];

function SubjectsController($scope, subjects) {
    $scope.subjects = subjects;
}
