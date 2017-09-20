"user strict";

angular.module('PsiPlannerApp')

.provider('SubjectsService', function() {

	this.$get = ['dbDataManager', '$q' , function(dbDataManager, $q) {

		var subjectsTableName = "SUBJECTS";
		var notesTablesName = "NOTES";
		/****************/
		/* PRIVATE METHODS
		/****************/

		/**
        * Devuelve las materias según los filtros pasados.
        * @param Object filters: donde los keys son los siguientes parametros
        * 	@param Object states: Estados de las materias a buscar ("Sin cursar" - "Cursando" - "Debe final" - "Aprobada" - "Recursada")
        * 	@param Object types: Tipos de las materias a buscar  ("Obligatoria" - "Optativa" - "Práctica Profesional" - "Práctica Investigación")
        * 	@param Object areas: Areas de las materias a buscar ("Área Clínica" - "Área Educacional" - "Área Justicia" - "Área Social - Comunitaria" - "Área Trabajo" - "Formación General" - "Formación Profesional" - "Requisito Idioma")
        * 	@param String duration: duración de las materias a buscar ("Cuatrimestral" - "Anual")
        * 	@param String formation: Formación de las materias a buscar ("Formación General" - "Formación Profesional")
        * 	@param String name: Nombre o parte del nombre de la/s materia/s a buscar
        * @returns Array of Objects
        */
		function getSubjects(filters) {
			var deferred = $q.defer();
			var query = "SELECT * FROM " + subjectsTableName + " WHERE name LIKE '%" + name + "%'";

			if(filters.states) {
				query += " AND state IN (" + filters.states.join() + ")";
			}

			if(filters.types) {
				query += " AND type IN (" + filters.types.join() + ")";
			}

			if(filters.areas) {
				query += " AND area IN (" + filters.areas.join() + ")";
			}

			if(filters.duration) {
				query += " AND duration = " + filters.duration;
			}

			if(filters.formation) {
				query += " AND formation = " + filters.formation;
			}

			dbDataManager.findData(query)
	        .then(function(success) {
	            deferred.resolve(success);
	        })
	        .catch(function(error) {
	            deferred.reject(error);
	        })

			return deferred.promise;
		}

		/**
        * Devuelve la materia con el id pasado cómo párametro.
        * @returns Objeto o Null
        */
		function getById(id) {
			var deferred = $q.defer();

	        dbDataManager.findById(subjectsTableName, id)
	        .then(function(success) {
	            deferred.resolve(success);
	        })
	        .catch(function(error) {
	            deferred.reject(error);
	        });

			return deferred.promise;
		}

		//Devuelve todas las catedras de la materia con el id de input
		function getClasses(id) {
			var deferred = $q.defer();
	        dbDataManager.findData("SELECT c.* FROM " + subjectsTableName + " s JOIN CLASSES c ON s.id=c.subject_id WHERE s.id=" + id)
	        .then(function(success) {
	            deferred.resolve(success);
	        })
	        .catch(function(error) {
	            deferred.reject(error);
	        })
			return deferred.promise;
		}

		//Devuelve la catedra que se esta cursando/se cursó para la materia con el id de input
		//Si la materia nunca se cursó, devuelve NULL
		function getActualClass(id) {
			var deferred = $q.defer();
	        dbDataManager.findData("SELECT c.* FROM " + subjectsTableName + " s JOIN CLASSES c ON s.id=c.subject_id WHERE s.id=" + id + " AND c.id=s.current_class_id")
	        .then(function(success) {
	            deferred.resolve(success);
	        })
	        .catch(function(error) {
	            deferred.reject(error);
	        })
			return deferred.promise;
		}


		//Devuelve las materias que son anteriores en el plan a la materia con el id de input
		function getPreCorrelatives(id) {
			var deferred = $q.defer();
	        dbDataManager.findData("SELECT s.* FROM " + subjectsTableName + " s JOIN PRED_SUC_CORRELATIVES c ON s.id=c.id_pred WHERE c.id_suc=" + id)
	        .then(function(success) {
	            deferred.resolve(success);
	        })
	        .catch(function(error) {
	            deferred.reject(error);
	        })
			return deferred.promise;
		}

		//Devuelve las materias que no tienen materias correlativas anteriores
		function getNoneCorrelativesSubjects(id) {
			var deferred = $q.defer();

	        dbDataManager.findData("SELECT s.* FROM " + subjectsTableName + " s JOIN PRED_SUC_CORRELATIVES c ON s.id=c.id_suc WHERE c.id_pred IS NULL")
	        .then(function(success) {
	            deferred.resolve(success);
	        })
	        .catch(function(error) {
	            deferred.reject(error);
	        });

			return deferred.promise;
		}

		//Devuelve las materias que son posteriores en el plan a la materia con el id de input
		function getPostCorrelatives(id) {
			var deferred = $q.defer();

	        dbDataManager.findData("SELECT s.* FROM " + subjectsTableName + " s JOIN PRED_SUC_CORRELATIVES c ON s.id=c.id_suc WHERE c.id_pred=" + id)
	        .then(function(success) {
	            deferred.resolve(success);
	        })
	        .catch(function(error) {
	            deferred.reject(error);
	        });

			return deferred.promise;
		}

		function addSubject(id, subject) {
			var deferred = $q.defer();

	        dbDataManager.updateData(subjectsTableName, subject, id)
	        .then(function(success) {
	            deferred.resolve(success);
	        })
	        .catch(function(error) {
	            deferred.reject(error);
	        });

			return deferred.promise;
		}

		//Establece el estado en el que se encuentra la materia ("sin cursar", "cursando", ...)
		function setState(state, id) {
			var deferred = $q.defer();

			var item = {
	            'state': state
	        };

	        dbDataManager.updateData(subjectsTableName, item, id)
	        .then(function(success) {
	            deferred.resolve(success);
	        })
	        .catch(function(error) {
	            deferred.reject(error);
	        });

			return deferred.promise;
		}


		//Establece el id de la catedra que se esta cursando actualmente
		function setCurrentClass(class_id, subject_id) {
			var deferred = $q.defer();

			var item = {
	            'current_class_id': class_id
	        };

	        dbDataManager.updateData(subjectsTableName, item, subject_id)
	        .then(function(success) {
	            deferred.resolve(success);
	        })
	        .catch(function(error) {
	            deferred.reject(error);
	        });

			return deferred.promise;
		}


		//Modifica el dia en que se "inicio" esta cursada. Osea, el momento en que se paso a "Cursando" en la app
		function setDateCourse(date_course, id) {
			var deferred = $q.defer();

			var item = {
	            'date_course': date_course
	        };

	        dbDataManager.updateData(subjectsTableName, item, id)
	        .then(function(success) {
	            deferred.resolve(success);
	        })
	        .catch(function(error) {
	            deferred.reject(error);
	        });

			return deferred.promise;
		}

		//Vuelve a la materia al estado original, como si nunca hubiera sido cursada.
		function resetSubject(id) {
			var deferred = $q.defer();

			var item = {
	            'state': 'Sin Cursar',
	            'current_class_id': NULL,
	            'date_course': NULL
	        };

	        dbDataManager.updateData(subjectsTableName, item, id)
	        .then(function(success) {
	            deferred.resolve(success);
	        })
	        .catch(function(error) {
	            deferred.reject(error);
	        });

			return deferred.promise;
		}

		/****************/
        /* PUBLIC METHODS
        /****************/
		return {
			getSubjects: getSubjects,
			getById: getById,
			getClasses: getClasses,
			getActualClass: getActualClass,
			getNoneCorrelativesSubjects: getNoneCorrelativesSubjects,
			getPreCorrelatives: getPreCorrelatives,
			getPostCorrelatives: getPostCorrelatives,
			addSubject: addSubject,
			setState: setState,
			setCurrentClass: setCurrentClass,
			setDateCourse: setDateCourse,
			resetSubject: resetSubject,
        }
	}];
});
