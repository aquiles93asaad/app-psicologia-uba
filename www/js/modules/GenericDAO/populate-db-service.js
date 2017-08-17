angular.module('genericDaoModule')

.factory('populateDbService', populateDbService);

populateDbService.$inject = ['$q', '$cordovaSQLite', 'dbName'];

function populateDbService($q, $cordovaSQLite, dbName) {
    var service = {
        createTables: createTables,
        insertSubjects: insertSubjects,
        insertClasses: insertClasses,
        insertCorrelatives: insertCorrelatives
    };

    return service;

    function createTables() {
        var deferred = $q.defer();

        var query = "CREATE TABLE IF NOT EXISTS EVENTS (id INT NOT NULL UNIQUE, subject_id INT, color VARCHAR(30), title VARCHAR(100), description VARCHAR(500), date_start VARCHAR(50), date_end VARCHAR(50), alert_date VARCHAR(50), PRIMARY KEY(id));" +
          "CREATE TABLE IF NOT EXISTS SUBJECTS (id INT NOT NULL UNIQUE, name VARCHAR(100), state VARCHAR(30), current_class_id INT, date_course VARCHAR(50), type VARCHAR(50), area VARCHAR(50), duration VARCHAR(20), formation VARCHAR(50), PRIMARY KEY(id));" +
          "CREATE TABLE IF NOT EXISTS CLASSES (id INT NOT NULL UNIQUE, subject_id INT, name VARCHAR(100), num_cat VARCHAR(5), PRIMARY KEY(id));" +
          "CREATE TABLE IF NOT EXISTS PRED_SUC_CORRELATIVES (id_pred INT NOT NULL, id_suc INT NOT NULL, PRIMARY KEY(id_pred, id_suc));" +
          "CREATE TABLE IF NOT EXISTS NOTES (id INT NOT NULL, subject_id INT, name VARCHAR(100), type VARCHAR(10), value VARCHAR(5), PRIMARY KEY(id));"
          "CREATE TABLE IF NOT EXISTS CONFIGS (id INT NOT NULL, key VARCHAR(100), value VARCHAR(100), PRIMARY KEY(id));"
          "ALTER TABLE CLASSES ADD FOREIGN KEY (subject_id) REFERENCES SUBJECTS(id);" +
          "ALTER TABLE PRED_SUC_CORRELATIVES ADD FOREIGN KEY (id_suc) REFERENCES SUBJECTS(id);" +
          "ALTER TABLE PRED_SUC_CORRELATIVES ADD FOREIGN KEY (id_pred) REFERENCES SUBJECTS(id);" +
          "ALTER TABLE NOTES ADD FOREIGN KEY (subject_id) REFERENCES SUBJECTS(id);"
          "ALTER TABLE EVENTS ADD FOREIGN KEY (subject_id) REFERENCES SUBJECTS(id);";
        return deferred.promise;
    }

    function insertSubjects() {
        var deferred = $q.defer();

        return deferred.promise;
    }

    function insertClasses() {
        var deferred = $q.defer();

        return deferred.promise;
    }

    function insertCorrelatives() {
        var deferred = $q.defer();

        return deferred.promise;
    }
}
