"user strict";

angular.module('PsiPlannerApp')

.controller('MySubjectsController', MySubjectsController);

MySubjectsController.$inject = [
    '$scope',
    '$ionicLoading',
    '$ionicModal',
    'SubjectsService'
];

function MySubjectsController(
    $scope,
    $ionicLoading,
    $ionicModal,
    SubjectsService
) {

    $scope.filters = {
        states: {
            approved: null,
            studying: null,
            withFinal: null,
            failed: null
        },
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

    $scope.showStatesFilters = true;

    var filters = {
        states: ["'Cursando'", "'Debe final'", "'Aprobada'", "'Recursada'"]
    };

    document.addEventListener("deviceready", function () {
        $ionicLoading.show({
            content: 'Loading',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });

        SubjectsService.getSubjects(filters)
        .then(function(mySubjects) {
            $scope.mySubjects = mySubjects;
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
        value: null,
        showSpinner: false,
        showList: true,
        filtersChanged: false
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
        .then(function(mySubjects) {
            $scope.mySubjects = mySubjects;
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
        });
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
        filters = {};

        angular.forEach($scope.filters, function(value, key) {
            var arrayToAdd = [];

            angular.forEach(value, function(subValue, subKey){
                if(subValue != null) {
                    arrayToAdd.push("'" + subValue + "'");
                }
            });

            if(arrayToAdd.length != 0) {
                filters[key] = arrayToAdd;
            }

            if(arrayToAdd.length == 0 && key == 'states') {
                filters.states = ["'Cursando'", "'Debe final'", "'Aprobada'", "'Recursada'"];
            }
        });

        if(filters.states.length != 4 || Object.keys(filters).length != 1) {
            $scope.search.filtersChanged = true;
        } else {
            $scope.search.filtersChanged = false;
        }

        $scope.searchSubjects(true);
    };
}
