angular.module('dbManager')

.provider('dbDataManager', function () {

    this.$get = ['$q', 'dbConnectionManager', function($q, dbConnectionManager) {

        /****************/
        /* PRIVATE METHODS
        /****************/
        /**
        * Inserts an item into the table passed as argument.
        * @param tableName The name of the table
        * @param lissFields The array of columns of the table. Example: ["name", "email", "sex"]
        * @param listValues The array of values. Example: ["Aquiles", "aquiles@gmail.com", "Macho"]
        * @returns {*} Returns the insertedId in a promise object
        */
        function insertData(tableName, listFields, listValues) {
            var deferred = $q.defer();

            var questionMarks = [];
            var fields = [];
            var values = [];

            var query = "INSERT INTO " + tableName + " (";
            for (var field in listFields) {
                if (listFields.hasOwnProperty(field)) {
                    questionMarks.push("?");
                }
            }

            query = query.slice(0, -1) + ") VALUES (";

            for (var val in listValues) {
                if (listValues.hasOwnProperty(val)) {
                    if(typeof val === 'string'){
                        val = "'" + val + "'";
                    }
                    query = query + val + ",";
                }
            }

            query = query.slice(0, -1) + ")";

            return executeTransaction(deferred, query);
        }

        function updateData(tableName, listFields, listValues, idValue) {
            var deferred = $q.defer();

            var query = "UPDATE " + tableName + " SET ";
            for (var i = 0; i < listFields.length; i++) {
                var val = listValues[i];
                if(typeof val === 'string'){
                    val = "'" + val + "'";
                }
                query = query + listFields[i] + "=" + val + ",";
            }
            query = query.slice(0, -1) + " WHERE id=" + idValue;

            return executeTransaction(deferred, query);
        }

        function deleteData(tableName, idValue) {
            var deferred = $q.defer();

            var query = "DELETE FROM " + tableName + " WHERE id=" + idValue;

            return executeTransaction(deferred, query);
        }

        function searchData(query) {
            var deferred = $q.defer();
            return executeTransaction(deferred, query);
        }

        function searchDataAll(tableName) {
            var deferred = $q.defer();
            var query = "SELECT * FROM " + tableName;
            return executeTransaction(deferred, query);
        }

        function searchById(tableName, id) {
            var deferred = $q.defer();
            var query = "SELECT * FROM " + tableName + " WHERE id=" + id;
            return executeTransaction(deferred, query);
        }

        function searchDataCondition(tableName, listField, listValue) {
            var deferred = $q.defer();

            var query = "SELECT * FROM " + tableName + "WHERE ";
            for (var i = 0; i < listFields.length; i++) {
                var val = listValues[i];
                if(typeof val === 'string'){
                    val = "'" + val + "'";
                }
                query = query + listFields[i] + "=" + val + " AND ";
            }
            query = query.slice(0, -5);

            return deferred.promise;
        }

        /****************/
        /* PUBLIC METHODS
        /****************/

        return {
            insertData: insertData,
            updateData: updateData,
            deleteData: deleteData,
            searchData: searchData,
            searchById: searchById,
            searchDataAll: searchDataAll,
            searchDataCondition: searchDataCondition
        }
    }];
});
