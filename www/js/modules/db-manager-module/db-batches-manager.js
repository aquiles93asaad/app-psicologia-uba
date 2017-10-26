"user strict";

angular.module('dbManager')

.provider('dbBatchesManager', function() {

    /**
    * Array with all base queries.
    *
    * Index is database version, value is array of query strings.
    * If a version dosnt require base queries, it is not necesarry
    * to add an empty array for it.
    *
    */
    var queries = [];
    /**
    * Queries to generate base schema
    * Changes for each app version should
    * be done in its corresponding queries[appVersion]
    */
    queries["base-database"] = [
        "DROP TABLE IF EXISTS SUBJECTS",
        "DROP TABLE IF EXISTS CLASSES",
        "DROP TABLE IF EXISTS PRED_SUC_CORRELATIVES",
        "DROP TABLE IF EXISTS EVENTS",
        "DROP TABLE IF EXISTS NOTES" ,
        "DROP TABLE IF EXISTS CONFIGS",
        "DROP TABLE IF EXISTS DATABASE_VERSION_UPDATES",

        "CREATE TABLE SUBJECTS (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, name TEXT, state TEXT, current_class_id INTEGER, date_course TEXT, type TEXT, area TEXT, duration TEXT, formation TEXT);",
        "CREATE TABLE CLASSES (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, subject_id INTEGER, name TEXT, num_cat TEXT, FOREIGN KEY (subject_id) REFERENCES SUBJECTS(id));",
        "CREATE TABLE PRED_SUC_CORRELATIVES (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, id_pred INTEGER, id_suc INTEGER, FOREIGN KEY (id_suc) REFERENCES SUBJECTS(id), FOREIGN KEY (id_pred) REFERENCES SUBJECTS(id));",
        "CREATE TABLE EVENTS (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, subject_id INTEGER, color TEXT, title TEXT, description TEXT, date_start TEXT, date_end TEXT, alert_date TEXT, FOREIGN KEY (subject_id) REFERENCES SUBJECTS(id));",
        "CREATE TABLE NOTES (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, subject_id INTEGER, name TEXT, type TEXT, value TEXT, FOREIGN KEY (subject_id) REFERENCES SUBJECTS(id));",
        "CREATE TABLE CONFIGS (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, key TEXT, value TEXT);",
        'CREATE TABLE DATABASE_VERSION_UPDATES ( id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, version INTEGER, date TEXT NOT NULL);',

        /* First version */
        "INSERT INTO DATABASE_VERSION_UPDATES (version, date) values (1 , date('now'));"
    ];

    /** Queries for fixtures app version 1 */
    queries["fixtures1"] = [
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (1, 'Psicología General','Sin Cursar','Obligatoria','Formación General','Cuatrimestral',NULL);",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (2, 'Estadística','Sin Cursar','Obligatoria','Formación General','Cuatrimestral',NULL);",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (3, 'Psicología Social','Sin Cursar','Obligatoria','Formación General','Cuatrimestral',NULL);",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (4, 'Psicología y Epistemología Genética','Sin Cursar','Obligatoria','Formación General','Cuatrimestral',NULL);",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (5, 'Psicoanálisis, Freud','Sin Cursar','Obligatoria','Formación General','Anual',NULL);",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (6, 'Neurofisiología','Sin Cursar','Obligatoria','Formación General','Cuatrimestral',NULL);",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (7, 'Historia de la Psicología','Sin Cursar','Obligatoria','Formación General','Cuatrimestral',NULL);",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (8, 'Metodología de la Investigación','Sin Cursar','Obligatoria','Formación General','Cuatrimestral',NULL);",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (9, 'Salud Pública y Salud Mental','Sin Cursar','Obligatoria','Formación General','Cuatrimestral',NULL);",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (10, 'Teoría y Técnica de Grupos','Sin Cursar','Obligatoria','Formación General','Cuatrimestral',NULL);",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (11, 'Psicología Evolutiva: Niñez','Sin Cursar','Obligatoria','Formación General','Cuatrimestral',NULL);",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (12, 'Psicología Evolutiva: Adolescencia','Sin Cursar','Obligatoria','Formación General','Cuatrimestral',NULL);",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (13, 'Psicopatología','Sin Cursar','Obligatoria','Formación General','Anual',NULL);",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (14, 'Teoría y Técnica de Exploración y Diagnóstico Psicológico. Módulo I','Sin Cursar','Obligatoria','Formación General','Cuatrimestral',NULL);",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (15, 'Teoría y Técnica de Exploración y Diagnóstico Psicológico. Módulo II','Sin Cursar','Obligatoria','Formación General','Cuatrimestral',NULL);",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (16, 'Inglés Módulo I','Sin Cursar','Obligatoria','Formación General','Cuatrimestral','Requisito Idioma');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (17, 'Inglés Módulo II','Sin Cursar','Obligatoria','Formación General','Cuatrimestral','Requisito Idioma');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (18, 'Fránces Módulo I','Sin Cursar','Obligatoria','Formación General','Cuatrimestral','Requisito Idioma');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (19, 'Fránces Módulo II','Sin Cursar','Obligatoria','Formación General','Cuatrimestral','Requisito Idioma');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (20, 'Psicología, Ética y Derechos Humanos','Sin Cursar','Obligatoria','Formación Profesional','Cuatrimestral',NULL);",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (21, 'Psicología Institucional','Sin Cursar','Obligatoria','Formación Profesional','Cuatrimestral',NULL);",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (22, 'Psicología Educacional','Sin Cursar','Obligatoria','Formación Profesional','Cuatrimestral',NULL);",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (23, 'Psicología del Trabajo','Sin Cursar','Obligatoria','Formación Profesional','Cuatrimestral',NULL);",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (24, 'Clinica Psicológica y Psicoterapias: Clínica de Adultos','Sin Cursar','Obligatoria','Formación Profesional','Cuatrimestral',NULL);",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (25, 'Psicología Jurídica','Sin Cursar','Obligatoria','Formación Profesional','Cuatrimestral',NULL);",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (26, 'Clínica Psicológica y Psicoterapias: Psicoterapias, Emergencia e Interconsultas','Sin Cursar','Obligatoria','Formación Profesional','Cuatrimestral',NULL);",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (27, 'Psicoanálisis: Escuela Inglesa','Sin Cursar','Optativa','Formación General','Cuatrimestral',NULL);",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (28, 'Psicoanálisis: Escuela Francesa','Sin Cursar','Optativa','Formación General','Cuatrimestral',NULL);",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (29, 'Psicología Fenomenológica y Existencial','Sin Cursar','Optativa','Formación General','Cuatrimestral',NULL);",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (30, 'Psicoanálisis: Psicología del Yo','Sin Cursar','Optativa','Formación General','Cuatrimestral',NULL);",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (31, 'Psicología de la Tercera Edad y Vejez','Sin Cursar','Optativa','Formación General','Cuatrimestral',NULL);",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (32, 'Psicodiagnóstico: Rorschach','Sin Cursar','Optativa','Formación General','Cuatrimestral',NULL);",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (33, 'Problemas Sociológicos en Psicología','Sin Cursar','Optativa','Formación General','Cuatrimestral',NULL);",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (34, 'Problemas Antropológicos en Psicología','Sin Cursar','Optativa','Formación General','Cuatrimestral',NULL);",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (35, 'Biología del Comportamiento','Sin Cursar','Optativa','Formación General','Cuatrimestral',NULL);",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (36, 'Problemas Filosóficos en Psicología','Sin Cursar','Optativa','Formación General','Cuatrimestral',NULL);",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (37, 'Psicoanálisis: Orientación Lacaniana. Clínica y Escritura','Sin Cursar','Optativa','Formación General','Cuatrimestral',NULL);",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (38, 'Construcción de los Conceptos Psicoanalíticos','Sin Cursar','Optativa','Formación General','Cuatrimestral',NULL);",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (39, 'Psicología Política','Sin Cursar','Optativa','Formación General','Cuatrimestral',NULL);",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (40, 'Psicopedagogía Clínica','Sin Cursar','Optativa','Formación Profesional','Cuatrimestral','Área Educacional');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (41, 'Orientación Vocacional y Ocupacional','Sin Cursar','Optativa','Formación Profesional','Cuatrimestral','Área Educacional');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (42, 'Informática, Educación y Sociedad','Sin Cursar','Optativa','Formación Profesional','Cuatrimestral','Área Educacional');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (43, 'Clínica de Niños y Adolescentes','Sin Cursar','Optativa','Formación Profesional','Cuatrimestral','Área Clínica');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (44, 'Fisiopatología y Enfermedades Psicosomáticas','Sin Cursar','Optativa','Formación Profesional','Cuatrimestral','Área Clínica');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (45, 'Neuropsicología','Sin Cursar','Optativa','Formación Profesional','Cuatrimestral','Área Clínica');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (46, 'Teoría y Técnica de la Clínica Sistémica','Sin Cursar','Optativa','Formación Profesional','Cuatrimestral','Área Clínica');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (47, 'Clínica Psicoanalítica','Sin Cursar','Optativa','Formación Profesional','Cuatrimestral','Área Clínica');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (48, 'Teoría y Técnica de la Clínica Cognitivo Comportamental','Sin Cursar','Optativa','Formación Profesional','Cuatrimestral','Área Clínica');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (49, 'Clínica de la discapacidad y problemas en el desarrollo infantil','Sin Cursar','Optativa','Formación Profesional','Cuatrimestral','Área Clínica');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (50, 'Nuevas Presencias de la Sexualidad: el Debate sobre la Construcción de la Diferencia de los Sexos','Sin Cursar','Optativa','Formación Profesional','Cuatrimestral','Área Clínica');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (51, 'Clínica de las Anorexias, las Bulimias y la Obesidad. Abordaje interdisciplinario','Sin Cursar','Optativa','Formación Profesional','Cuatrimestral','Área Clínica');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (52, 'Criminología','Sin Cursar','Optativa','Formación Profesional','Cuatrimestral','Área Justicia');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (53, 'Intervenciones Psicológico-Forenses en Disfunciones y Patologías Familiares','Sin Cursar','Optativa','Formación Profesional','Cuatrimestral','Área Justicia');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (54, 'Psicología del Delito y del Delincuente','Sin Cursar','Optativa','Formación Profesional','Cuatrimestral','Área Justicia');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (55, 'Técnicas Psicológicas en el Ámbito Jurídico','Sin Cursar','Optativa','Formación Profesional','Cuatrimestral','Área Justicia');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (56, 'Psicología Preventiva','Sin Cursar','Optativa','Formación Profesional','Cuatrimestral','Área Social - Comunitaria');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (57, 'Estrategias de Intervención Comunitaria','Sin Cursar','Optativa','Formación Profesional','Cuatrimestral','Área Social - Comunitaria');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (58, 'Introducción a los Estudios del Género','Sin Cursar','Optativa','Formación Profesional','Cuatrimestral','Área Social - Comunitaria');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (59, 'Psicología Aplicada al Deporte','Sin Cursar','Optativa','Formación Profesional','Cuatrimestral','Área Social - Comunitaria');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (60, 'El Rol del Psicólogo en el Equipo Interdisciplinario de Salud','Sin Cursar','Optativa','Formación Profesional','Cuatrimestral','Área Social - Comunitaria');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (61, 'Psicopatología Infanto Juvenil','Sin Cursar','Optativa','Formación Profesional','Cuatrimestral',NULL);",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (62, 'Análisis y Modificación de la Conducta','Sin Cursar','Optativa','Formación Profesional','Cuatrimestral',NULL);",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (63, 'Psicología de la Discapacidad','Sin Cursar','Optativa','Formación Profesional','Cuatrimestral','Área Educacional');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (64, 'Psicofarmacología','Sin Cursar','Optativa','Formación Profesional','Cuatrimestral','Área Clínica');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (65, 'Diagnóstico y Abordaje de las Crisis Infanto Juveniles','Sin Cursar','Optativa','Formación Profesional','Cuatrimestral','Área Clínica');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (66, 'Metodología Psicoanalítica Cát. II','Sin Cursar','Optativa','Formación Profesional','Cuatrimestral','Área Clínica');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (67, 'Clínica Psicoanalítica Cát. II','Sin Cursar','Optativa','Formación Profesional','Cuatrimestral','Área Clínica');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (68, 'Clínica de las Toxicomanías y el Alcoholismo','Sin Cursar','Optativa','Formación Profesional','Cuatrimestral','Área Clínica');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (69, 'Usos del Síntoma','Sin Cursar','Optativa','Formación Profesional','Cuatrimestral','Área Clínica');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (70, 'Clínica del Autismo y la Psicosis en la Infancia','Sin Cursar','Optativa','Formación Profesional','Cuatrimestral','Área Clínica');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (71, 'Selección e Incorporación de Personal','Sin Cursar','Optativa','Formación Profesional','Cuatrimestral','Área Trabajo');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (72, 'Psicologia aplicada a las organizaciones','Sin Cursar','Optativa','Formación Profesional','Cuatrimestral','Área Trabajo');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (73, 'Niños y Adolescentes en Conflicto con la Ley Penal: Abordaje Integral','Sin Cursar','Optativa','Formación Profesional','Cuatrimestral','Área Justicia');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (74, 'Victimología','Sin Cursar','Optativa','Formación Profesional','Cuatrimestral','Área Justicia');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (75, 'Criminología','Sin Cursar','Optativa','Formación Profesional','Cuatrimestral','Área Justicia');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (76, 'Clínica de la Urgencia','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Clínica');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (77, 'Orientación Psicosomática. Hospital Durand','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Clínica');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (78, 'La Clínica en la Emergencia','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Clínica');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (79, 'Clínica en Salud Mental en Hospital J. T. Borda','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Clínica');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (80, 'Variantes en la Consulta Ambulatoria','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Clínica');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (81, 'Clínica de Niños y Adolescentes: las Formaciones del Síntoma','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Clínica');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (82, 'Hospital de Niños Dr. R. Gutiérrez','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Clínica');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (83, 'Clínica de las Adicciones: Abordaje Interdisciplinario','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Clínica');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (84, 'Clínica con Púberes y Adolescentes en el Hospital','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Clínica');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (85, 'Hospital de Día y Problemáticas Clínicas Contemporáneas','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Clínica');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (86, 'Práctica Clínica Psicoanalítica de Niños con Base Comunitaria','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Clínica');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (87, 'Fundamentos Clínicos del Acompañamiento Terapéutico','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Clínica');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (88, 'Atención Psicológica en un Hospital','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Clínica');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (89, 'Psicoprofilaxis Quirúrgica. Intervención Psicológica ante Enfermedades de Resolución Quirúrgica','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Clínica');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (90, 'El Sujeto en la Clínica. Vicisitudes y Obstáculos','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Clínica');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (91, 'Neuropsicología Práctica: Técnicas de Evaluación','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Clínica');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (92, 'Psicología Perinatal','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Clínica');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (93, 'El Juego en los Límites: el Psicoanálisis y la Clínica en Problemas en el Desarrollo Infantil','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Clínica');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (94, 'Problemática Clínica en Niñez , Adolescencia y Familia','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Clínica');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (95, 'Práctica Clínica en Anorexias, Bulimias y Obesidad','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Clínica');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (96, 'Cuestiones Clínicas en los Inicios de la Práctica Psicoanalítica','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Clínica');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (97, 'Una Perspectiva Antropológica en la Clínica','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Clínica');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (98, 'Dispositivos de intervención en consumos nocivos y prácticas adictivas','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Clínica');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (99, 'Clínica en las Instituciones Públicas. Dispositivos de Salud Mental en el Abordaje de la Complejidad','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Clínica');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (100, 'Abordaje de las Patologías del Acto: la Clínica en los Bordes','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Clínica');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (101, 'El Tratamiento el Padecimiento Subjetivo en la Experiencia Analítica','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Clínica');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (102, 'El Rol del Psicólogo en el Ámbito de las Tecnologías de Reproducción Humana Asistida','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Clínica');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (103, 'Orientación Vocacional y Ocupacional (Práctica Profesional)','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Educacional');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (104, 'Discapacidad: Intervenciones en la Niñez y la Adolescencia. El Proceso de Integración','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Educacional');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (105, 'Proceso de Reinserción Laboral','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Trabajo');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (106, 'Inserción Laboral de Jóvenes Socialmente Vulnerables','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Trabajo');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (107, 'Factores Psicosociales Vinculados a la Psicodinámica del Trabajo','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Trabajo');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (108, 'Instituciones Forenses','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Justicia');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (109, 'El Trabajo con Familias en el Ámbito Jurídico','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Justicia');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (110, 'La Actividad Pericial en Psicología Jurídica','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Justicia');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (111, 'La Ejecución de la Pena. Trabajo Interdisciplinario en el Seguimiento de los Condenados','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Justicia');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (112, 'Ámbito Comunitario: Familia y Enfermedad Crónica','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Social - Comunitaria');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (113, 'El Psicólogo en el Ámbito Comunitario','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Social - Comunitaria');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (114, 'Salud Mental y Desinstitucionalización','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Social - Comunitaria');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (115, 'El Rol del Psicólogo en una Experiencia de Trabajo Interdisciplinario en la Comunidad','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Social - Comunitaria');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (116, 'Adicciones. Un abordaje Clínico - Comunitario','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Social - Comunitaria');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (117, 'El Psicólogo en Centros de Atención Primaria. Un Enfoque Preventivo y Comunitario del Trabajo en Salud','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Social - Comunitaria');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (118, 'Promoción de la Salud en Adolescentes. Prácticas en Evaluación, Diagnóstico y Prevención en Instituciones Educativas','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Social - Comunitaria');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (119, 'Violencia. Modos de Intervención en los Dispositivos Clinicos y Socio Comunitarios','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Social - Comunitaria');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (120, 'Psicología del Deporte y Actividad Física','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Social - Comunitaria');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (121, 'El Rol del Psicólogo/a en la Promoción de la Salud Sexual y la Salud Reproductiva','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Social - Comunitaria');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (122, 'Intervenciones Psicoanalíticas con Jóvenes en Situación de Vulnerabilidad','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Social - Comunitaria');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (123, 'La Angustia en la Experiencia Analítica','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Clínica');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (124, 'La Clínica Psicoanalítica en Dispositivos Institucionales','Sin Cursar','Práctica Profesional','Formación Profesional','Cuatrimestral','Área Clínica');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (125, 'La Psicología en el Ámbito Jurídico. Reflexiones Ético-clínicas a través de un Estudio Cualitativo de Casos','Sin Cursar','Práctica Investigación','Formación Profesional','Cuatrimestral','Área Investigación');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (126, 'Métodos Psicofisiológicos','Sin Cursar','Práctica Investigación','Formación Profesional','Cuatrimestral','Área Investigación');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (127, 'Psicología y Educación: los Psicólogos y su Participación en Comunidades de Práctica de Aprendizaje Situado','Sin Cursar','Práctica Investigación','Formación Profesional','Cuatrimestral','Área Investigación');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (128, 'Aportes del Psicoanálisis a la Clínica de las Afecciones Psicosomáticas. Dirección de la Cura y Coordenadas Subjetivas del Desencadenamiento','Sin Cursar','Práctica Investigación','Formación Profesional','Cuatrimestral','Área Investigación');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (129, 'Salud Mental y Atención Primaria de la Salud: Investigaciones desde la perspectiva de Derechos','Sin Cursar','Práctica Investigación','Formación Profesional','Cuatrimestral','Área Investigación');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (130, 'Evaluación Psicológica en Contexto','Sin Cursar','Práctica Investigación','Formación Profesional','Cuatrimestral','Área Investigación');",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (131, 'Cine y Subjetividad: el Método de Lectura Ético-Analítica de Películas y Series Televisivas','Sin Cursar','Práctica Investigación','Formación Profesional','Cuatrimestral','Área Investigación');",

        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (1, 'Prof. Tit. Reg. G. González', '044', 1);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (2, 'Prof. Tit. Reg. M.E. Colombo', '045', 1);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (3, 'Prof. Adj. Reg. a cargo M. E. Aguerri', '060', 2);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (4, 'Prof. Asoc. Reg. R. Muiños', '167', 2);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (5, 'Adj. Reg. a cargo M. Wainstein', '035', 3);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (6, 'Prof. Adj. Reg. a cargo M. Robertazzi', '036', 3);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (7, 'Prof. Tit. Reg.  Alicia Barreiro', '046', 4);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (8, 'Prof. Adj. Int. D. Fernández Zalazar', '047', 4);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (9, 'Prof. Tit. Reg. O. Delgado', '049', 5);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (10, 'Prof. Tit. Reg. D. Laznik', '050', 5);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (11, 'Prof. Tit. Reg. A.R. Ferreres', '048', 6);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (12, 'Prof. Tit. Reg. A. Iorio', '123', 6);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (13, 'Prof. Adj. Reg. a cargo A. Dagfal', '118', 7);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (14, 'Prof. Tit. Reg. L. Rossi', '034', 7);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (15, 'Prof. Adj. Reg. a cargo M. E. Aguerri', '061', 8);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (16, 'Prof. Tit. Reg. R. Ynoub', '062', 8);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (17, 'Prof. Tit. Reg. M. De Lellis','065', 9);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (18, 'Prof. Tit. Reg. A. Stolkiner','066', 9);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (19, 'A designar', '063', 10);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (20, 'Prof. Adj. Reg. M. Percia', '064', 10);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (21, 'Prof. Adj. Reg. a cargo M. E. Pizzo', '053', 11);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (22, 'A designar', '054', 11);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (23, 'Prof. Adj. Reg. J. Barrionuevo', '055', 12);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (24, 'Prof. Tit. Reg. A. Grassi', '056', 12);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (25, 'Prof. Tit. Reg. F. Naparstek', '037', 13);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (26, 'Prof. Tit. Reg. F. Schejtman', '038', 13);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (27, 'Prof. Tit. Reg. I.M. Mikulic', '059', 14);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (28, 'Prof. Tit. Reg. M. Fernández Liporace', '058', 14);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (29, 'Prof. Tit. Reg. G. Peker', '113', 15);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (30, 'Prof. Tit. Reg.  T.A. Veccia', '042', 15);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (31, 'A designar', '676', 16);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (32, 'A designar', '678', 17);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (33, 'Adj. Int. a cargo Laura Miñones', '677', 18);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (34, 'Adj. Int. a cargo Laura Miñones', '679', 19);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (35, 'Prof. Tit. Reg.  J.J. Michel Fariña', '071', 20);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (36, 'A designar', '723', 20);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (37, 'A designar', '144', 21);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (38, 'Prof. Adj. Reg. a cargo N. Vitale', '039', 21);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (39, 'Prof. Asoc. Reg.  M. C. Chardón', '083', 22);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (40, 'Prof. Adj. Reg. C. Erausquin', '041', 22);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (41, 'Prof. Tit. Reg. G.L. Filippi', '040', 23);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (42, 'Prof. Adj. Reg. C. Alonzo', '724', 23);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (43, 'Prof. Tit. Reg. G.H. Lombardi', '114', 24);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (44, 'Prof. Asoc. Reg. S. Vazquez', '115', 24);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (45, 'Prof. Adj. Reg. C. Ghiso', '768', 25);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (46, 'Prof. Tit. Reg. O. Varela', '769', 25);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (47, 'Adj. Reg. a cargo M. Etchevers', '070', 26);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (48, 'Prof. Tit. Reg. E. G. Keegan', '634', 26);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (49, 'A designar', '051', 27);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (50, 'Prof. Asoc. Reg.  A. M. Luzzi', '052', 27);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (51, 'Prof. Emérita  D.S. Rabinovich', '057', 28);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (52, 'Prof. Tit. Reg. a cargo O. Delgado', '122', 28);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (53, 'Prof. Adj. Reg.  a cargo  P. Muñoz', '078', 29);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (54, 'Prof. Tit. Reg.  M. Rosenvald', '079', 29);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (55, 'Prof. Asoc. Reg.  R. Iacub', '080', 31);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (56, 'Prof. Tit. Reg.  A. M. Núñez', '082', 32);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (57, 'Prof. Adj. Reg.  a cargo  L.E. Ferrari', '087', 33);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (58, 'Prof. Adj. Int.  a cargo  F. Montañez', '089', 34);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (59, 'Prof. Asoc. Reg.  R. Muzio', '090', 35);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (60, 'Prof. Adj. Int. a cargo F. Allegro', '096', 36);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (61, 'Prof. Tit. Reg.  a cargo M.I. Sotelo', '806', 37);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (62, 'Prof. Tit. Reg.  a cargo O. Delgado', '798', 38);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (63, 'Prof. Adj. Int.  a cargo  J. Biglieri', '810', 39);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (64, 'Prof. Adj. Reg. P. Alvarez', '085', 40);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (65, 'Prof. Adj. Reg.  a cargo G. Aisenson', '086', 41);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (66, 'Prof. Adj. Int. a cargo D. Fernandez Zalazar', '660', 42);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (67, 'Prof. Adj. Reg.  A. Franco', '043', 43);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (68, 'Prof. Adj. Reg.  a cargo J. Ulnik', '081', 44);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (69, 'Prof. Asoc. Reg.  D. Politis', '091', 45);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (70, 'Prof. Adj. Int. a cargo  V. Wittner', '158', 46);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (71, 'Prof. Tit. Reg.  a cargo  D. Laznik', '654', 47);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (72, 'Prof. Tit. Reg.  a cargo  E. Keegan', '771', 48);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (73, 'Prof. Adj. Int a cargo N. Bruner', '808', 49);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (74, 'Prof. Adj. Reg. a cargo M. La Tessa', '813', 50);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (75, 'Prof. Asoc. Reg. A. Donghi', '815', 51);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (76, 'Prof. Tit. Reg.  E. García Méndez', '075', 52);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (77, 'Prof. Adj. Reg.  a cargo S. Puhl', '191', 53);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (78, 'Prof. Adj. Int.  a cargo  L. Acebal', '692', 54);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (79, 'Prof. Adj. Int.  a cargo  J. Rodriguez', '782', 55);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (80, 'Adj. Int. a cargo H. Leale', '067', 56);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (81, 'Prof. Adj. Int.  a cargo C. Pesiney', '084', 57);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (82, 'Prof. Adj. Reg  a cargo D. Tajer', '105', 58);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (83, 'Prof. Adj. Int. a cargo  R. Barrios', '607', 59);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (84, 'Prof. Adj. Int. a cargo G. Perrotta', '816', 60);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (85, 'Prof. Adj. Reg.  a cargo  C.E.Tkach', '102', 61);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (86, 'Prof. Adj. Int.  a cargo  J. Dahab', '780', 62);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (87, 'A designar', '136', 63);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (88, 'Prof. Adj. Int.  a cargo  S.R. Herlyn', '616', 64);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (89, 'Prof. Tit. Reg.  a cargo  M.E. Saavedra', '635', 65);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (90, 'Prof. Emérita  a cargo  D. Rabinovich', '658', 66);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (91, 'Prof. Adj. Reg. a cargo A. Lowenstein', '659', 67);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (92, 'Prof. Tit. Reg. a cargo F. Naparstek', '770', 68);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (93, 'Prof. Tit. Reg. a cargo G. Lombardi', '807', 69);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (94, 'Prof. Adj. Int. a cargo S. Tendlarz', '814', 70);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (95, 'Prof. Adj. Int.  a cargo  M. Fernández', '662', 71);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (96, 'Prof. Adj. Int.  a cargo  V. Aiscar', '719', 72);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (97, 'Prof. Adj. Reg.  a cargo  C.D. Ghiso', '691', 73);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (98, 'Prof. Adj. Int.  a cargo L. Acebal', '781', 74);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (99, 'Prof. Tit. Reg. J. F. Marteau', '803', 75);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (100, 'Prof. Tit. Reg.  M. I. Sotelo', '109', 76);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (101, 'Prof. Adj. Int. a cargo  S. A. Sánchez', '125', 77);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (102, 'Prof. Adj. Int.  a cargo  M. Trigo', '126', 78);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (103, 'Prof. Adj. Int. como coordinador  J. Mena', '127', 79);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (104, 'Prof. Asoc. Reg.  a cargo  A. Donghi', '128', 80);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (105, 'Prof. Adj. Int. como coordinador  M. Goldenberg', '130', 81);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (106, 'Prof. Adj. Int. como coordinador  A. Fränkel', '135', 82);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (107, 'Prof. Adj. Int.  como coordinador  D. Szyter', '138', 83);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (108, 'Prof. Adj. Int. como coordinador  L. Szapiro', '161', 84);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (109, 'Prof. Adj. Int. como coordinadora N. B. Fantini', '162', 85);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (110, 'Prof. Asoc. Reg.  a cargo  A. M. Luzzi', '639', 86);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (111, 'Prof. Adj. Int. como coordinador  G. Rossi', '687', 87);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (112, 'Prof. Adj. Int. como coordinadora  S. Di Biasi', '689', 88);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (113, 'Prof. Adj. Int. como coordinadora  M. Besada', '690', 89);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (114, 'Prof. Adj. Reg. como coordinadora  G. Aksman', '701', 90);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (115, 'Prof. Adj. Int. como coordinadora  I. Celotto', '703', 91);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (116, 'Prof. Adj. Int. como coordinadora A. Oiberman', '721', 92);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (117, 'Prof. Adj. Int. como coordinadora N. Bruner', '722', 93);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (118, 'Prof. Tit. Reg.  a cargo  A. Grassi', '726', 94);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (119, 'Prof. Adj. Int. como coordinador O. Rodríguez', '772', 95);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (120, 'Prof. Adj. Int. como coordinador D. Tumas', '776', 96);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (121, 'Prof. Adj. Int. como coordinador N. A. Conti', '779', 97);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (122, 'Prof. Adj. Int. como coordinadora L. M. Vazquez', '802', 98);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (123, 'Prof. Adj. Int. como coordinador M. Ferraro', '812', 99);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (124, 'Prof. Adj. Int. como coordinadora S. Szmuszkowiez', '817', 100);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (125, 'Prof. Adj. Int.  a cargo  M. L. Iuale', '822', 101);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (126, 'Prof. Adj. Reg.  a cargo  E. Ormart', '824', 102);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (127, 'Prof. Adj. Reg. como coordinadora G. Aisenson', '100', 103);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (128, 'Prof. Adj. Int. como coordinador A. Febbraio', '107', 104);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (129, 'Prof. Adj. Int. como coordinador M. Sandoval', '657', 105);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (130, 'Prof. Adj. Int. como coordinadora S. Asam', '714', 106);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (131, 'Prof. Adj. Reg. como coordinadora L. Ferrari', '795', 107);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (132, 'Prof. Tit. Reg.  a cargo  O. Varela', '119', 108);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (133, 'Adj. Int. a cargo M. Siderakis', '601', 109);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (134, 'Prof. Adj. Reg. como coordinadora S. M. Puhl', '718', 110);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (135, 'Prof. Adj. Int. como coordinadora M. Massa', '774', 111);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (136, 'Prof. Adj. Int. como coordinadora V. Bail Pupko', '632', 112);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (137, 'Prof. Adj. Int. como coordinador E. Tissera', '633', 113);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (138, 'Prof. Adj. Int. como coordinadora A. Tisera', '638', 114);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (139, 'Prof. Adj. Int. como coordinador A. Pagliari', '698', 115);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (140, 'Prof. Adj. Int. como coordinador D. Cóppola', '707', 116);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (141, 'Prof. Tit. Reg.  a cargo  M. De Lellis', '786', 117);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (142, 'Prof. Adj. Reg.  a cargo  V. Schmidt', '788', 118);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (143, 'Prof. Adj. Int. como coordinadora M. Morao', '805', 119);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (144, 'Prof. Adj. Int.  como coordinador R. Barrios', '811', 120);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (145, 'Prof. Adj. Int.  a cargo  G. Perrotta', '825', 121);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (146, 'Prof. Adj. Int.  a cargo  L. Szapiro', '826', 122);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (147, 'Prof. Adj. Int. a cargo L. Kligmann', '827', 123);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (148, 'Prof. Adj. Int. a cargo M. R. Manzotti', '821', 124);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (149, 'Prof. Adj. Reg. como coordinador  G. Salomone', '775', 125);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (150, 'Prof. Tit. Reg. como coordinador  A. Iorio', '777', 126);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (151, 'Prof. Adj. Reg. a cargo C. Erausquin', '778', 127);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (152, 'Prof. Adj. Int. como coordinadora L. Szapiro', '804', 128);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (153, 'Prof. Tit. Reg.  como coordinadora A. Stolkiner', '818', 129);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (154, 'Prof. Tit. Reg.  como coordinadora I. M. Mikulic', '819', 130);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (155, 'Prof. Tit. Reg. como coordinador J.J. Michel Fariña', '823', 131);",

        "INSERT INTO PRED_SUC_CORRELATIVES (id_pred, id_suc) VALUES (NULL,1);",
        "INSERT INTO PRED_SUC_CORRELATIVES (id_pred, id_suc) VALUES (NULL,2);",
        "INSERT INTO PRED_SUC_CORRELATIVES (id_pred, id_suc) VALUES (NULL,3);",
        "INSERT INTO PRED_SUC_CORRELATIVES (id_pred, id_suc) VALUES (NULL,4);",
        "INSERT INTO PRED_SUC_CORRELATIVES (id_pred, id_suc) VALUES (NULL,5);",
        "INSERT INTO PRED_SUC_CORRELATIVES (id_pred, id_suc) VALUES (NULL,6);",
        "INSERT INTO PRED_SUC_CORRELATIVES (id_pred, id_suc) VALUES (1,7);",
        "INSERT INTO PRED_SUC_CORRELATIVES (id_pred, id_suc) VALUES (1,8);",
        "INSERT INTO PRED_SUC_CORRELATIVES (id_pred, id_suc) VALUES (2,8);",
        "INSERT INTO PRED_SUC_CORRELATIVES (id_pred, id_suc) VALUES (3,9);",
        "INSERT INTO PRED_SUC_CORRELATIVES (id_pred, id_suc) VALUES (8,9);",
        "INSERT INTO PRED_SUC_CORRELATIVES (id_pred, id_suc) VALUES (3,10);",
        "INSERT INTO PRED_SUC_CORRELATIVES (id_pred, id_suc) VALUES (5,10);",
        "INSERT INTO PRED_SUC_CORRELATIVES (id_pred, id_suc) VALUES (5,11);",
        "INSERT INTO PRED_SUC_CORRELATIVES (id_pred, id_suc) VALUES (4,11);",
        "INSERT INTO PRED_SUC_CORRELATIVES (id_pred, id_suc) VALUES (11,12);",
        "INSERT INTO PRED_SUC_CORRELATIVES (id_pred, id_suc) VALUES (12,13);",
        "INSERT INTO PRED_SUC_CORRELATIVES (id_pred, id_suc) VALUES (6,13);",
        "INSERT INTO PRED_SUC_CORRELATIVES (id_pred, id_suc) VALUES (13,14);",
        "INSERT INTO PRED_SUC_CORRELATIVES (id_pred, id_suc) VALUES (8,14);",
        "INSERT INTO PRED_SUC_CORRELATIVES (id_pred, id_suc) VALUES (14,15);",
        "INSERT INTO PRED_SUC_CORRELATIVES (id_pred,id_suc) VALUES (1,16);",
        "INSERT INTO PRED_SUC_CORRELATIVES (id_pred,id_suc) VALUES (5,16);",
        "INSERT INTO PRED_SUC_CORRELATIVES (id_pred,id_suc) VALUES (16,17);",
        "INSERT INTO PRED_SUC_CORRELATIVES (id_pred,id_suc) VALUES (1,18);",
        "INSERT INTO PRED_SUC_CORRELATIVES (id_pred,id_suc) VALUES (5,18);",
        "INSERT INTO PRED_SUC_CORRELATIVES (id_pred,id_suc) VALUES (18,19);",
        "INSERT INTO PRED_SUC_CORRELATIVES (id_pred,id_suc) VALUES (7,20);",
        "INSERT INTO PRED_SUC_CORRELATIVES (id_pred,id_suc) VALUES (3,20);",
        "INSERT INTO PRED_SUC_CORRELATIVES (id_pred,id_suc) VALUES (9,21);",
        "INSERT INTO PRED_SUC_CORRELATIVES (id_pred,id_suc) VALUES (10,21);",
        "INSERT INTO PRED_SUC_CORRELATIVES (id_pred,id_suc) VALUES (9,22);",
        "INSERT INTO PRED_SUC_CORRELATIVES (id_pred,id_suc) VALUES (10,22);",
        "INSERT INTO PRED_SUC_CORRELATIVES (id_pred,id_suc) VALUES (12,22);",
        "INSERT INTO PRED_SUC_CORRELATIVES (id_pred,id_suc) VALUES (10,23);",
        "INSERT INTO PRED_SUC_CORRELATIVES (id_pred,id_suc) VALUES (15,24);",
        "INSERT INTO PRED_SUC_CORRELATIVES (id_pred,id_suc) VALUES (15,25);",
        "INSERT INTO PRED_SUC_CORRELATIVES (id_pred,id_suc) VALUES (15,26);"
    ];

    // Ejemplos para próximas versiones

    // /** Queries for schema update from version 1 going to 2 */
    queries[2] = [
        "ALTER TABLE EVENTS ADD COLUMN type TEXT",
        "ALTER TABLE EVENTS ADD COLUMN quantity INTEGER"
    ];
    // /** Queries for schema update from version 2 going to 3 */
    queries[3] = [
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (132, 'CBC Matemática', 'Sin Cursar', 'Obligatoria', 'Formación General', 'Cuatrimestral', NULL);",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (133, 'CBC Introducción al pensamiento científico', 'Sin Cursar', 'Obligatoria', 'Formación General', 'Cuatrimestral', NULL);",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (134, 'CBC Biología', 'Sin Cursar', 'Obligatoria', 'Formación General', 'Cuatrimestral', NULL);",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (135, 'CBC Semiología', 'Sin Cursar', 'Obligatoria', 'Formación General', 'Cuatrimestral', NULL);",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (136, 'CBC Psicología', 'Sin Cursar', 'Obligatoria', 'Formación General', 'Cuatrimestral', NULL);",
        "INSERT INTO SUBJECTS (id, name, state, type, formation, duration, area) VALUES (137, 'CBC Introducción al conocimiento de la Sociedad y Estado', 'Sin Cursar', 'Obligatoria', 'Formación General', 'Cuatrimestral', NULL);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (156, 'A designar', '000', 132);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (157, 'A designar', '000', 133);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (158, 'A designar', '000', 134);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (159, 'A designar', '000', 135);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (160, 'A designar', '000', 136);",
        "INSERT INTO CLASSES (id, name, num_cat, subject_id) VALUES (161, 'A designar', '000', 137);"
    ];

    this.$get = function() {

        function versionQueryExists(version) {
            return (version in queries)
        };

        /**
        * Returns queries for specific version
        * @param version
        * @return {*}
        */
        function getQueryFor(version) {
            if (version in queries) {
                return queries[version];
            } else {
                return [];
            }
        };

        /**
        * Generates delta to transition from current to target
        *
        * @param currentVersion
        * @param targetVersion
        * @return {Array}
        */
        function generateQuery(currentVersion, targetVersion) {
            var query = [];

            currentVersion++;
            while (currentVersion <= targetVersion) {
                if ((currentVersion in queries)) {
                    query = query.concat(queries[currentVersion]);
                }
                currentVersion++;
            }

            return query;
        };

        /**
        * Generate delta to create entire schema
        *
        * @param targetVersion
        * @return {string[]}
        */
        function generateSchemaCreate(targetVersion) {
            var query = queries["base-database"];

            query = query.concat(generateQuery(1, targetVersion));
            query = query.concat( ["insert into database_version_updates (version, date) values (" + targetVersion + " , date('now'));"] );

            return query;
        };

        return {
            versionQueryExists: versionQueryExists,
            generateQuery:  generateQuery,
            getQueryFor: getQueryFor,
            generateSchemaCreate: generateSchemaCreate
        }
    };

});
