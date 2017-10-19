"user strict";

angular.module('PsiPlannerApp')

.controller('EventController', EventController);

EventController.$inject = [
    '$scope',
    '$state',
    '$cordovaToast',
    '$ionicHistory',
    '$ionicLoading',
    'SubjectsService',
    'EventsService'
];

function EventController(
    $scope,
    $state,
    $cordovaToast,
    $ionicHistory,
    $ionicLoading,
    SubjectsService,
    EventsService
) {

    $scope.colors = [
        {id: '#387ef5', name: 'Azul'},
        {id: '#11c1f3', name: 'Celeste'},
        {id: '#33cd5f', name: 'Verde'},
        {id: '#ffc900', name: 'Amarillo'},
        {id: '#ef473a', name: 'Rojo'},
        {id: '#886aea', name: 'Violeta'},
        {id: '#444444', name: 'Oscuro'}
    ];

    $scope.options = {
        allDay: false,
        withNotif: false
    }

    $scope.notification = {
        type: 'h',
        number: 1
    }

    var start = null;
    var end =  null;

    if($state.params.chosenDate) {
        start = new Date(moment($state.params.chosenDate));
        end =  new Date(moment($state.params.chosenDate).add(1, 'hour'));
    } else if(!$state.params.eventId) {
        start = new Date(moment().format('YYYY-MM-DDTHH:mm'));
        end = new Date(moment().add(1, 'hour').format('YYYY-MM-DDTHH:mm'));
    }

    $scope.event = {
        subject_id: null,
        title: null,
        description: null,
        color: null,
        date_start: start,
        date_end: end,
        alert_date: null
    };

    document.addEventListener("deviceready", function () {
        $ionicLoading.show({
            content: 'Loading',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });

        var filters = {
            states: ["'Cursando'", "'Debe final'"]
        };

        SubjectsService.getSubjects(filters)
        .then(function(mySubjects) {
            $scope.mySubjects = mySubjects;
            if(!$state.params.eventId) {
                setDefaultSubject();
            } else {
                EventsService.getById($state.params.eventId)
                .then(function(event) {
                    $scope.event = event;
                    $scope.event.date_start = moment(event.date_start).format('YYYY-MM-DDTHH:mm:ssZ');
                    $scope.event.date_end = moment(event.date_end).format('YYYY-MM-DDTHH:mm:ssZ');
                })
                .catch(function(error) {
                    console.error(error);
                });
            }
        })
        .catch(function(error) {
            console.error(error);
        })
        .finally(function() {
            $ionicLoading.hide();
        })
    }, false);

    function setDefaultSubject() {
        if ($scope.mySubjects) {
            if ($scope.mySubjects.length != 0) {
                $scope.event.subject_id = $scope.mySubjects[0].id;
            }
        }
    };

    $scope.addEvent = function() {
        if(!moment($scope.event.date_end).isBefore($scope.event.date_start, 'day'))
            if($scope.event.title) {
               $ionicLoading.show({
                    content: 'Loading',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });

                EventsService.createEvent($scope.event)
                .then(function(success){
                    $cordovaToast.showShortBottom("El evento se agregó al Calendario!");

                    $ionicHistory.nextViewOptions({
                        disableBack: true
                    });
                    $state.go('app.calendar');
                })
                .catch(function(error) {
                    console.error(error);
                })
                .finally(function() {
                    $ionicLoading.hide();
                })
            } else {
                $cordovaToast.showShortBottom("No se puede guardar un evento sin título!");
            }
        else {
            $cordovaToast.showLongBottom("Cambia la fecha y/o hora de inicio para que sea anterior a la fecha de finalización.");
        }
    };

    $scope.$watch('notification.number', function(newVal, oldVal) {
        var options = angular.element('.notif select option');
        var i = 0;
        for(i; i<options.length; i++) {
            var option = angular.element(options[i]);
            var text = option.text();
            if(option.attr('selected')) {
                if(oldVal != 1 && newVal == 1) {
                    option.text(text.slice(0, text.indexOf('s')) + ' antes');
                } else if(oldVal == 1 && newVal != 1) {
                    option.text(text.slice(0, text.indexOf(' ')) + 's antes');
                }
            } else {
                if(oldVal != 1 && newVal == 1) {
                    option.text(text.slice(0, text.length - 1));
                } else if(oldVal == 1 && newVal != 1) {
                    option.text(text + 's');
                }
            }
        }
    });

    $scope.showNumber = function(event) {
        event.preventDefault();

        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.close();
        }
    }
}
