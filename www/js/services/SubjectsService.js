angular.module('UbaPsicologiaApp')

.factory('SubjectsService', ProductsService);

ProductsService.$inject = ['$q', 'genericDaoService'];

/* @ngInject */
function ProductsService($q, genericDaoService) {

	var service = {
		getAllSubjects: getAllSubjects
	};

	return service;

	function getAllSubjects() {
		var deferred = $q.defer();
        genericDaoService.function(params)
        .then(function(success) {
            deferred.resolve(success);
        })
        .catch(function(error) {
            deferred.reject(error);
        })
		return deferred.promise;
	}
}
