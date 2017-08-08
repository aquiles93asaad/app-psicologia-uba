angular.module('app.genericDAO', [$cordovaSQLite]) {
  .factory('DbAccess', function ($q) {
  var DbAccess = {};
  var db = $cordovaSQLite.openDatabase("my.db");

    DbAccess.insert = function(tableName, listFields, listValues) {
        var ins = "INSERT INTO "+tableName+" (";
        for (var field in listFields) {
          if (listFields.hasOwnProperty(field)) {
              ins=ins+field+",";
          }
        }
        ins=ins.slice(0, -1)+") VALUES (";
        for (var val in listValues) {
          if (listValues.hasOwnProperty(val)) {
            if(typeof val === 'string'){
              val="'"+val+"'";
            }
              ins=ins+val+",";
          }
        }
        ins=ins.slice(0, -1)+")";

      $cordovaSQLite.execute(db, ins).then(function(res) {
        console.log("insertId: " + res.insertId);
      }, function (err) {
        console.error(err);
      });
    }


    DbAccess.update = function(tableName, listFields, listValues, idValue) {
        var upd = "UPDATE "+tableName+" SET ";
        for (var i = 0; i < listFields.length; i++) {
          var val = listValues[i];
          if(typeof val === 'string'){
            val="'"+val+"'";
          }
          upd=upd+listFields[i]+val+" ";
        }
        upd=upd+"WHERE id="+idValue;
      $cordovaSQLite.execute(db, upd).then(function(res) {
        console.log("updateId: " + res.updateId);
      }, function (err) {
        console.error(err);
      });
    }


    DbAccess.delete = function(tableName, idValue) {
        var del = "DELETE FROM "+tableName+" WHERE id="+idValue;
      $cordovaSQLite.execute(db, del).then(function(res) {
        console.log("deleteId: " + res.deleteId);
      }, function (err) {
        console.error(err);
      });
    }

    //ej de query: select * from subjects where name=? and area=?
    //en listParameters seria ['Estadistica', 'Area Clinica']
    DbAccess.query = function(query, listParameters) {
      $cordovaSQLite.execute(db, query, listParameters).then(function(res) {
        //No tengo idea como devolvertelo
      }, function (err) {
        console.error(err);
      });
    }

  }
}
