Configuración entorno Windows:

- Descargar GIT desde: https://git-for-windows.github.io/

- Instalarlo con la configuración por defecto

- Instalar Node.js desde: https://nodejs.org/en/download/
  Con eso se instala npm por defecto, pero no la versión más reciente.

- Actualizar la versión de npm. En la consola:
	npm install -g npm

- Instalar bower:
	npm install -g bower

- Instalar el comando "gulp":
	npm install --global gulp-cli

- Instalar cordova e ionic:
	npm install -g cordova ionic

- Instalar Java Development Kit (JDK) 8 o más desde: http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html

- Instalar Android SDK desde: https://developer.android.com/studio/index.html#downloads al final de la página bajar solo las herramientas.
  Crear una carpeta en C llamada "android" y descomprimir la carpeta tools que se baja en C:\android.

- Agregar JAVA_HOME a las variables del entorno (click derecho sobre PC --> Propiedades --> Advanced System settings --> Enviromment variables) con el valor siendo la ruta a la carpeta del JDK

- Agregar %JAVA_HOME\bin a la variable PATH
  Después de cada cambio sobre las variables del entorno hay que cerrar y volver a abrir la consola para que tomen efecto los cambios

- Bajar el archivo "packages_file.txt" que se encuentra en la misma carpeta que este archivo y dejarlo en C:\android

- En la consola, ir a C:\android\tools\bin y correr el siguiente comando
	sdkmanager --package_file=C:\android\packages_file.txt

- Agregar ANDROID_HOME a las variables del entorno con el valor siendo la ruta a la carpeta del Android SDK

- Agregar %ANDROID_HOME\tools y %ANDROID_HOME\platform-tools a la variable PATH

Dependencias:
    - Se deben bajar la primera vez que uno empieza a trabajar con el proyecto.
    - Cuando se baja una dependecia nueva con "bower" o con "npm" hay que agregar la opción "--save", sino no se guarda la dependecia en los archivos de configuración de dependencias "package.json" "bower.json"
    - Cuando se hace un pull de la branch donde uno esta trabajando, por las dudas se tienen que correr los comandos.
    - Para correr los comandos en la consola, ir al root del proyecto y:
        npm install
        bower install
