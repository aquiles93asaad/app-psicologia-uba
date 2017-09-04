"user strict";

angular.module('dbManager')

.provider('dbConnectionManager', function () {
    var config = {
      databaseName : "",
      location: "default"
    };

    this.setDatabaseName = function(databaseName) {
        config.databaseName = databaseName;
    }

    this.setLocation = function(location) {
        config.location = location;
    }

    this.$get = function() {
        var db = null;

        document.addEventListener('deviceready', function() {
            db = window.sqlitePlugin.openDatabase({name: config.databaseName, location: config.location});
        });

        function getConnection() {
            return db;
        }

        return {
            getConnection: getConnection
        }
    }
});
