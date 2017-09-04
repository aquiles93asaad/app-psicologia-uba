"user strict";

angular.module('PsiPlannerApp')

.controller('LinksController', LinksController);

LinksController.$inject = ['$scope', '$cordovaInAppBrowser'];

function LinksController($scope, $cordovaInAppBrowser) {
    $scope.links = [
        {title: 'Facultad Psicología UBA ', url: 'http://www.psi.uba.ar/', image: 'img/cabezal_2016.png'},
        {title: 'Biblioteca Virtual Psicología ', url: 'http://bibliopsi.org/', image: 'img/logotipo.png'},
        {title: 'Centro de Estudiantes de Psicología', url: 'http://cepuba.com/users/login', image: 'img/logo-cep.png'}
    ];

    var options = {
        location: 'yes',
        clearcache: 'yes',
        toolbar: 'no'
    };

    document.addEventListener("deviceready", function () {
        $scope.goToPage = function(url) {
            $cordovaInAppBrowser.open(url, '_blank', options)
            .then(function(success) {
                console.log(success);
            })
            .catch(function(error) {
                console.log(error);
            });
        }
    }, false);
}
