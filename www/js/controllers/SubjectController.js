"user strict";

angular.module('PsiPlannerApp')

.controller('SubjectController', SubjectController);

SubjectController.$inject = [
    '$scope',
    'subjectData',
    'SubjectsService',
    'DateTransformerService',
    '$cordovaToast',
    '$ionicHistory',
    '$state'
];

function SubjectController(
    $scope,
    subjectData,
    SubjectsService,
    DateTransformerService,
    $cordovaToast,
    $ionicHistory,
    $state
) {
    $scope.subject = subjectData.subject;

    $scope.catedras = subjectData.classes;

    $scope.addSubject = function() {
        var subjectToAdd = {
            state: 'Cursando',
            current_class_id: $scope.subject.current_class_id,
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

        console.log("Holaaa");
    };
}
