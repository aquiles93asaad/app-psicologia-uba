"user strict";

angular.module('PsiPlannerApp')

.controller('CorrelativesController', CorrelativesController);

CorrelativesController.$inject = ['$scope', '$state', '$ionicLoading', 'SubjectsService'];

function CorrelativesController($scope, $state, $ionicLoading, SubjectsService) {
    $scope.subjects = {
        previous: [],
        posterior: [],
        withoutPrevious: []
    };

    $scope.options = {
        showCorrelatives: false
    };

    document.addEventListener("deviceready", function () {
        $ionicLoading.show({
            content: 'Loading',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });

        if(!$state.params.id) {
            $scope.options.showCorrelatives = false;
            SubjectsService.getNoneCorrelativesSubjects()
            .then(function(subjects) {
                $scope.subjects.withoutPrevious = subjects;
            })
            .catch(function(error) {
                console.error(error);
            })
            .finally(function() {
                $ionicLoading.hide();
            });
        } else {
            $scope.options.showCorrelatives = true;
            SubjectsService.getById(parseInt($state.params.id))
            .then(function(subject) {
                $scope.actualSubject = subject;
                return SubjectsService.getPreCorrelatives(parseInt($state.params.id));
            })
            .then(function(preSubjects) {
                $scope.subjects.previous = preSubjects;
                return SubjectsService.getPostCorrelatives(parseInt($state.params.id));
            })
            .then(function(posSubjects) {
                $scope.subjects.posterior = posSubjects;
            })
            .catch(function(error) {
                console.error(error);
            })
            .finally(function() {
                $ionicLoading.hide();
            });
        }
    }, false);
}
