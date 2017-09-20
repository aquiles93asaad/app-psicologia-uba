"user strict";

angular.module('PsiPlannerApp')

.controller('MySubjectController', MySubjectController);

MySubjectController.$inject = [
    '$scope',
    '$state',
    '$cordovaToast',
    '$ionicHistory',
    '$ionicLoading',
    'SubjectsService',
    'DateTransformerService'
];

function MySubjectController(
    $scope,
    $state,
    $cordovaToast,
    $ionicHistory,
    $ionicLoading,
    SubjectsService,
    DateTransformerService
) {

    $scope.stateOptions = [
        {id: 'Cursando'},
        {id: 'Aprobada'},
        {id: 'Debe final'},
        {id: 'Recursada'}
    ];

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
            } else {
                angular.forEach($scope.classes, function(clase, key) {
                    if(clase.id == $scope.subject.current_class_id) {
                        $scope.subject.current_class_id = clase;
                    }
                });
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

    $scope.updateSubject = function() {
        var subjectToAdd = {
            state: $scope.subject.state,
            current_class_id: $scope.subject.current_class_id.id
        };

        SubjectsService.addSubject(parseInt($scope.subject.id), subjectToAdd)
        .then(function(success) {
            switch(subjectToAdd.state) {
              case('Recursada'):
                  $cordovaToast.showShortBottom("La materia se eliminó de Mi Carrera");
                  break;
              case('Cursando'):
                  $cordovaToast.showShortBottom("¡La materia se agregó a Mi Carrera!");
                  break;
            }


            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $state.go('app.mySubjects');
        })
        .catch(function(error) {
            console.error(error);
        })
    };
}
