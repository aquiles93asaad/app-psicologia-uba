angular.module('UbaPsicologiaApp')

.directive('menuItem', menuItem);

menuItem.$inject = ['$state', '$ionicSideMenuDelegate'];

function menuItem($state, $ionicSideMenuDelegate) {
    var directive = {
        link: link,
        scope: true,
        restrict: 'A'
    };

    return directive;

    function link (scope, element, attrs) {
        if($state.current.name == attrs.uiSref)
            angular.element(element).addClass('chosen');

        angular.element(element).on('click', function() {
            angular.element('.menu .menu-item').removeClass('chosen');
            angular.element(this).addClass('chosen');
            $ionicSideMenuDelegate.toggleLeft();
            angular.element('.menu.menu-left').css({
                'transform' : 'translate3d(-320px, 0, 0)'
            });
        });
        // $ionicHistory.nextViewOptions({
        //     disableBack: true
        // });
    }
}
