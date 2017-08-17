angular.module('UbaPsicologiaApp')

.factory('SubjectsService', SubjectsService);

SubjectsService.$inject = ['$q', 'genericDaoService'];

/* @ngInject */
function SubjectsService($q, genericDaoService) {

	var tableName = "SUBJECTS";

	var service = {
		getAll: getAll,
		getById: getById,
		getByName: getByName,
		getClasses: getClasses,
		getActualClass: getActualClass,
		getNoneCorrelativesSubjects: getNoneCorrelativesSubjects,
		getPredCorrelatives: getPredCorrelatives,
		getSucCorrelatives: getSucCorrelatives,
		getNotes: getNotes,
		createNote: createNote,
		updateNote: updateNote,
		setState: setState,
		setCurrentClass: setCurrentClass,
		setDateCourse: setDateCourse,
		deleteNote: deleteNote,
		resetSubject: resetSubject
	};

	return service;

	//Devuelve todas las materias
	function getAll() {
		var deferred = $q.defer();
        genericDaoService.searchDataAll("SUBJECTS")
        .then(function(success) {
            deferred.resolve(success);
        })
        .catch(function(error) {
            deferred.reject(error);
        })
		return deferred.promise;
	}

	//Devuelve la materia con el id de input
	function getById(id) {
		var deferred = $q.defer();
        genericDaoService.searchById(tableName, id)
        .then(function(success) {
            deferred.resolve(success);
        })
        .catch(function(error) {
            deferred.reject(error);
        })
		return deferred.promise;
	}

	//Devuelve todas las materias con parte del nombre especificado
	//Puede devolver más de un valor, ya que utiliza la sentencia LIKE
	function getByName(name) {
		var deferred = $q.defer();
        genericDaoService.searchData("SELECT * FROM " + tableName + " WHERE name LIKE '%" + name + "%'")
        .then(function(success) {
            deferred.resolve(success);
        })
        .catch(function(error) {
            deferred.reject(error);
        })
		return deferred.promise;
	}

	//Devuelve todas las catedras de la materia con el id de input
	function getClasses(id) {
		var deferred = $q.defer();
        genericDaoService.searchData("SELECT c.* FROM " + tableName + " s JOIN CLASSES c ON s.id=c.subject_id WHERE s.id=" + id)
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
        genericDaoService.searchData("SELECT c.* FROM " + tableName + " s JOIN CLASSES c ON s.id=c.subject_id WHERE s.id=" + id + " AND c.id=s.current_class_id")
        .then(function(success) {
            deferred.resolve(success);
        })
        .catch(function(error) {
            deferred.reject(error);
        })
		return deferred.promise;
	}

	//Devuelve las materias que no tienen materias correlativas anteriores
	function getNoneCorrelativesSubjects() {
		var deferred = $q.defer();
        genericDaoService.searchData("SELECT s.* FROM " + tableName + " s JOIN PRED_SUC_CORRELATIVES c ON s.id=c.id_pred WHERE c.id_suc=" + id)
        .then(function(success) {
            deferred.resolve(success);
        })
        .catch(function(error) {
            deferred.reject(error);
        })
		return deferred.promise;
	}

	//Devuelve las materias que son anteriores en el plan a la materia con el id de input
	function getPredCorrelatives(id) {
		var deferred = $q.defer();
        genericDaoService.searchData("SELECT s.* FROM " + tableName + " s JOIN PRED_SUC_CORRELATIVES c ON s.id=c.id_suc WHERE c.id_pred IS NULL")
        .then(function(success) {
            deferred.resolve(success);
        })
        .catch(function(error) {
            deferred.reject(error);
        })
		return deferred.promise;
	}

	//Devuelve las materias que son posteriores en el plan a la materia con el id de input
	function getSucCorrelatives(id) {
		var deferred = $q.defer();
        genericDaoService.searchData("SELECT s.* FROM " + tableName + " s JOIN PRED_SUC_CORRELATIVES c ON s.id=c.id_suc WHERE c.id_pred=" + id)
        .then(function(success) {
            deferred.resolve(success);
        })
        .catch(function(error) {
            deferred.reject(error);
        })
		return deferred.promise;
	}

	//Devuelve todas las notas de la materia con el id de input
	function getNotes(id) {
		var deferred = $q.defer();
        genericDaoService.searchData("SELECT n.* FROM " + tableName + " s JOIN NOTES n ON s.id=n.subject_id WHERE s.id=" + id)
        .then(function(success) {
            deferred.resolve(success);
        })
        .catch(function(error) {
            deferred.reject(error);
        })
		return deferred.promise;
	}

	//Crea una nota para la materia del id del input.
		//subject_id es el id de la materia
		//name es el combobox de "parcial-tp-final-etc..."
		//type es si la nota es numerica ('num') o aprobado/desaprobado ('string')
		//value es el valor de la nota. En num se guarda del 0 al 10, y en string se guarda 0 para desaprobado y 1 para aprobado
	function createNote(subject_id, name, type, value) {
		var deferred = $q.defer();
        genericDaoService.insertData("NOTES", ["subject_id", "name", "type", "value"], [subject_id, name, type, value])
        .then(function(success) {
            deferred.resolve(success);
        })
        .catch(function(error) {
            deferred.reject(error);
        })
		return deferred.promise;
	}

	//Modifica la nota con el id de input
	function updateNote(id, name, type, value) {
		var deferred = $q.defer();
        genericDaoService.updateData("NOTES", ["name", "type", "value"], [name, type, value], id)
        .then(function(success) {
            deferred.resolve(success);
        })
        .catch(function(error) {
            deferred.reject(error);
        })
		return deferred.promise;
	}


	//Establece el estado en el que se encuentra la materia ("sin cursar", "cursando", ...)
	function setState(state, id) {
		var deferred = $q.defer();
        genericDaoService.updateData(tableName, ["state"], [state], id)
        .then(function(success) {
            deferred.resolve(success);
        })
        .catch(function(error) {
            deferred.reject(error);
        })
		return deferred.promise;
	}


	//Establece el id de la catedra que se esta cursando actualmente
	function setCurrentClass(class_id, subject_id) {
		var deferred = $q.defer();
        genericDaoService.updateData(tableName, ["current_class_id"], [class_id], subject_id)
        .then(function(success) {
            deferred.resolve(success);
        })
        .catch(function(error) {
            deferred.reject(error);
        })
		return deferred.promise;
	}


	//Modifica el dia en que se "inicio" esta cursada. Osea, el momento en que se paso a "Cursando" en la app
	function setDateCourse(date_course, id) {
		var deferred = $q.defer();
        genericDaoService.updateData(tableName, ["date_course"], [date_course], id)
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
        genericDaoService.deleteData("NOTES", id)
        .then(function(success) {
            deferred.resolve(success);
        })
        .catch(function(error) {
            deferred.reject(error);
        })
		return deferred.promise;
	}

	//Vuelve a la materia al estado original, como si nunca hubiera sido cursada.
	function resetSubject(id) {
		var deferred = $q.defer();
        genericDaoService.updateData(tableName, ["state", "current_class_id", "date_course"], ["Sin Cursar", NULL, NULL], id)
        .then(function(success) {
            deferred.resolve(success);
        })
        .catch(function(error) {
            deferred.reject(error);
        })
		return deferred.promise;
	}
}
