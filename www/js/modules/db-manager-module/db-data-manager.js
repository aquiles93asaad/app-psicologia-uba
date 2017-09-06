"user strict";

angular.module('dbManager')

.provider('dbDataManager', function () {

    this.$get = ['$q', 'dbConnectionManager', function($q, dbConnectionManager) {

        /****************/
        /* PRIVATE METHODS
        /****************/

        /**
        * Inserts an item into a table.
        * @param tableName The name of the table
        * @param item The item object. Eg. : item: {name: "Aquiles", email: "aquiles@gmail.com", sex: "All the time"}
        * @returns {*} Returns the insertedId in a promise object
        */
        function insertData(tableName, item) {
            var deferred = $q.defer();

            var questionMarks = [];
            var fields = [];
            var values = [];

            angular.forEach(item, function(value, key) {
                fields.push(key);
                values.push(value);
                questionMarks.push("?");
            });

            fields = fields.join();
            questionMarks = questionMarks.join();

            var query = "INSERT INTO " + tableName + " (" + fields + ") VALUES (" + questionMarks + ")";

            dbConnectionManager.getConnection()
            .transaction(function(tx) {
                tx.executeSql(query, values, function(tx, res) {
                    deferred.resolve(res.insertId);
                }, function(tx, error) {
                    deferred.reject(error);
                })
            }, function(error) {
                deferred.reject(error);
            })

            return deferred.promise;
        }

        /**
        * Updates an item from the table given using its id.
        * @param tableName The name of the table
        * @param item The item object. Eg. : item: {name: "Aquiles", email: "aquiles@gmail.com", sex: "All the time"}
        * @param id  id of the item to update object. Eg. : item: {name: "Aquiles", email: "aquiles@gmail.com", sex: "All the time"}
        * @returns {*} Returns id of teh affected row in a promise object
        */
        function updateData(tableName, item, id) {
            var deferred = $q.defer();

            var fieldsQuestionMarks = [];
            var values = [];

            angular.forEach(item, function(value, key) {
                fieldsQuestionMarks.push(key + " = ? ");
                values.push(value);
            });

            fieldsQuestionMarks = fieldsQuestionMarks.join();
            values.push(id);

            var query = "UPDATE " + tableName + " SET " + fieldsQuestionMarks + "WHERE id = ?";

            dbConnectionManager.getConnection()
            .transaction(function(tx) {
                tx.executeSql(query, values, function(tx, res) {
                    deferred.resolve(res.rowsAffected);
                }, function(tx, error) {
                    deferred.reject(error);
                })
            }, function(error) {
                deferred.reject(error);
            })

            return deferred.promise;
        }

        /**
        * Deltes an item from the table given using its id.
        * @param tableName The name of the table
        * @param id  id of the item to update object. Eg. : item: {name: "Aquiles", email: "aquiles@gmail.com", sex: "All the time"}
        * @returns {*} Returns id of teh affected row in a promise object
        */
        function deleteData(tableName, id) {
            var deferred = $q.defer();

            var values = [];

            values.push(id);

            var query = "DELETE FROM " + tableName  + " WHERE id = ?";

            dbConnectionManager.getConnection()
            .transaction(function(tx) {
                tx.executeSql(query, values, function(tx, res) {
                    deferred.resolve(res.rowsAffected);
                }, function(tx, error) {
                    deferred.reject(error);
                })
            }, function(error) {
                deferred.reject(error);
            })

            return deferred.promise;
        }

        /**
        * Find items with a specific query given.
        * @param query A specific query
        * @returns {*} Returns none or more than one object.
        */
        function findData(query) {
            var deferred = $q.defer();

            dbConnectionManager.getConnection()
            .executeSql(query, [], function(rs) {
                var results = [];
                for (var x = 0; x < rs.rows.length; x++) {
                    results.push(rs.rows.item(x));
                }
                deferred.resolve(results);
            }, function(error) {
                console.log(error);
                deferred.reject(error);
            });

            return deferred.promise;
        }

        /**
        * Finds all elements of the given table name.
        * @param tableName The name of the table.
        * @returns {*}
        */
        function findAll(tableName) {
            var deferred = $q.defer();

            var query = "SELECT * FROM " + tableName;

            dbConnectionManager.getConnection()
            .executeSql(query, [], function(rs) {
                var results = [];
                for (var x = 0; x < rs.rows.length; x++) {
                    results.push(rs.rows.item(x));
                }
                deferred.resolve(results);
            }, function(error) {
                console.log(error);
                deferred.reject(error);
            });

            return deferred.promise;
        }

        /**
        * Finds an element of a given table by its id.
        * @param id of the element.
        * @param tableName The name of the table.
        * @returns {*}
        */
        function findById(tableName, id) {
            var deferred = $q.defer();

            var query = "SELECT * FROM " + tableName + " WHERE id = ?";

            dbConnectionManager.getConnection()
            .executeSql(query, [id], function(rs) {
                if (rs.rows.length == 1) {
                    deferred.resolve(rs.rows.item(0));
                } else {
                    deferred.reject("The id does not exist in the database");
                }
            }, function(error) {
                console.log(error);
                deferred.reject(error);
            });

            return deferred.promise;
        }

        /**
        * Finds items of a given table using one or more equal WHERE conditions.
        * @param id of the element.
        * @param tableName The name of the table.
        * @returns {*}
        */
        function findDataCondition(tableName, item) {
            var deferred = $q.defer();

            var fieldsQuestionMarks = [];
            var values = [];

            angular.forEach(item, function(value, key) {
                fieldsQuestionMarks.push(key + " = ? ");
                values.push(value);
            });

            fieldsQuestionMarks = fieldsQuestionMarks.join(' AND ');

            var query = "SELECT * FROM " + tableName + " WHERE " + fieldsQuestionMarks;

            dbConnectionManager.getConnection()
            .executeSql(query, values, function(rs) {
                var results = [];
                for (var x = 0; x < rs.rows.length; x++) {
                    results.push(rs.rows.item(x));
                }
                deferred.resolve(results);
            }, function(error) {
                console.log(error);
                deferred.reject(error);
            });

            return deferred.promise;
        }


        /****************/
        /* PUBLIC METHODS
        /****************/

        return {
            insertData: insertData,
            updateData: updateData,
            deleteData: deleteData,
            findData: findData,
            findById: findById,
            findAll: findAll,
            findDataCondition: findDataCondition
        }
    }];
});
