"user strict";

angular.module('PsiPlannerApp')

.provider('NotesService', function() {

	this.$get = ['dbDataManager', '$q' , function(dbDataManager, $q) {

		var subjectsTableName = "SUBJECTS";
		var notesTablesName = "NOTES";
		/****************/
		/* PRIVATE METHODS
		/****************/

		//Devuelve todas las notas de la materia con el id de input
		function getSubjectNotes(subject_id) {
			var deferred = $q.defer();

	        dbDataManager.findData("SELECT n.* FROM " + subjectsTableName + " s JOIN " + notesTablesName + " n ON s.id=n.subject_id WHERE s.id=" + subject_id)
	        .then(function(success) {
	            deferred.resolve(success);
	        })
	        .catch(function(error) {
	            deferred.reject(error);
	        })

			return deferred.promise;
		}

        /**
        * Crea una nota para la materia del id del input.
        * @param subject_id es el id de la materia
        * @param name es el combobox de "parcial-tp-final-etc..."
        * @param type es si la nota es numerica ('num') o aprobado/desaprobado ('string')
        * @param value es el valor de la nota. En num se guarda del 0 al 10, y en string se guarda 0 para desaprobado y 1 para aprobado
        * @returns {*} Retorna el id de la nota insertada
        */
		function createNote(note) {
			var deferred = $q.defer();

	        dbDataManager.insertData(notesTablesName, note)
	        .then(function(success) {
	            deferred.resolve(success);
	        })
	        .catch(function(error) {
	            deferred.reject(error);
	        })

			return deferred.promise;
		}

		//Modifica la nota con el id
		function updateNote(id, name, type, value) {
			var deferred = $q.defer();

			var item = {
	            'name': name,
	            'type': type,
	            'value': value
	        };

	        dbDataManager.updateData(notesTablesName, item, id)
	        .then(function(success) {
	            deferred.resolve(success);
	        })
	        .catch(function(error) {
	            deferred.reject(error);
	        })

			return deferred.promise;
		}

		//Elimina la nota con el id de input
		function deleteNote(id) {
			var deferred = $q.defer();
	        dbDataManager.deleteData(notesTablesName, id)
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
			getSubjectNotes: getSubjectNotes,
			createNote: createNote,
			updateNote: updateNote,
			deleteNote: deleteNote
        }
	}];
});
