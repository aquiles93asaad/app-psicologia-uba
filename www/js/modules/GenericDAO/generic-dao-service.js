angular.module('genericDaoModule')

.factory('genericDaoService', genericDaoService);

genericDaoService.$inject = ['$q', '$cordovaSQLite', 'dbName'];

function genericDaoService($q, $cordovaSQLite, dbName) {
    var db = null;

    var services = {
        insertData: insertData,
        updateData: updateData,
        deleteData: deleteData,
        searchData: searchData,
        searchById: searchById,
        searchDataAll: searchDataAll,
        searchDataCondition: searchDataCondition,
        openDB: openDB
    };

    return services;

    function insertData(tableName, listFields, listValues) {
        var deferred = $q.defer();

        var query = "INSERT INTO " + tableName + " (";
        for (var field in listFields) {
            if (listFields.hasOwnProperty(field)) {
                query = query + field + ",";
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

    function openDB() {
        var deferred = $q.defer();

        window.sqlitePlugin.openDatabase({ name: dbName, location: 'default' }, function(dataBase) {
            db = dataBase;
            deferred.resolve(dataBase);
        }, function(err) {
            console.log('Open database ERROR: ' + JSON.stringify(err));
            deferred.reject();
        });

        return deferred.promise;
    }

    function executeTransaction(deferred, query) {
        $cordovaSQLite.execute(db, query)
        .then(function(res) {
            console.log(res);
            deferred.resolve();
        }, function (err) {
            console.error(err);
            deferred.reject();
        });

        return deferred.promise;
    }
}
