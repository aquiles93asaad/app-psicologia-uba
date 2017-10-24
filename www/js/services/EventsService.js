"user strict";

angular.module('PsiPlannerApp')

.provider('EventsService', function() {
    this.$get = ['$q', 'dbDataManager', function($q, dbDataManager) {
        var tableName = "EVENTS";

        /****************/
        /* PRIVATE METHODS
        /****************/

        //Devuelve el evento con el id de input
        function getAll() {
            var deferred = $q.defer();

            dbDataManager.findAll(tableName)
            .then(function(success) {
                deferred.resolve(success);
            })
            .catch(function(error) {
                deferred.reject(error);
            })
            return deferred.promise;
        }

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
        function createEvent(event) {
            var deferred = $q.defer();

            dbDataManager.insertData(tableName, event)
            .then(function(success) {
                deferred.resolve(success);
            })
            .catch(function(error) {
                deferred.reject(error);
            })
            return deferred.promise;
        }

        //Modifica el evento con el id de input
        function updateEvent(id, event) {
            var deferred = $q.defer();

            dbDataManager.updateData(tableName, event, id)
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

        /****************/
        /* PUBLIC METHODS
        /****************/
        return {
            getAll: getAll,
            getById: getById,
            getByMonth: getByMonth,
            getByAlertDate: getByAlertDate,
            createEvent: createEvent,
            updateEvent: updateEvent,
            deleteEvent: deleteEvent
        }
    }];
});
