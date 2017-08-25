angular.module('genericDaoModule')

.factory('populateDbService', populateDbService);

populateDbService.$inject = ['$q', '$cordovaSQLite', 'dbName'];

function populateDbService($q, $cordovaSQLite, dbName) {
    var db = null;

    var service = {
        createTables: createTables,
        insertSubjects: insertSubjects,
        insertClasses: insertClasses,
        insertCorrelatives: insertCorrelatives
    };

    return service;

    function createTables(dataBase) {
        var deferred = $q.defer();

        db = dataBase;

        var query = "CREATE TABLE EVENTS (id INTEGER PRIMARY KEY AUTOINCREMENT, subject_id INT, color TEXT, title TEXT, description TEXT, date_start TEXT, date_end TEXT, alert_date TEXT, FOREIGN KEY (subject_id) REFERENCES SUBJECTS(id)); " +
            "CREATE TABLE SUBJECTS (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, state TEXT, current_class_id INT, date_course TEXT, type TEXT, area TEXT, duration TEXT, formation TEXT); " +
              "CREATE TABLE CLASSES (id INTEGER PRIMARY KEY AUTOINCREMENT, subject_id INT, name TEXT, num_cat TEXT, FOREIGN KEY (subject_id) REFERENCES SUBJECTS(id)); " +
              "CREATE TABLE PRED_SUC_CORRELATIVES (id_pred INTEGER, id_suc INTEGER, FOREIGN KEY (id_suc) REFERENCES SUBJECTS(id), PRIMARY KEY(id_pred, id_suc) FOREIGN KEY (id_pred) REFERENCES SUBJECTS(id)); " +
              "CREATE TABLE NOTES (id INTEGER PRIMARY KEY AUTOINCREMENT, subject_id INT, name TEXT, type TEXT, value TEXT, FOREIGN KEY (subject_id) REFERENCES SUBJECTS(id)); " +
              "CREATE TABLE CONFIGS (id INTEGER PRIMARY KEY AUTOINCREMENT, key TEXT, value TEXT); ";

        return executeTransaction(deferred, query);
    }

    function insertSubjects() {
        var deferred = $q.defer();

        var query =  "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Psicología General','Sin Cursar','Obligatoria','Formación General','Cuatrimestral',NULL)   ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO SUBJECTS (name,state,type,formation,duration,area) VALUES('Estadística','Sin Cursar','Obligatoria','Formación General','Cuatrimestral',NULL)   ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Psicología Social','Sin Cursar','Obligatoria','Formación General','Cuatrimestral',NULL)   ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Psicología y Epistemología Genética','Sin Cursar','Obligatoria','Formación General','Cuatrimestral',NULL)   ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Psicoanálisis, Freud','Sin Cursar','Obligatoria','Formación General','Anual',NULL)   ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Neurofisiología','Sin Cursar','Obligatoria','Formación General','Cuatrimestral',NULL)   ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Historia de la Psicología','Sin Cursar','Obligatoria','Formación General','Cuatrimestral',NULL)   ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Metodología de la Investigación','Sin Cursar','Obligatoria','Formación General','Cuatrimestral',NULL)   ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Salud Pública y Salud Mental','Sin Cursar','Obligatoria','Formación General','Cuatrimestral',NULL)   ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Teoría y Técnica de Grupos','Sin Cursar','Obligatoria','Formación General','Cuatrimestral',NULL)   ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Psicología Evolutiva: Niñez','Sin Cursar','Obligatoria','Formación General','Cuatrimestral',NULL)   ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Psicología Evolutiva: Adolescencia','Sin Cursar','Obligatoria','Formación General','Cuatrimestral',NULL)   ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Psicopatología','Sin Cursar','Obligatoria','Formación General','Anual',NULL)   ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Teoría y Técnica de Exploración y Diagnóstico Psicológico. Módulo I','Sin Cursar','Obligatoria','Formación General','Cuatrimestral',NULL)   ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Teoría y Técnica de Exploración y Diagnóstico Psicológico. Módulo II','Sin Cursar','Obligatoria','Formación General','Cuatrimestral',NULL)   ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Inglés Módulo I','Sin Cursar','Obligatoria','Formación General','Cuatrimestral','Requisito Idioma')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Inglés Módulo II','Sin Cursar','Obligatoria','Formación General','Cuatrimestral','Requisito Idioma')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Fránces Módulo I','Sin Cursar','Obligatoria','Formación General','Cuatrimestral','Requisito Idioma')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Fránces Módulo II','Sin Cursar','Obligatoria','Formación General','Cuatrimestral','Requisito Idioma')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Psicología, Ética y Derechos Humanos','Sin Cursar','Obligatoria','Formación Profesional','Cuatrimestral',NULL)   ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Psicología Institucional','Sin Cursar','Obligatoria','Formación Profesional','Cuatrimestral',NULL)   ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Psicología Educacional','Sin Cursar','Obligatoria','Formación Profesional','Cuatrimestral',NULL)   ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Psicología del Trabajo','Sin Cursar','Obligatoria','Formación Profesional','Cuatrimestral',NULL)   ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Clinica Psicológica y Psicoterapias: Clínica de Adultos','Sin Cursar','Obligatoria','Formación Profesional','Cuatrimestral',NULL)   ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Psicología Jurídica','Sin Cursar','Obligatoria','Formación Profesional','Cuatrimestral',NULL)   ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Clínica Psicológica y Psicoterapias: Psicoterapias, Emergencia e Interconsultas','Sin Cursar','Obligatoria','Formación Profesional','Cuatrimestral',NULL)   ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Psicoanálisis: Escuela Inglesa','Sin Cursar','Optativa','Formación General','Cuatrimestral',NULL)   ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Psicoanálisis: Escuela Francesa','Sin Cursar','Optativa','Formación General','Cuatrimestral',NULL)   ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Psicología Fenomenológica y Existencial','Sin Cursar','Optativa','Formación General','Cuatrimestral',NULL)  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Psicoanálisis: Psicología del Yo','Sin Cursar','Optativa','Formación General','Cuatrimestral',NULL)  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Psicología de la Tercera Edad y Vejez','Sin Cursar','Optativa','Formación General','Cuatrimestral',NULL)  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Psicodiagnóstico: Rorschach','Sin Cursar','Optativa','Formación General','Cuatrimestral',NULL)  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Problemas Sociológicos en Psicología','Sin Cursar','Optativa','Formación General','Cuatrimestral',NULL)  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Problemas Antropológicos en Psicología','Sin Cursar','Optativa','Formación General','Cuatrimestral',NULL)  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Biología del Comportamiento','Sin Cursar','Optativa','Formación General','Cuatrimestral',NULL)  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Problemas Filosóficos en Psicología','Sin Cursar','Optativa','Formación General','Cuatrimestral',NULL)  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Psicoanálisis: Orientación Lacaniana. Clínica y Escritura.','Sin Cursar','Optativa','Formación General','Cuatrimestral',NULL)  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Construcción de los Conceptos Psicoanalíticos','Sin Cursar','Optativa','Formación General','Cuatrimestral',NULL)  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Psicología Política','Sin Cursar','Optativa','Formación General','Cuatrimestral',NULL)  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Psicopedagogía Clínica','Sin Cursar','Optativa','Formación Profesional','Cuatrimestral','Área Educacional')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Orientación Vocacional y Ocupacional','Sin Cursar','Optativa','Formación Profesional','Cuatrimestral','Área Educacional')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Informática, Educación y Sociedad','Sin Cursar','Optativa','Formación Profesional','Cuatrimestral','Área Educacional')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Clínica de Niños y Adolescentes','Sin Cursar','Optativa','Formación Profesional','Cuatrimestral','Área Clínica')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Fisiopatología y Enfermedades Psicosomáticas','Sin Cursar','Optativa','Formación Profesional','Cuatrimestral','Área Clínica')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Neuropsicología','Sin Cursar','Optativa','Formación Profesional','Cuatrimestral','Área Clínica')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Teoría y Técnica de la Clínica Sistémica','Sin Cursar','Optativa','Formación Profesional','Cuatrimestral','Área Clínica')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Clínica Psicoanalítica','Sin Cursar','Optativa','Formación Profesional','Cuatrimestral','Área Clínica')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Teoría y Técnica de la Clínica Cognitivo Comportamental','Sin Cursar','Optativa','Formación Profesional','Cuatrimestral','Área Clínica')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Clínica de la discapacidad y problemas en el desarrollo infantil','Sin Cursar','Optativa','Formación Profesional','Cuatrimestral','Área Clínica')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Nuevas Presencias de la Sexualidad: el Debate sobre la Construcción de la Diferencia de los Sexos','Sin Cursar','Optativa','Formación Profesional','Cuatrimestral','Área Clínica')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Clínica de las Anorexias, las Bulimias y la Obesidad. Abordaje interdisciplinario','Sin Cursar','Optativa','Formación Profesional','Cuatrimestral','Área Clínica')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Criminología','Sin Cursar','Optativa','Formación Profesional','Cuatrimestral','Área Justicia')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Intervenciones Psicológico-Forenses en Disfunciones y Patologías Familiares','Sin Cursar','Optativa','Formación Profesional','Cuatrimestral','Área Justicia')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Psicología del Delito y del Delincuente','Sin Cursar','Optativa','Formación Profesional','Cuatrimestral','Área Justicia')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Técnicas Psicológicas en el Ámbito Jurídico','Sin Cursar','Optativa','Formación Profesional','Cuatrimestral','Área Justicia')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Psicología Preventiva','Sin Cursar','Optativa','Formación Profesional','Cuatrimestral','Área Social - Comunitaria')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Estrategias de Intervención Comunitaria','Sin Cursar','Optativa','Formación Profesional','Cuatrimestral','Área Social - Comunitaria')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Introducción a los Estudios del Género','Sin Cursar','Optativa','Formación Profesional','Cuatrimestral','Área Social - Comunitaria')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Psicología Aplicada al Deporte','Sin Cursar','Optativa','Formación Profesional','Cuatrimestral','Área Social - Comunitaria')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('El Rol del Psicólogo en el Equipo Interdisciplinario de Salud','Sin Cursar','Optativa','Formación Profesional','Cuatrimestral','Área Social - Comunitaria')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Psicopatología Infanto Juvenil','Sin Cursar','Optativa','Formación Profesional','Cuatrimestral',NULL)  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Análisis y Modificación de la Conducta','Sin Cursar','Optativa','Formación Profesional','Cuatrimestral',NULL)  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Psicología de la Discapacidad','Sin Cursar','Optativa','Formación Profesional','Cuatrimestral','Área Educacional')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Psicofarmacología','Sin Cursar','Optativa','Formación Profesional','Cuatrimestral','Área Clínica')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Diagnóstico y Abordaje de las Crisis Infanto Juveniles','Sin Cursar','Optativa','Formación Profesional','Cuatrimestral','Área Clínica')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Metodología Psicoanalítica Cát. II','Sin Cursar','Optativa','Formación Profesional','Cuatrimestral','Área Clínica')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Clínica Psicoanalítica Cát. II','Sin Cursar','Optativa','Formación Profesional','Cuatrimestral','Área Clínica')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Clínica de las Toxicomanías y el Alcoholismo','Sin Cursar','Optativa','Formación Profesional','Cuatrimestral','Área Clínica')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Usos del Síntoma','Sin Cursar','Optativa','Formación Profesional','Cuatrimestral','Área Clínica')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Clínica del Autismo y la Psicosis en la Infancia','Sin Cursar','Optativa','Formación Profesional','Cuatrimestral','Área Clínica')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Selección e Incorporación de Personal','Sin Cursar','Optativa','Formación Profesional','Cuatrimestral','Área Trabajo')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Psicologia aplicada a las organizaciones','Sin Cursar','Optativa','Formación Profesional','Cuatrimestral','Área Trabajo')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Niños y Adolescentes en Conflicto con la Ley Penal: Abordaje Integral','Sin Cursar','Optativa','Formación Profesional','Cuatrimestral','Área Justicia')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Victimología','Sin Cursar','Optativa','Formación Profesional','Cuatrimestral','Área Justicia')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Criminología','Sin Cursar','Optativa','Formación Profesional','Cuatrimestral','Área Justicia')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Clínica de la Urgencia','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Clínica')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Orientación Psicosomática. Hospital Durand.','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Clínica')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('La Clínica en la Emergencia','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Clínica')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Clínica en Salud Mental en Hospital J. T. Borda','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Clínica')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Variantes en la Consulta Ambulatoria','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Clínica')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Clínica de Niños y Adolescentes: las Formaciones del Síntoma.','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Clínica')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Hospital de Niños Dr. R. Gutiérrez','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Clínica')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Clínica de las Adicciones: Abordaje Interdisciplinario.','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Clínica')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Clínica con Púberes y Adolescentes en el Hospital','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Clínica')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Hospital de Día y Problemáticas Clínicas Contemporáneas','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Clínica')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Práctica Clínica Psicoanalítica de Niños con Base Comunitaria','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Clínica')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Fundamentos Clínicos del Acompañamiento Terapéutico.','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Clínica')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Atención Psicológica en un Hospital','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Clínica')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Psicoprofilaxis Quirúrgica. Intervención Psicológica ante Enfermedades de Resolución Quirúrgica.','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Clínica')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('El Sujeto en la Clínica. Vicisitudes y Obstáculos.','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Clínica')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Neuropsicología Práctica: Técnicas de Evaluación.','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Clínica')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Psicología Perinatal','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Clínica')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('El Juego en los Límites: el Psicoanálisis y la Clínica en Problemas en el Desarrollo Infantil.','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Clínica')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Problemática Clínica en Niñez , Adolescencia y Familia','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Clínica')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Práctica Clínica en Anorexias, Bulimias y Obesidad','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Clínica')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Cuestiones Clínicas en los Inicios de la Práctica Psicoanalítica','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Clínica')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Una Perspectiva Antropológica en la Clínica','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Clínica')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Dispositivos de intervención en consumos nocivos y prácticas adictivas','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Clínica')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Clínica en las Instituciones Públicas. Dispositivos de Salud Mental en el Abordaje de la Complejidad','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Clínica')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Abordaje de las Patologías del Acto: la Clínica en los Bordes','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Clínica')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('El Tratamiento el Padecimiento Subjetivo en la Experiencia Analítica','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Clínica')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('El Rol del Psicólogo en el Ámbito de las Tecnologías de Reproducción Humana Asistida','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Clínica')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Orientación Vocacional y Ocupacional (Práctica Profesional)','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Educacional')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Discapacidad: Intervenciones en la Niñez y la Adolescencia. El Proceso de Integración.','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Educacional')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Proceso de Reinserción Laboral','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Trabajo')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Inserción Laboral de Jóvenes Socialmente Vulnerables','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Trabajo')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Factores Psicosociales Vinculados a la Psicodinámica del Trabajo','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Trabajo')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Instituciones Forenses','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Justicia')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('El Trabajo con Familias en el Ámbito Jurídico','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Justicia')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('La Actividad Pericial en Psicología Jurídica','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Justicia')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('La Ejecución de la Pena. Trabajo Interdisciplinario en el Seguimiento de los Condenados.','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Justicia')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Ámbito Comunitario: Familia y Enfermedad Crónica.','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Social - Comunitaria')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('El Psicólogo en el Ámbito Comunitario','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Social - Comunitaria')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Salud Mental y Desinstitucionalización','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Social - Comunitaria')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('El Rol del Psicólogo en una Experiencia de Trabajo Interdisciplinario en la Comunidad','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Social - Comunitaria')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Adicciones. Un abordaje Clínico - Comunitario.','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Social - Comunitaria')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('El Psicólogo en Centros de Atención Primaria. Un Enfoque Preventivo y Comunitario del Trabajo en Salud.','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Social - Comunitaria')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Promoción de la Salud en Adolescentes. Prácticas en Evaluación, Diagnóstico y Prevención en Instituciones Educativas.','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Social - Comunitaria')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Violencia. Modos de Intervención en los Dispositivos Clinicos y Socio Comunitarios.','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Social - Comunitaria')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Psicología del Deporte y Actividad Física','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Social - Comunitaria')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('El Rol del Psicólogo/a en la Promoción de la Salud Sexual y la Salud Reproductiva','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Social - Comunitaria')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Intervenciones Psicoanalíticas con Jóvenes en Situación de Vulnerabilidad','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Social - Comunitaria')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('La Angustia en la Experiencia Analítica','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Clínica')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('La Clínica Psicoanalítica en Dispositivos Institucionales','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Clínica')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('La Psicología en el Ámbito Jurídico. Reflexiones Ético-clínicas a través de un Estudio Cualitativo de Casos.','Sin Cursar','Práctica Investigación','Formación Profesional','Cuatrimestral','Área Investigación')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Métodos Psicofisiológicos','Sin Cursar','Práctica Investigación','Formación Profesional','Cuatrimestral','Área Investigación')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Psicología y Educación: los Psicólogos y su Participación en Comunidades de Práctica de Aprendizaje Situado','Sin Cursar','Práctica Investigación','Formación Profesional','Cuatrimestral','Área Investigación')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Aportes del Psicoanálisis a la Clínica de las Afecciones Psicosomáticas. Dirección de la Cura y Coordenadas Subjetivas del Desencadenamiento.','Sin Cursar','Práctica Investigación','Formación Profesional','Cuatrimestral','Área Investigación')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Salud Mental y Atención Primaria de la Salud: Investigaciones desde la perspectiva de Derechos.','Sin Cursar','Práctica Investigación','Formación Profesional','Cuatrimestral','Área Investigación')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Evaluación Psicológica en Contexto.','Sin Cursar','Práctica Investigación','Formación Profesional','Cuatrimestral','Área Investigación')  ";
		 executeTransaction(deferred, query); 
		 query = "INSERT INTO  SUBJECTS (name,state,type,formation,duration,area) VALUES('Cine y Subjetividad: el Método de Lectura Ético-Analítica de Películas y Series Televisivas.','Sin Cursar','Práctica Investigación','Formación Profesional','Cuatrimestral','Área Investigación')";
			 
        return executeTransaction(deferred, query);
    }

    function insertClasses() {
        var deferred = $q.defer();

        var query = "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Tit. Reg. G. González','044',id FROM SUBJECTS WHERE NAME='Psicología General'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Tit. Reg. M.E. Colombo','045',id FROM SUBJECTS WHERE NAME='Psicología General'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Adj. Reg. a cargo M. E. Aguerri','060',id FROM SUBJECTS WHERE NAME='Estadística'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Asoc. Reg. R. Muiños','167',id FROM SUBJECTS WHERE NAME='Estadística'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Adj. Reg. a cargo M. Wainstein','035',id FROM SUBJECTS WHERE NAME='Psicología Social'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Adj. Reg. a cargo M. Robertazzi','036',id FROM SUBJECTS WHERE NAME='Psicología Social'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Tit. Reg.  Alicia Barreiro','046',id FROM SUBJECTS WHERE NAME='Psicología y Epistemología Genética'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Adj. Int. D. Fernández Zalazar','047',id FROM SUBJECTS WHERE NAME='Psicología y Epistemología Genética'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Tit. Reg. O. Delgado','049',id FROM SUBJECTS WHERE NAME='Psicoanálisis, Freud'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Tit. Reg. D. Laznik','050',id FROM SUBJECTS WHERE NAME='Psicoanálisis, Freud'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Tit. Reg. A.R. Ferreres','048',id FROM SUBJECTS WHERE NAME='Neurofisiología'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Tit. Reg. A. Iorio','123',id FROM SUBJECTS WHERE NAME='Neurofisiología'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Adj. Reg. a cargo A. Dagfal','118',id FROM SUBJECTS WHERE NAME='Historia de la Psicología'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Tit. Reg. L. Rossi','034',id FROM SUBJECTS WHERE NAME='Historia de la Psicología'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Adj. Reg. a cargo M. E. Aguerri','061',id FROM SUBJECTS WHERE NAME='Metodología de la Investigación'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Tit. Reg. R. Ynoub','062',id FROM SUBJECTS WHERE NAME='Metodología de la Investigación'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Tit. Reg. M. De Lellis','065',id FROM SUBJECTS WHERE NAME='Salud Pública y Salud Mental'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Tit. Reg. A. Stolkiner','066',id FROM SUBJECTS WHERE NAME='Salud Pública y Salud Mental'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'A designar','063',id FROM SUBJECTS WHERE NAME='Teoría y Técnica de Grupos'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Adj. Reg. M. Percia','064',id FROM SUBJECTS WHERE NAME='Teoría y Técnica de Grupos'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Adj. Reg. a cargo M. E. Pizzo','053',id FROM SUBJECTS WHERE NAME='Psicología Evolutiva: Niñez'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'A designar','054',id FROM SUBJECTS WHERE NAME='Psicología Evolutiva: Niñez'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Adj. Reg. J. Barrionuevo','055',id FROM SUBJECTS WHERE NAME='Psicología Evolutiva: Adolescencia'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Tit. Reg. A. Grassi','056',id FROM SUBJECTS WHERE NAME='Psicología Evolutiva: Adolescencia'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Tit. Reg. F. Naparstek','037',id FROM SUBJECTS WHERE NAME='Psicopatología'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Tit. Reg. F. Schejtman','038',id FROM SUBJECTS WHERE NAME='Psicopatología'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Tit. Reg. I.M. Mikulic','059',id FROM SUBJECTS WHERE NAME='Teoría y Técnica de Exploración y Diagnóstico Psicológico. Módulo I'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Tit. Reg. M. Fernández Liporace','058',id FROM SUBJECTS WHERE NAME='Teoría y Técnica de Exploración y Diagnóstico Psicológico. Módulo I'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Tit. Reg. G. Peker','113',id FROM SUBJECTS WHERE NAME='Teoría y Técnica de Exploración y Diagnóstico Psicológico. Módulo II'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Tit. Reg.  T.A. Veccia','042',id FROM SUBJECTS WHERE NAME='Teoría y Técnica de Exploración y Diagnóstico Psicológico. Módulo II'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'A designar','676',id FROM SUBJECTS WHERE NAME='Inglés Módulo I'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'A designar','678',id FROM SUBJECTS WHERE NAME='Inglés Módulo II'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Adj. Int. a cargo Laura Miñones','677',id FROM SUBJECTS WHERE NAME='Fránces Módulo I'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Adj. Int. a cargo Laura Miñones','679',id FROM SUBJECTS WHERE NAME='Fránces Módulo II'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Tit. Reg.  J.J. Michel Fariña','071',id FROM SUBJECTS WHERE NAME='Psicología, Ética y Derechos Humanos'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'A designar','723',id FROM SUBJECTS WHERE NAME='Psicología, Ética y Derechos Humanos'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'A designar','144',id FROM SUBJECTS WHERE NAME='Psicología Institucional'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Adj. Reg. a cargo N. Vitale','039',id FROM SUBJECTS WHERE NAME='Psicología Institucional'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Asoc. Reg.  M. C. Chardón','083',id FROM SUBJECTS WHERE NAME='Psicología Educacional'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Adj. Reg. C. Erausquin','041',id FROM SUBJECTS WHERE NAME='Psicología Educacional'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Tit. Reg. G.L. Filippi','040',id FROM SUBJECTS WHERE NAME='Psicología del Trabajo'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Adj. Reg. C. Alonzo','724',id FROM SUBJECTS WHERE NAME='Psicología del Trabajo'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Tit. Reg. G.H. Lombardi','114',id FROM SUBJECTS WHERE NAME='Clinica Psicológica y Psicoterapias: Clínica de Adultos'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Asoc. Reg. S. Vazquez','115',id FROM SUBJECTS WHERE NAME='Clinica Psicológica y Psicoterapias: Clínica de Adultos'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Adj. Reg. C. Ghiso','768',id FROM SUBJECTS WHERE NAME='Psicología Jurídica'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Tit. Reg. O. Varela','769',id FROM SUBJECTS WHERE NAME='Psicología Jurídica'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Adj. Reg. a cargo M. Etchevers','070',id FROM SUBJECTS WHERE NAME='Clínica Psicológica y Psicoterapias: Psicoterapias, Emergencia e Interconsultas'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Tit. Reg. E. G. Keegan','634',id FROM SUBJECTS WHERE NAME='Clínica Psicológica y Psicoterapias: Psicoterapias, Emergencia e Interconsultas'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'A designar','051',id FROM SUBJECTS WHERE NAME='Psicoanálisis: Escuela Inglesa'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Asoc. Reg.  A. M. Luzzi','052',id FROM SUBJECTS WHERE NAME='Psicoanálisis: Escuela Inglesa'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Emérita  D.S. Rabinovich','057',id FROM SUBJECTS WHERE NAME='Psicoanálisis: Escuela Francesa'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Tit. Reg. a cargo O. Delgado','122',id FROM SUBJECTS WHERE NAME='Psicoanálisis: Escuela Francesa'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Adj. Reg.  a cargo  P. Muñoz','078',id FROM SUBJECTS WHERE NAME='Psicología Fenomenológica y Existencial'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Tit. Reg.  M. Rosenvald','079',id FROM SUBJECTS WHERE NAME='Psicoanálisis: Psicología del Yo'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Asoc. Reg.  R. Iacub','080',id FROM SUBJECTS WHERE NAME='Psicología de la Tercera Edad y Vejez'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Tit. Reg.  A. M. Núñez','082',id FROM SUBJECTS WHERE NAME='Psicodiagnóstico: Rorschach'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Adj. Reg.  a cargo  L.E. Ferrari','087',id FROM SUBJECTS WHERE NAME='Problemas Sociológicos en Psicología'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Adj. Int.  a cargo  F. Montañez','089',id FROM SUBJECTS WHERE NAME='Problemas Antropológicos en Psicología'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Asoc. Reg.  R. Muzio','090',id FROM SUBJECTS WHERE NAME='Biología del Comportamiento'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Adj. Int. a cargo F. Allegro','096',id FROM SUBJECTS WHERE NAME='Problemas Filosóficos en Psicología'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Tit. Reg.  a cargo M.I. Sotelo','806',id FROM SUBJECTS WHERE NAME='Psicoanálisis: Orientación Lacaniana. Clínica y Escritura.'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Tit. Reg.  a cargo O. Delgado','798',id FROM SUBJECTS WHERE NAME='Construcción de los Conceptos Psicoanalíticos'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Adj. Int.  a cargo  J. Biglieri','810',id FROM SUBJECTS WHERE NAME='Psicología Política'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Adj. Reg. P. Alvarez','085',id FROM SUBJECTS WHERE NAME='Psicopedagogía Clínica'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Adj. Reg.  a cargo G. Aisenson','086',id FROM SUBJECTS WHERE NAME='Orientación Vocacional y Ocupacional'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Adj. Int. a cargo D. Fernandez Zalazar','660',id FROM SUBJECTS WHERE NAME='Informática, Educación y Sociedad'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Adj. Reg.  A. Franco','043',id FROM SUBJECTS WHERE NAME='Clínica de Niños y Adolescentes'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Adj. Reg.  a cargo J. Ulnik','081',id FROM SUBJECTS WHERE NAME='Fisiopatología y Enfermedades Psicosomáticas'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Asoc. Reg.  D. Politis','091',id FROM SUBJECTS WHERE NAME='Neuropsicología'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Adj. Int. a cargo  V. Wittner','158',id FROM SUBJECTS WHERE NAME='Teoría y Técnica de la Clínica Sistémica'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Tit. Reg.  a cargo  D. Laznik','654',id FROM SUBJECTS WHERE NAME='Clínica Psicoanalítica'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Tit. Reg.  a cargo  E. Keegan','771',id FROM SUBJECTS WHERE NAME='Teoría y Técnica de la Clínica Cognitivo Comportamental'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Adj. Int a cargo N. Bruner','808',id FROM SUBJECTS WHERE NAME='Clínica de la discapacidad y problemas en el desarrollo infantil'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Adj. Reg. a cargo M. La Tessa','813',id FROM SUBJECTS WHERE NAME='Nuevas Presencias de la Sexualidad: el Debate sobre la Construcción de la Diferencia de los Sexos'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Asoc. Reg. A. Donghi','815',id FROM SUBJECTS WHERE NAME='Clínica de las Anorexias, las Bulimias y la Obesidad. Abordaje interdisciplinario'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Tit. Reg.  E. García Méndez','075',id FROM SUBJECTS WHERE NAME='Criminología'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Adj. Reg.  a cargo S. Puhl','191',id FROM SUBJECTS WHERE NAME='Intervenciones Psicológico-Forenses en Disfunciones y Patologías Familiares'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Adj. Int.  a cargo  L. Acebal','692',id FROM SUBJECTS WHERE NAME='Psicología del Delito y del Delincuente'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Adj. Int.  a cargo  J. Rodriguez','782',id FROM SUBJECTS WHERE NAME='Técnicas Psicológicas en el Ámbito Jurídico'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Adj. Int. a cargo H. Leale','067',id FROM SUBJECTS WHERE NAME='Psicología Preventiva'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Adj. Int.  a cargo C. Pesiney','084',id FROM SUBJECTS WHERE NAME='Estrategias de Intervención Comunitaria'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Adj. Reg  a cargo D. Tajer','105',id FROM SUBJECTS WHERE NAME='Introducción a los Estudios del Género'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Adj. Int. a cargo  R. Barrios','607',id FROM SUBJECTS WHERE NAME='Psicología Aplicada al Deporte'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Adj. Int. a cargo G. Perrotta','816',id FROM SUBJECTS WHERE NAME='El Rol del Psicólogo en el Equipo Interdisciplinario de Salud'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Adj. Reg.  a cargo  C.E.Tkach','102',id FROM SUBJECTS WHERE NAME='Psicopatología Infanto Juvenil'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Adj. Int.  a cargo  J. Dahab','780',id FROM SUBJECTS WHERE NAME='Análisis y Modificación de la Conducta'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'A designar','136',id FROM SUBJECTS WHERE NAME='Psicología de la Discapacidad'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Adj. Int.  a cargo  S.R. Herlyn','616',id FROM SUBJECTS WHERE NAME='Psicofarmacología'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Tit. Reg.  a cargo  M.E. Saavedra','635',id FROM SUBJECTS WHERE NAME='Diagnóstico y Abordaje de las Crisis Infanto Juveniles'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Emérita  a cargo  D. Rabinovich','658',id FROM SUBJECTS WHERE NAME='Metodología Psicoanalítica Cát. II'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Adj. Reg. a cargo A. Lowenstein','659',id FROM SUBJECTS WHERE NAME='Clínica Psicoanalítica Cát. II'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Tit. Reg. a cargo F. Naparstek','770',id FROM SUBJECTS WHERE NAME='Clínica de las Toxicomanías y el Alcoholismo'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Tit. Reg. a cargo G. Lombardi','807',id FROM SUBJECTS WHERE NAME='Usos del Síntoma'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Adj. Int. a cargo S. Tendlarz','814',id FROM SUBJECTS WHERE NAME='Clínica del Autismo y la Psicosis en la Infancia'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Adj. Int.  a cargo  M. Fernández','662',id FROM SUBJECTS WHERE NAME='Selección e Incorporación de Personal'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Adj. Int.  a cargo  V. Aiscar','719',id FROM SUBJECTS WHERE NAME='Psicologia aplicada a las organizaciones'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Adj. Reg.  a cargo  C.D. Ghiso','691',id FROM SUBJECTS WHERE NAME='Niños y Adolescentes en Conflicto con la Ley Penal: Abordaje Integral'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Adj. Int.  a cargo L. Acebal','781',id FROM SUBJECTS WHERE NAME='Victimología'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Tit. Reg. J. F. Marteau','803',id FROM SUBJECTS WHERE NAME='Criminología'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Tit. Reg.  M. I. Sotelo','109',id FROM SUBJECTS WHERE NAME='Clínica de la Urgencia'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Adj. Int. a cargo  S. A. Sánchez','125',id FROM SUBJECTS WHERE NAME='Orientación Psicosomática. Hospital Durand.'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Adj. Int.  a cargo  M. Trigo','126',id FROM SUBJECTS WHERE NAME='La Clínica en la Emergencia'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Adj. Int. como coordinador  J. Mena','127',id FROM SUBJECTS WHERE NAME='Clínica en Salud Mental en Hospital J. T. Borda'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT ' Prof. Asoc. Reg.  a cargo  A. Donghi','128',id FROM SUBJECTS WHERE NAME='Variantes en la Consulta Ambulatoria'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Adj. Int. como coordinador  M. Goldenberg','130',id FROM SUBJECTS WHERE NAME='Clínica de Niños y Adolescentes: las Formaciones del Síntoma.'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Adj. Int. como coordinador  A. Fränkel','135',id FROM SUBJECTS WHERE NAME='Hospital de Niños Dr. R. Gutiérrez'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Adj. Int.  como coordinador  D. Szyter','138',id FROM SUBJECTS WHERE NAME='Clínica de las Adicciones: Abordaje Interdisciplinario.'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Adj. Int. como coordinador  L. Szapiro','161',id FROM SUBJECTS WHERE NAME='Clínica con Púberes y Adolescentes en el Hospital'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Adj. Int. como coordinadora N. B. Fantini','162',id FROM SUBJECTS WHERE NAME='Hospital de Día y Problemáticas Clínicas Contemporáneas'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Asoc. Reg.  a cargo  A. M. Luzzi','639',id FROM SUBJECTS WHERE NAME='Práctica Clínica Psicoanalítica de Niños con Base Comunitaria'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Adj. Int. como coordinador  G. Rossi','687',id FROM SUBJECTS WHERE NAME='Fundamentos Clínicos del Acompañamiento Terapéutico.'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Adj. Int. como coordinadora  S. Di Biasi','689',id FROM SUBJECTS WHERE NAME='Atención Psicológica en un Hospital'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Adj. Int. como coordinadora  M. Besada','690',id FROM SUBJECTS WHERE NAME='Psicoprofilaxis Quirúrgica. Intervención Psicológica ante Enfermedades de Resolución Quirúrgica.'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Adj. Reg. como coordinadora  G. Aksman','701',id FROM SUBJECTS WHERE NAME='El Sujeto en la Clínica. Vicisitudes y Obstáculos.'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Adj. Int. como coordinadora  I. Celotto','703',id FROM SUBJECTS WHERE NAME='Neuropsicología Práctica: Técnicas de Evaluación.'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Adj. Int. como coordinadora A. Oiberman','721',id FROM SUBJECTS WHERE NAME='Psicología Perinatal'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Adj. Int. como coordinadora N. Bruner','722',id FROM SUBJECTS WHERE NAME='El Juego en los Límites: el Psicoanálisis y la Clínica en Problemas en el Desarrollo Infantil.'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Tit. Reg.  a cargo  A. Grassi','726',id FROM SUBJECTS WHERE NAME='Problemática Clínica en Niñez , Adolescencia y Familia'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Adj. Int. como coordinador O. Rodríguez','772',id FROM SUBJECTS WHERE NAME='Práctica Clínica en Anorexias, Bulimias y Obesidad'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Adj. Int. como coordinador D. Tumas','776',id FROM SUBJECTS WHERE NAME='Cuestiones Clínicas en los Inicios de la Práctica Psicoanalítica'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Adj. Int. como coordinador N. A. Conti','779',id FROM SUBJECTS WHERE NAME='Una Perspectiva Antropológica en la Clínica'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Adj. Int. como coordinadora L. M. Vazquez','802',id FROM SUBJECTS WHERE NAME='Dispositivos de intervención en consumos nocivos y prácticas adictivas'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Adj. Int. como coordinador M. Ferraro','812',id FROM SUBJECTS WHERE NAME='Clínica en las Instituciones Públicas. Dispositivos de Salud Mental en el Abordaje de la Complejidad'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Adj. Int. como coordinadora S. Szmuszkowiez','817',id FROM SUBJECTS WHERE NAME='Abordaje de las Patologías del Acto: la Clínica en los Bordes'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Adj. Int.  a cargo  M. L. Iuale','822',id FROM SUBJECTS WHERE NAME='El Tratamiento el Padecimiento Subjetivo en la Experiencia Analítica'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Adj. Reg.  a cargo  E. Ormart','824',id FROM SUBJECTS WHERE NAME='El Rol del Psicólogo en el Ámbito de las Tecnologías de Reproducción Humana Asistida'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Adj. Reg. como coordinadora G. Aisenson','100',id FROM SUBJECTS WHERE NAME='Orientación Vocacional y Ocupacional'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Adj. Int. como coordinador A. Febbraio','107',id FROM SUBJECTS WHERE NAME='Discapacidad: Intervenciones en la Niñez y la Adolescencia. El Proceso de Integración.'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Adj. Int. como coordinador M. Sandoval','657',id FROM SUBJECTS WHERE NAME='Proceso de Reinserción Laboral'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Adj. Int. como coordinadora S. Asam','714',id FROM SUBJECTS WHERE NAME='Inserción Laboral de Jóvenes Socialmente Vulnerables'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Adj. Reg. como coordinadora L. Ferrari','795',id FROM SUBJECTS WHERE NAME='Factores Psicosociales Vinculados a la Psicodinámica del Trabajo'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Tit. Reg.  a cargo  O. Varela','119',id FROM SUBJECTS WHERE NAME='Instituciones Forenses'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Adj. Int. a cargo M. Siderakis','601',id FROM SUBJECTS WHERE NAME='El Trabajo con Familias en el Ámbito Jurídico'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Adj. Reg. como coordinadora S. M. Puhl','718',id FROM SUBJECTS WHERE NAME='La Actividad Pericial en Psicología Jurídica'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Adj. Int. como coordinadora M. Massa','774',id FROM SUBJECTS WHERE NAME='La Ejecución de la Pena. Trabajo Interdisciplinario en el Seguimiento de los Condenados.'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Adj. Int. como coordinadora V. Bail Pupko','632',id FROM SUBJECTS WHERE NAME='Ámbito Comunitario: Familia y Enfermedad Crónica.'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Adj. Int. como coordinador E. Tissera','633',id FROM SUBJECTS WHERE NAME='El Psicólogo en el Ámbito Comunitario'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Adj. Int. como coordinadora A. Tisera','638',id FROM SUBJECTS WHERE NAME='Salud Mental y Desinstitucionalización'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Adj. Int. como coordinador A. Pagliari','698',id FROM SUBJECTS WHERE NAME='El Rol del Psicólogo en una Experiencia de Trabajo Interdisciplinario en la Comunidad'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Adj. Int. como coordinador D. Cóppola','707',id FROM SUBJECTS WHERE NAME='Adicciones. Un abordaje Clínico - Comunitario.'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Tit. Reg.  a cargo  M. De Lellis','786',id FROM SUBJECTS WHERE NAME='El Psicólogo en Centros de Atención Primaria. Un Enfoque Preventivo y Comunitario del Trabajo en Salud.'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Adj. Reg.  a cargo  V. Schmidt','788',id FROM SUBJECTS WHERE NAME='Promoción de la Salud en Adolescentes. Prácticas en Evaluación, Diagnóstico y Prevención en Instituciones Educativas.'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Adj. Int. como coordinadora M. Morao','805',id FROM SUBJECTS WHERE NAME='Violencia. Modos de Intervención en los Dispositivos Clinicos y Socio Comunitarios.'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Adj. Int.  como coordinador R. Barrios','811',id FROM SUBJECTS WHERE NAME='Psicología del Deporte y Actividad Física'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Adj. Int.  a cargo  G. Perrotta','825',id FROM SUBJECTS WHERE NAME='El Rol del Psicólogo/a en la Promoción de la Salud Sexual y la Salud Reproductiva'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Adj. Int.  a cargo  L. Szapiro','826',id FROM SUBJECTS WHERE NAME='Intervenciones Psicoanalíticas con Jóvenes en Situación de Vulnerabilidad'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Adj. Int. a cargo L. Kligmann','827',id FROM SUBJECTS WHERE NAME='La Angustia en la Experiencia Analítica'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Adj. Int. a cargo M. R. Manzotti','821',id FROM SUBJECTS WHERE NAME='La Clínica Psicoanalítica en Dispositivos Institucionales'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Adj. Reg. como coordinador  G. Salomone','775',id FROM SUBJECTS WHERE NAME='La Psicología en el Ámbito Jurídico. Reflexiones Ético-clínicas a través de un Estudio Cualitativo de Casos.'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Tit. Reg. como coordinador  A. Iorio','777',id FROM SUBJECTS WHERE NAME='Métodos Psicofisiológicos'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Adj. Reg. a cargo C. Erausquin','778',id FROM SUBJECTS WHERE NAME='Psicología y Educación: los Psicólogos y su Participación en Comunidades de Práctica de Aprendizaje Situado'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Adj. Int. como coordinadora L. Szapiro','804',id FROM SUBJECTS WHERE NAME='Aportes del Psicoanálisis a la Clínica de las Afecciones Psicosomáticas. Dirección de la Cura y Coordenadas Subjetivas del Desencadenamiento.'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Tit. Reg.  como coordinadora A. Stolkiner','818',id FROM SUBJECTS WHERE NAME='Salud Mental y Atención Primaria de la Salud: Investigaciones desde la perspectiva de Derechos.'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Tit. Reg.  como coordinadora I. M. Mikulic','819',id FROM SUBJECTS WHERE NAME='Evaluación Psicológica en Contexto.'  " +
        "INSERT INTO CLASSES (name,num_cat,subject_id) SELECT 'Prof. Tit. Reg. como coordinador J.J. Michel Fariña','823',id FROM SUBJECTS WHERE NAME='Cine y Subjetividad: el Método de Lectura Ético-Analítica de Películas y Series Televisivas.'";

        return executeTransaction(deferred, query);
    }

    function insertCorrelatives() {
        var deferred = $q.defer();

        var query = "INSERT INTO ANT_PRED_CORRELATIVES (id_pred,id_suc) VALUES (NULL,1) " +
        "INSERT INTO ANT_PRED_CORRELATIVES (id_pred,id_suc) VALUES (NULL,2) " +
        "INSERT INTO ANT_PRED_CORRELATIVES (id_pred,id_suc) VALUES (NULL,3) " +
        "INSERT INTO ANT_PRED_CORRELATIVES (id_pred,id_suc) VALUES (NULL,4) " +
        "INSERT INTO ANT_PRED_CORRELATIVES (id_pred,id_suc) VALUES (NULL,5) " +
        "INSERT INTO ANT_PRED_CORRELATIVES (id_pred,id_suc) VALUES (NULL,6) " +
        "INSERT INTO PRED_SUC_CORRELATIVES (id_pred,id_suc) VALUES (1,7)  " +
        "INSERT INTO PRED_SUC_CORRELATIVES (id_pred,id_suc) VALUES (1,8)  " +
        "INSERT INTO PRED_SUC_CORRELATIVES (id_pred,id_suc) VALUES (2,8)  " +
        "INSERT INTO PRED_SUC_CORRELATIVES (id_pred,id_suc) VALUES (3,9)  " +
        "INSERT INTO PRED_SUC_CORRELATIVES (id_pred,id_suc) VALUES (8,9)  " +
        "INSERT INTO PRED_SUC_CORRELATIVES (id_pred,id_suc) VALUES (3,10)  " +
        "INSERT INTO PRED_SUC_CORRELATIVES (id_pred,id_suc) VALUES (5,10)  " +
        "INSERT INTO PRED_SUC_CORRELATIVES (id_pred,id_suc) VALUES (5,11)  " +
        "INSERT INTO PRED_SUC_CORRELATIVES (id_pred,id_suc) VALUES (4,11)  " +
        "INSERT INTO PRED_SUC_CORRELATIVES (id_pred,id_suc) VALUES (11,12)  " +
        "INSERT INTO PRED_SUC_CORRELATIVES (id_pred,id_suc) VALUES (12,13)  " +
        "INSERT INTO PRED_SUC_CORRELATIVES (id_pred,id_suc) VALUES (6,13)  " +
        "INSERT INTO PRED_SUC_CORRELATIVES (id_pred,id_suc) VALUES (13,14)  " +
        "INSERT INTO PRED_SUC_CORRELATIVES (id_pred,id_suc) VALUES (8,14)  " +
        "INSERT INTO PRED_SUC_CORRELATIVES (id_pred,id_suc) VALUES (14,15)  " +
        "INSERT INTO PRED_SUC_CORRELATIVES (id_pred,id_suc) VALUES (1,16)  " +
        "INSERT INTO PRED_SUC_CORRELATIVES (id_pred,id_suc) VALUES (5,16)  " +
        "INSERT INTO PRED_SUC_CORRELATIVES (id_pred,id_suc) VALUES (16,16)  " +
        "INSERT INTO PRED_SUC_CORRELATIVES (id_pred,id_suc) VALUES (1,17)  " +
        "INSERT INTO PRED_SUC_CORRELATIVES (id_pred,id_suc) VALUES (5,17)  " +
        "INSERT INTO PRED_SUC_CORRELATIVES (id_pred,id_suc) VALUES (17,17)  " +
        "INSERT INTO PRED_SUC_CORRELATIVES (id_pred,id_suc) VALUES (7,18)  " +
        "INSERT INTO PRED_SUC_CORRELATIVES (id_pred,id_suc) VALUES (3,18)  " +
        "INSERT INTO PRED_SUC_CORRELATIVES (id_pred,id_suc) VALUES (9,19)  " +
        "INSERT INTO PRED_SUC_CORRELATIVES (id_pred,id_suc) VALUES (10,19)  " +
        "INSERT INTO PRED_SUC_CORRELATIVES (id_pred,id_suc) VALUES (9,20)  " +
        "INSERT INTO PRED_SUC_CORRELATIVES (id_pred,id_suc) VALUES (10,20)  " +
        "INSERT INTO PRED_SUC_CORRELATIVES (id_pred,id_suc) VALUES (12,20)  " +
        "INSERT INTO PRED_SUC_CORRELATIVES (id_pred,id_suc) VALUES (10,21)  " +
        "INSERT INTO PRED_SUC_CORRELATIVES (id_pred,id_suc) VALUES (15,22)  " +
        "INSERT INTO PRED_SUC_CORRELATIVES (id_pred,id_suc) VALUES (15,23)  " +
        "INSERT INTO PRED_SUC_CORRELATIVES (id_pred,id_suc) VALUES (15,24)";

        return executeTransaction(deferred, query);
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
