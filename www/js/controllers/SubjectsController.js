"user strict";

angular.module('PsiPlannerApp')

.controller('SubjectsController', SubjectsController);

SubjectsController.$inject = [
    '$scope',
    '$rootScope',
    '$ionicLoading',
    '$ionicModal',
    'SubjectsService'
];

function SubjectsController(
    $scope,
    $rootScope,
    $ionicLoading,
    $ionicModal,
    SubjectsService
) {

    $rootScope.filters = {
        formations: {
            general: null,
            professional: null
        },
        durations: {
            anual: null,
            cuatrimestral: null
        },
        areas: {
            clinical: null,
            educational: null,
            judicial: null,
            social: null,
            work: null,
            language: null
        },
        types: {
            required: null,
            optional: null,
            professional: null,
            investigation: null
        }
    };

    var filters = {
        states: ["'Sin Cursar'", "'Recursada'"]
    };

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
    }, false);

    $scope.search = {
        value: "",
        showSpinner: false,
        showList: true
    };

    $scope.searchSubjects = function(filtersChanged) {
        if(filtersChanged) {
            $ionicLoading.show({
                content: 'Loading',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });
        } else {
            $scope.search.showSpinner = true;
            $scope.search.showList = false;
            filters.name = $scope.search.value;
        }

        SubjectsService.getSubjects(filters)
        .then(function(result) {
            $scope.subjects = result;
        })
        .catch(function(error) {
            console.error(error);
        })
        .finally(function() {
            if(filtersChanged) {
                $ionicLoading.hide();
                $scope.closeSubjectsFilterModal();
            } else {
                $scope.search.showSpinner = false;
                $scope.search.showList = true;
            }
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
        filters = {
            states: ["'Sin Cursar'", "'Recursada'"]
        };

        angular.forEach($rootScope.filters, function(value, key) {
            var arrayToAdd = [];

            angular.forEach(value, function(subValue, subKey){
                if(subValue != null) {
                    arrayToAdd.push("'" + subValue + "'");
                }
            });

            if(arrayToAdd.length != 0) {
                filters[key] = arrayToAdd;
            }
        });

        $scope.searchSubjects(true);
    };
}
