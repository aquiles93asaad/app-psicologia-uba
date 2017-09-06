"user strict";

angular.module('PsiPlannerApp')

.controller('SubjectsController', SubjectsController);

SubjectsController.$inject = [
    '$scope',
    '$ionicLoading',
    'SubjectsService'
];

function SubjectsController(
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

        SubjectsService.getSubjects()
        .then(function(subjects) {
            $scope.subjects = subjects;
        })
        .catch(function(error) {
            console.error(error);
        })
        .finally(function() {
            $ionicLoading.hide();
        })
    });
}
