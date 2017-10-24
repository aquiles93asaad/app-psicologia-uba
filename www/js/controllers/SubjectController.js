"user strict";

angular.module('PsiPlannerApp')

.controller('SubjectController', SubjectController);

SubjectController.$inject = [
    '$scope',
    '$state',
    '$cordovaToast',
    '$ionicHistory',
    '$ionicLoading',
    'SubjectsService',
    'DateTransformerService'
];

function SubjectController(
    $scope,
    $state,
    $cordovaToast,
    $ionicHistory,
    $ionicLoading,
    SubjectsService,
    DateTransformerService
) {

    document.addEventListener("deviceready", function () {
        $ionicLoading.show({
            content: 'Loading',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });

        SubjectsService.getById($state.params.subjectId)
        .then(function(subject) {
            $scope.subject = subject;
            return SubjectsService.getClasses($scope.subject.id);
        })
        .then(function(classes) {
            $scope.classes = classes;

            if(!$scope.subject.current_class_id) {
                $scope.subject.current_class_id = $scope.classes[0];
            }

            return SubjectsService.getPreCorrelatives($scope.subject.id);
        })
        .then(function(preCorrelatives) {
            $scope.preCorrelatives = preCorrelatives;
            return SubjectsService.getPostCorrelatives($scope.subject.id);
        })
        .then(function(postCorrelatives) {
            $scope.postCorrelatives = postCorrelatives;
        })
        .catch(function(error) {
            console.error(error);
        })
        .finally(function() {
            $ionicLoading.hide();
        });
    });

    $scope.addSubject = function() {
        console.log(moment(new Date()).format('YYYY-MM-DD'));
        var subjectToAdd = {
            state: 'Cursando',
            current_class_id: $scope.subject.current_class_id.id,
            date_course: DateTransformerService.getDateAsString(new Date())
        };

        SubjectsService.addSubject(parseInt($scope.subject.id), subjectToAdd)
        .then(function(success) {
            $cordovaToast.showShortBottom("La materia se agregó a Mi Carrera!");

            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $state.go('app.subjects');
        })
        .catch(function(error) {
            console.error(error);
        })
    };
}
