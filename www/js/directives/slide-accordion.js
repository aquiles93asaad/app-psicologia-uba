"user strict";

angular.module('PsiPlannerApp')

.directive('slideAccordion', slideAccordion);

slideAccordion.$inject = [];

function slideAccordion() {
    var directive = {
        link: link,
        scope: true,
        restrict: 'A'
    };

    return directive;

    function link (scope, element, attrs) {
        var header = element.find('.ac-header');

        header.on('click', function() {
            element.toggleClass('open');
        })
    }
}
