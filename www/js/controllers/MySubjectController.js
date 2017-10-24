"user strict";

angular.module('PsiPlannerApp')

.controller('MySubjectController', MySubjectController);

MySubjectController.$inject = [
    '$scope',
    '$state',
    '$cordovaToast',
    '$ionicHistory',
    '$ionicLoading',
    '$ionicModal',
    'SubjectsService',
    'NotesService',
    'DateTransformerService'
];

function MySubjectController(
    $scope,
    $state,
    $cordovaToast,
    $ionicHistory,
    $ionicLoading,
    $ionicModal,
    SubjectsService,
    NotesService,
    DateTransformerService
) {

    $scope.stateOptions = [
        {id: 'Cursando'},
        {id: 'Aprobada'},
        {id: 'Debe final'},
        {id: 'Recursada'}
    ];

    $scope.noteNames = [
        {id: 'Parcial'},
        {id: 'Parcial Domiciliario'},
        {id: 'Trabajo Práctico'},
        {id: 'Trabajo de Campo'},
        {id: 'Recuperatorio'},
        {id: 'Final'},
        {id: 'Otro'}
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
            setNote();
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
            return NotesService.getSubjectNotes($scope.subject.id);
        })
        .then(function(notes) {
            $scope.notes = notes;
        })
        .catch(function(error) {
            console.error(error);
        })
        .finally(function() {
            $ionicLoading.hide();
        });

        $ionicModal.fromTemplateUrl('templates/partials/note.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.noteModal = modal;
        });
    }, false);

    $scope.openNoteModal = function() {
        $scope.noteModal.show();
    };

    $scope.closeNoteModal = function() {
        $scope.noteModal.hide();
    };

    $scope.$on('modal.hidden', function() {
        setNote();
        resetSlider();
    });

    $scope.$on('modal.shown', function() {
        angular.element('#note-range').ionRangeSlider({
            min: 0,
            max: 10
        });
    });

    $scope.$on('$destroy', function() {
        $scope.noteModal.remove();
    });

    $scope.noteTypeChanged = function() {
        $scope.note.value = null;
        resetSlider();
    };

    $scope.updateSubject = function() {
        var subjectToAdd = {
            state: $scope.subject.state,
            current_class_id: $scope.subject.current_class_id.id
        };

        SubjectsService.addSubject(parseInt($scope.subject.id), subjectToAdd)
        .then(function(success) {
            $cordovaToast.showShortBottom("¡La materia se modificó correctamente!");
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $state.go('app.mySubjects');
        })
        .catch(function(error) {
            console.error(error);
        })
    };

    $scope.addNote = function() {
        if($scope.note.name) {
            if($scope.note.type) {
                if($scope.note.value) {
                    $ionicLoading.show({
                        content: 'Loading',
                        showBackdrop: true,
                        maxWidth: 200,
                        showDelay: 0
                    });

                    if($scope.note.id) {
                        var noteId = $scope.note.id;
                        delete $scope.note.id;
                        delete $scope.note.$$hashKey;
                        NotesService.updateNote(noteId, $scope.note)
                        .then(function(success) {
                            notesChanged("¡La nota se modificó correctamente!");
                        });
                    } else {
                        NotesService.createNote($scope.note)
                        .then(function(success) {
                            notesChanged("¡La nota se agregó correctamente!");
                        });
                    }
                } else {
                    $cordovaToast.showShortBottom("¡Elige una nota por favor!");
                }
            } else {
                $cordovaToast.showShortBottom("¡Elige un tipo por favor!");
            }
        } else {
            $cordovaToast.showShortBottom("¡Elige un concepto por favor!");
        }
    };

    $scope.editNote = function(note) {
        $scope.note = note;
        $scope.openNoteModal()
    };

    $scope.deleteNote = function(noteId) {
        if(confirm('La nota se eliminará definitivamente.\nContinuar?')) {
            $ionicLoading.show({
                content: 'Loading',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });

            NotesService.deleteNote(noteId)
            .then(function(success) {
                notesChanged("¡La nota se eliminó correctamente!");
            });
        }
    };

    function notesChanged(message) {
        $cordovaToast.showShortBottom(message);
        NotesService.getSubjectNotes($scope.subject.id)
        .then(function(notes) {
            $scope.notes = notes;
            $scope.closeNoteModal();
        })
        .catch(function(error) {
            console.error(error);
        })
        .finally(function() {
            $ionicLoading.hide();
        });
    }

    function setNote() {
        $scope.note = {
            name: null,
            type: null,
            value: null,
            subject_id: $scope.subject.id
        };
    }

    function resetSlider() {
        var slider = angular.element('#note-range').data("ionRangeSlider");
        slider.update({
            from: 0
        });
    }
}
