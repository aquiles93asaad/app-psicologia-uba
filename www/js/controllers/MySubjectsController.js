"user strict";

angular.module('PsiPlannerApp')

.controller('MySubjectsController', MySubjectsController);

MySubjectsController.$inject = [
    '$scope',
    '$ionicLoading',
    'SubjectsService'
];

function MySubjectsController(
    $scope,
    $ionicLoading,
    SubjectsService
) {

    document.addEventListener("deviceready", function () {
        $ionicLoading.show({
            content: 'Loading',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });

        SubjectsService.getMySubjects()
        .then(function(mySubjects) {
            $scope.mySubjects = mySubjects;
        })
        .catch(function(error) {
            console.error(error);
        })
        .finally(function() {
            $ionicLoading.hide();
        })
    });

    $scope.search = {
        value: null,
        showSpinner: false,
        showList: true
    };

    $scope.searchSubjects = function() {
        $scope.search.showSpinner = true;
        $scope.search.showList = false;

        SubjectsService.getMySubjectsByName($scope.search.value)
        .then(function(result) {
            $scope.subjects = result;
        })
        .catch(function(error) {
            console.error(error);
        })
        .finally(function() {
            $scope.search.showSpinner = false;
            $scope.search.showList = true;
        })
    };
}
