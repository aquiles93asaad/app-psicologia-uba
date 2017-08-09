angular.module('UbaPsicologiaApp')

.factory('SubjectsService', ProductsService);

ProductsService.$inject = ['$q', 'genericDaoService'];

/* @ngInject */
function ProductsService($q, genericDaoService) {

	var service = {
		getAllSubjects: getAllSubjects,
		getSubjectsByName: getSubjectsByName,

	};

	return service;

	function getAllSubjects() {
		var deferred = $q.defer();
        genericDaoService.searchDataAll("SUBJECTS")
        .then(function(success) {
            deferred.resolve(success);
        })
        .catch(function(error) {
            deferred.reject(error);
        })
		return deferred.promise;
	}

	function getSubjectsByName(name) {
		var deferred = $q.defer();
        genericDaoService.searchData("LIKE")
        .then(function(success) {
            deferred.resolve(success);
        })
        .catch(function(error) {
            deferred.reject(error);
        })
		return deferred.promise;
	}
}
