"user strict";

angular.module('PsiPlannerApp')

.controller('SubjectsController', SubjectsController);

SubjectsController.$inject = [
    '$scope',
    '$ionicLoading',
    '$ionicModal',
    'SubjectsService'
];

function SubjectsController(
    $scope,
    $ionicLoading,
    $ionicModal,
    SubjectsService
) {

    var filters = {
        states: ["'Sin Cursar'", "'Recursada'"]
    }

    document.addEventListener("deviceready", function () {
        $ionicLoading.show({
            content: 'Loading',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });

        SubjectsService.getSubjects(filters)
        .then(function(subjects) {
            $scope.subjects = subjects;
        })
        .catch(function(error) {
            console.error(error);
        })
        .finally(function() {
            $ionicLoading.hide();
        });

        $ionicModal.fromTemplateUrl('templates/partials/filters.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.subjectsFiltersModal = modal;
        });
    });

    $scope.search = {
        value: null,
        showSpinner: false,
        showList: true
    };

    $scope.searchSubjects = function() {
        $scope.search.showSpinner = true;
        $scope.search.showList = false;

        filters.name = $scope.search.value;

        SubjectsService.getSubjects(filters)
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

    $scope.openSubjectsFilterModal = function() {
        $scope.subjectsFiltersModal.show();
    };

    $scope.closeSubjectsFilterModal = function() {
        $scope.subjectsFiltersModal.hide();
    };

    $scope.$on('$destroy', function() {
        $scope.subjectsFiltersModal.remove();
    });

    $scope.changeFilters = function() {
        console.log("hola");
    };
}
