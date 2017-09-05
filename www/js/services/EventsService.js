"user strict";

angular.module('PsiPlannerApp')

.factory('EventsService', EventsService);

EventsService.$inject = ['$q', 'dbDataManager'];

/* @ngInject */
function EventsService($q, dbDataManager) {

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
        dbDataManager.findById(tableName, id)
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
        dbDataManager.findData("SELECT * FROM " + tableName + " WHERE SUBSTRING(date_start, 6, 2) = '" + month + "' OR SUBSTRING(date_end, 6, 2) = '" + month + "'")
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
        dbDataManager.findData("SELECT * FROM " + tableName + " WHERE SUBSTRING(alert_date, 9, 2) = '" + day + "'")
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

		var item = {
			            'subject_id': subject_id,
			            'color': color,
			            'title': title,
			            'description': description,
			            'date_start': date_start,
			            'date_end': date_end,
			            'alert_date': alert_date
			        };

        dbDataManager.insertData(tableName, item)
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

		var item = {
			            'subject_id': subject_id,
			            'color': color,
			            'title': title,
			            'description': description,
			            'date_start': date_start,
			            'date_end': date_end,
			            'alert_date': alert_date
			        };

        dbDataManager.updateData(tableName, item, id)
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
        dbDataManager.deleteData(tableName, id)
        .then(function(success) {
            deferred.resolve(success);
        })
        .catch(function(error) {
            deferred.reject(error);
        })
		return deferred.promise;
	}

}
