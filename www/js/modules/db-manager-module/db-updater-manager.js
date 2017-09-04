"user strict";

angular.module('dbManager')

.provider('dbUpdaterManager', function() {

    this.$get = ['dbConnectionManager', 'dbBatchesManager', '$q' , function(dbConnectionManager, dbBatchesManager, $q) {

        /****************/
        /* PRIVATE METHODS
        /****************/

        /**
        * Checks whether the database exist by trying to read the update table
        */
        function databaseExist() {
            var deferred = $q.defer();

            var queryStr = "SELECT COUNT(*) cnt FROM sqlite_master WHERE type = ? AND name = ? ";
            dbConnectionManager.getConnection()
            .executeSql(queryStr, ['table', 'DATABASE_VERSION_UPDATES'], function(rs) {
                var row = rs.rows.item(0);
                if (row.cnt === 1) {
                    deferred.resolve(true);
                } else {
                    deferred.resolve(false);
                }
            }, function(error) {
                console.log(error);
                deferred.reject(error);
            });

            return deferred.promise;
        }

        /**
        * Returns database current version
        */
        function databaseVersion() {
            var deferred = $q.defer();

            var queryStr = "SELECT MAX(version) AS version FROM database_version_updates";

            dbConnectionManager.getConnection()
            .executeSql(queryStr, [],
                function(rs) {
                    var row = rs.rows.item(0);
                    deferred.resolve(row.version);
                },
                function(error) {
                    console.log(error);
                    deferred.reject(error);
                }
            );

            return deferred.promise;
        }

        /**
        * Updates schema from currentVersion to targetVersion.
        * Asumes param is valid and consistent.
        *
        * @param targetVersion
        * @return promise
        */
        function updateSchema(targetVersion) {
            return databaseVersion()
            .then(function(currentVersion) {
                var deferred = $q.defer();

                if (currentVersion == targetVersion){
                    deferred.resolve();
                    console.log("DEBUG: UpdateSchema: Nothing to update.");
                }
                else {
                    console.log("DEBUG: UpdateSchema: Updating schema from " + currentVersion + " -> " + targetVersion);
                    dbConnectionManager.getConnection()
                    .sqlBatch(
                        dbBatchesManager.generateQuery(currentVersion, targetVersion)
                        ,
                        function () {
                            registerVersionUpdate(targetVersion).then(
                                function () {
                                    console.log("DEBUG: UpdateSchema: Schema successfully updated.");
                                    deferred.resolve();
                                },
                                function (error) {
                                    console.log(error);
                                    deferred.reject(error);
                                }
                            );
                        },
                        function (error) {
                            console.log(error);
                            deferred.reject();
                        }
                    );
                }


                return deferred.promise;
            });
        }

        function registerVersionUpdate(version) {
            var deferred = $q.defer();

            var queryStr = "insert into database_version_updates (version, date) values ( ? , date('now'));";
            dbConnectionManager.getConnection()
            .executeSql(queryStr, [version],
                function() {
                    deferred.resolve();
                }
                , function(error) {
                    console.log(error);
                    deferred.reject(error);
                }
            );

            return deferred.promise;
        }

        /****************/
        /* PUBLIC METHODS
        /****************/

        return {
            databaseExist: databaseExist,
            updateSchema: updateSchema
        }
    }];
});
