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

    if($state.params.chosenDate) {
        var start = moment($state.params.chosenDate).format();
        var end =  moment($state.params.chosenDate).add(1, 'hour').format('YYYY-MM-DDTHH:mm:ssZ');
    } else {
        var start = moment().format('YYYY-MM-DDTHH:mm:ssZ');
        var end = moment().add(1, 'hour').format('YYYY-MM-DDTHH:mm:ssZ');
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

        SubjectsService.getMySubjects()
        .then(function(mySubjects) {
            $scope.mySubjects = mySubjects;
            setDefaultSubject();
        })
        .catch(function(error) {
            console.error(error);
        })
        .finally(function() {
            $ionicLoading.hide();
        })
    });

    function setDefaultSubject() {
        if ($scope.mySubjects) {
            if ($scope.mySubjects.length != 0) {
                $scope.event.subject_id = $scope.mySubjects[0].id;
            }
        }
    };

    $scope.endDateBeforeRender = endDateBeforeRender;
    $scope.endDateOnSetTime = endDateOnSetTime;
    $scope.startDateBeforeRender = startDateBeforeRender;
    $scope.startDateOnSetTime = startDateOnSetTime;

    function startDateOnSetTime () {
        $scope.$broadcast('start-date-changed');
        angular.element('.item-accordion.open').removeClass('open');
        if (moment($scope.event.date_start).isSameOrAfter($scope.event.date_end)) {
            $scope.event.date_end = moment($scope.event.date_start).add(1, 'hour').format('YYYY-MM-DDTHH:mm:ssZ');
        }
    }

    function endDateOnSetTime () {
        $scope.$broadcast('end-date-changed');
        angular.element('.item-accordion.open').removeClass('open');
    }

    function startDateBeforeRender ($dates) {
        if ($scope.event.date_start) {
            var activeDate = moment(new Date());

            $dates.filter(function (date) {
                return date.localDateValue() <= activeDate.valueOf()
            }).forEach(function (date) {
                date.selectable = false;
            })
        }
    }

    function endDateBeforeRender ($view, $dates) {
        if ($scope.event.date_start) {
            var activeDate = moment($scope.event.date_start).subtract(1, $view).add(1, 'minute');

            $dates.filter(function (date) {
                return date.localDateValue() <= activeDate.valueOf()
            }).forEach(function (date) {
                date.selectable = false;
            })
        }
    }

    $scope.addEvent = function() {
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
        
    };
}
