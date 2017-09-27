"user strict";

angular.module('PsiPlannerApp')

.controller('AppController', AppController);

AppController.$inject = ['$scope', '$ionicSideMenuDelegate'];

function AppController($scope, $ionicSideMenuDelegate) {
    $scope.$watch(function () {
        return $ionicSideMenuDelegate.isOpenLeft();
    }, function (isOpen) {
        var icon = angular.element('.menu-content .left-buttons button');
        var menu = angular.element('.menu.menu-left');
        
        if (isOpen) {
            menu.css({
                'transform' : 'translate3d(0, 0, 0)'
            });
            
            icon.removeClass('ion-navicon-round');
            icon.addClass('ion-arrow-left-c open');
        } else {
            menu.css({
                'transform' : 'translate3d(-320px, 0, 0)'
            });
            
            icon.removeClass('ion-arrow-left-c open');
            icon.addClass('ion-navicon-round');
        }
    });
}
