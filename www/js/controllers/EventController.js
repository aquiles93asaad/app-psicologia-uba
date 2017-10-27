"user strict";

angular.module('PsiPlannerApp')

.controller('EventController', EventController);

EventController.$inject = [
    '$scope',
    '$state',
    '$cordovaToast',
    '$cordovaLocalNotification',
    '$ionicHistory',
    '$ionicLoading',
    '$ionicPlatform',
    'SubjectsService',
    'EventsService'
];

function EventController(
    $scope,
    $state,
    $cordovaToast,
    $cordovaLocalNotification,
    $ionicHistory,
    $ionicLoading,
    $ionicPlatform,
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
        withNotif: false,
        showDeleteButton: false
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

    $scope.dates = {
        start: start,
        end: end
    };

    $scope.event = {
        subject_id: null,
        title: null,
        description: null,
        color: null,
        date_start: null,
        date_end: null,
        alert_date: null,
        type: null,
        quantity: null
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
                    if(event.date_start.indexOf('T') == -1) {
                        $scope.dates.start = new Date(moment(event.date_start).toDate());
                        $scope.dates.end = new Date(moment(event.date_end).toDate());
                        $scope.options.allDay = true;
                    } else {
                        $scope.dates.start = new Date(moment(event.date_start).format('YYYY-MM-DDTHH:mm'));
                        $scope.dates.end = new Date(moment(event.date_end).format('YYYY-MM-DDTHH:mm'));
                    }
                    if(event.alert_date) {
                        $scope.options.withNotif = true;
                    }
                    $scope.options.showDeleteButton = true;
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
            if(!moment($scope.dates.end).isBefore($scope.dates.start, 'minute'))
                if($scope.event.title) {
                   $ionicLoading.show({
                        content: 'Loading',
                        showBackdrop: true,
                        maxWidth: 200,
                        showDelay: 0
                    });

                    if($scope.options.allDay) {
                        $scope.event.date_start = moment($scope.dates.start).format('YYYY-MM-DD');
                        $scope.event.date_end = moment($scope.dates.end).format('YYYY-MM-DD');
                    } else {
                        $scope.event.date_start = moment($scope.dates.start).format('YYYY-MM-DDTHH:mm');
                        $scope.event.date_end = moment($scope.dates.end).format('YYYY-MM-DDTHH:mm');
                    }

                    if($scope.options.withNotif) {
                        $scope.event.alert_date = moment($scope.dates.start).subtract($scope.event.quantity, $scope.event.type).format('YYYY-MM-DDTHH:mm');
                        var notifParams = {
                            id: null,
                            title: 'PsiPlanner',
                            text: $scope.event.title + (($scope.event.description) ? (' ' + $scope.event.description) : ''),
                            icon: 'res://icon',
                            date: new Date(moment($scope.event.alert_date)),
                        };
                    }

                    if(!$state.params.eventId) {
                        EventsService.createEvent($scope.event)
                        .then(function(insertedId){
                            if($scope.options.withNotif) {
                                notifParams.id = insertedId;
                                $cordovaLocalNotification.schedule(notifParams)
                               .then(function(success) {
                                   console.log(success);
                               })
                               .catch(function(error) {
                                   console.error(error);
                               });
                            }
                            onEventSuccess("El evento se agregó al calendario!");
                        })
                        .catch(function(error) {
                            console.error(error);
                        })
                        .finally(function() {
                            $ionicLoading.hide();
                        });
                    } else {
                        EventsService.updateEvent($state.params.eventId, $scope.event)
                        .then(function(success) {
                            if($scope.options.withNotif) {
                                notifParams.id = $scope.event.id;
                                $cordovaLocalNotification.isScheduled($scope.event.id)
                                .then(function(success) {
                                    if(success){
                                        $cordovaLocalNotification.update(notifParams)
                                       .then(function(success) {
                                           console.log(success);
                                       })
                                       .catch(function(error) {
                                           console.error(error);
                                       });
                                    } else {
                                        $cordovaLocalNotification.schedule(notifParams)
                                       .then(function(success) {
                                           console.log(success);
                                       })
                                       .catch(function(error) {
                                           console.error(error);
                                       });
                                    }
                                })
                                .catch(function(error) {
                                    console.error(error);
                                });
                            }
                            onEventSuccess("El evento se modificó correctamente!");
                        })
                        .catch(function(error) {
                            console.error(error);
                        })
                        .finally(function() {
                            $ionicLoading.hide();
                        });
                    }

                } else {
                    $cordovaToast.showShortBottom("No se puede guardar un evento sin título!");
                }
            else {
                $cordovaToast.showLongBottom("Cambia la fecha y/o hora de inicio para que sea anterior a la fecha de finalización.");
            }
    };

    $scope.deleteEvent = function() {
        if(confirm('El evento se eliminará definitivamente.\nContinuar?')) {
            $ionicLoading.show({
                content: 'Loading',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });

            EventsService.deleteEvent($scope.event.id)
            .then(function(){
                onEventSuccess('El evento se eliminó correctamente!')
            })
            .catch(function(error) {
                console.error(error);
            })
            .finally(function() {
                $ionicLoading.hide();
            })
        }
    };

    $scope.$watch('event.quantity', function(newVal, oldVal) {
        var options = angular.element('.notif .radio-content .item-content span');
        var i = 0;
        for(i; i<options.length; i++) {
            var option = angular.element(options[i]);
            var text = option.text();
            var textParts = text.split(' ');
            var before = '';

            if(textParts.length > 1) {
                before = ' antes';
            }

            if(newVal == 1) {
                if(textParts[0].indexOf('s') != -1) {
                    textParts[0] = textParts[0].slice(0, textParts[0].length -1);
                }
            } else {
                if(textParts[0].indexOf('s') == -1) {
                    textParts[0] = textParts[0] + 's';
                }
            }

            option.text(textParts[0] + before);
        }
    });

    $scope.$watch('event.type', function(newVal, oldVal) {
        if(newVal != oldVal) {
            var options = angular.element('.notif .radio-content .item-content span');
            var i = 0;
            for(i; i<options.length; i++) {
                var option = angular.element(options[i]);
                var text = option.text();
                var textParts = text.split(' ');
                var before = '';

                if(option.parent().parent().siblings('input').val() == newVal) {
                    before = ' antes';
                }

                option.text(textParts[0] + before);
            }
        }
    });

    $scope.closeKeyboard = function(event) {
        if(event.key == 'Enter'){
            event.preventDefault();

            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.close();
            }
        }
    };

    function onEventSuccess(message) {
        $cordovaToast.showShortBottom(message);
        $ionicHistory.nextViewOptions({
            disableBack: true
        });
        $state.go('app.calendar');
    }
}
