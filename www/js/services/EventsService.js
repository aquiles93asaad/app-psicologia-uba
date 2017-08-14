angular.module('UbaPsicologiaApp')

.factory('EventsService', EventsService);

EventsService.$inject = ['$q', 'genericDaoService'];

/* @ngInject */
function EventsService($q, genericDaoService) {

	var tableName = "EVENTS";

	var service = {
		getById: getById,
		getByMonth: getByMonth,
		getByAlertDate: getByAlertDate,
		createEvent: createEvent,
		updateEvent: updateEvent,
		deleteEvent: deleteEvent
	};

	return service;

	//Devuelve el evento con el id de input
	function getById(id) {
		var deferred = $q.defer();
        genericDaoService.searchById(tableName, id)
        .then(function(success) {
            deferred.resolve(success);
        })
        .catch(function(error) {
            deferred.reject(error);
        })
		return deferred.promise;
	}

	//Devuelve todos los eventos que su date_start o date_end sean de ese mes
	//Formato de Mes (String) (01, 02, ..., 12)
	function getByMonth(month) {
		var deferred = $q.defer();
        genericDaoService.searchData("SELECT * FROM " + tableName + " WHERE SUBSTRING(date_start, 6, 2) = '" + month + "' OR SUBSTRING(date_end, 6, 2) = '" + month + "'")
        .then(function(success) {
            deferred.resolve(success);
        })
        .catch(function(error) {
            deferred.reject(error);
        })
		return deferred.promise;
	}

	//Devuelve todos los eventos que su alert_date sea igual al dia de input
	//Formato de Dia (String) (01, 02, ...)
	function getByAlertDate(day) {
		var deferred = $q.defer();
        genericDaoService.searchData("SELECT * FROM " + tableName + " WHERE SUBSTRING(alert_date, 9, 2) = '" + day + "'")
        .then(function(success) {
            deferred.resolve(success);
        })
        .catch(function(error) {
            deferred.reject(error);
        })
		return deferred.promise;
	}

	//Crea un evento
	function createEvent(subject_id, color, title, description, date_start, date_end, alert_date) {
		var deferred = $q.defer();
        genericDaoService.insertData(tableName, ["subject_id", "color", "title", "description", "date_start", "date_end", "alert_date"], [subject_id, color, title, description, date_start, date_end, alert_date])
        .then(function(success) {
            deferred.resolve(success);
        })
        .catch(function(error) {
            deferred.reject(error);
        })
		return deferred.promise;
	}

	//Modifica el evento con el id de input
	function updateEvent(id, subject_id, color, title, description, date_start, date_end, alert_date) {
		var deferred = $q.defer();
        genericDaoService.updateData(tableName, ["subject_id", "color", "title", "description", "date_start", "date_end", "alert_date"], [subject_id, color, title, description, date_start, date_end, alert_date], id)
        .then(function(success) {
            deferred.resolve(success);
        })
        .catch(function(error) {
            deferred.reject(error);
        })
		return deferred.promise;
	}

	//Elimina el evento con el id de input
	function deleteEvent(id) {
		var deferred = $q.defer();
        genericDaoService.deleteData(tableName, id)
        .then(function(success) {
            deferred.resolve(success);
        })
        .catch(function(error) {
            deferred.reject(error);
        })
		return deferred.promise;
	}

}
