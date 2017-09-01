"user strict";

angular.module('dbManager')

.provider('dbFixturesManager', function() {

    var runFixtures = false;

    /** The version of the database */
    var dbVersion = 1;

    this.enableFixturesRun = function(value) {
        runFixtures = value;
    }

    this.setDatabaseVersion = function(version) {
        dbVersion = version;
    }

    this.$get = ['dbConnectionManager', 'dbUpdaterManager', 'dbBatchesManager', '$q', function(dbConnectionManager, dbUpdaterManager, dbBatchesManager, $q) {

        /****************/
        /* PRIVATE METHODS
        /****************/
        
        function createDatabase() {
            var deferred = $q.defer();

            dbConnectionManager.getConnection()
            .sqlBatch(
                dbBatchesManager.generateSchemaCreate(dbVersion)
                , function() {
                    console.log("Schema successfully created");
                    deferred.resolve();
                }, function(error) {
                    console.log(error);
                    deferred.reject(error);
                }
            );

            return deferred.promise;
        }

        function insertData() {
            var deferred = $q.defer();

            dbConnectionManager.getConnection()
            .sqlBatch(
                dbBatchesManager.getQueryFor("fixtures1")
                , function() {
                    console.log('DEBUG:insertData: Fixtures successfully executed!');
                    deferred.resolve();
                }, function(error) {
                    console.log(error);
                    deferred.reject(error);
                }
            );

            return deferred.promise;
        }

        function fixturesRun() {
            return createDatabase()
            .then(function() {
                return insertData();
            });
        }

        /**
        * Initialize the database, checks if has to run fixtures or create and update the schema.
        **/
        function initialize() {
            if (runFixtures === true) {
                return fixturesRun();
            } else {
                return configureDatabase();
            }
        }

        function configureDatabase() {
            return dbUpdaterManager.databaseExist()
            .then(function(result) {
                if (result === true) {
                    return dbUpdaterManager.updateSchema(dbVersion);
                } else {
                    return fixturesRun();
                }
            }, function(error) {
                console.log(error);
            });
        }

        /****************/
        /* PUBLIC METHODS
        /****************/

        return {
            fixturesRun: fixturesRun,
            initialize: initialize
        }
    }]
});
