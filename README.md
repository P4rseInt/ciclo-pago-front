# ciclo-pago-front #

Aplicación cargos-abonos para proyecto Gestor RT, desarrollado con Angular 16.

## Comenzando ##

### Pre-requisitos ##

- Editor de código [Visual studio code](https://code.visualstudio.com)

- Herramienta opcional para gestionar (push,pull,merge,commit,checkout,etc)
    repositorios GIT [Sourcetree](https://www.sourcetreeapp.com/)

- EditorConfig
  - ¿Qué hace?: Setea configuraciones del editor comunes para el equipo
      mediante un archivo que se encuentra en el proyecto.
  - [Plugin VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
  - [Página oficial](https://editorconfig.org)

- TSLint
  - ¿Qué hace?: Analiza el código typescript y muestra errores o malas
      prácticas que podamos cometer.
  - ¿Cómo se configura?: Archivo `tslint.json` en la raiz del proyecto.
  - [Plugin VS Code](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-tslint-plugin)
  - [Página oficial](https://palantir.github.io/tslint/usage/cli)

- Node JS + NPM ( Sistema de gestión de paquetes por defecto para Node.js)
  - [WEB](https://nodejs.org/es)
  - Instalación: Ejecutable versión ^18.16.0

- Angular CLI.
  - [WEB](https://cli.angular.io)
  - Instalación: `npm install -g @angular/cli@16.1.6`

- Validador de archivos markdown.
  - [WEB](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint)

- Pluggin devtools Redux ( Utilizado para desarrollar con ngxd )
  - [WEB](https://github.com/zalmoxisus/redux-devtools-extension)

### Instalación de dependencias ###

Instalar dependencias del proyecto (configuradas en archivo package.json).
Este paso es necesario antes de poder hacer cualquier cosa en el proyecto
y se debe volver a realizar cada vez que una nueva dependencia se incorpora
al proyecto global.

`npm install`

Con este paso completado se puede comenzar a utilizar el espacio de trabajo.

## Instrucciones para construir y ejecutar el proyeto ##

A continuación se describen las instrucciones necesarias para poder construir
y ejecutar el proyecto, ejecutar las pruebas, construir bibliotecas adicionales,
entre otras.

### Servidor de desarrollo local ###

Existen dos formas de montar y desplegar una aplicación Angular de forma local, una es totalmente aislada y la segunda es compartiendo un dominio en común utilizando Nginx.

#### Servidor de desarrollo local aisalda ###

- Utiliza el comando `ng serve` para correr el proyecto por defecto.
- También puedes apuntar a un proyecto con `ng serve nombre_proyecto`
- Para correr en un puerto en especifico `ng serve --port 40800`
- Puedes agregar "-o" para abrir la aplicación en el navegador por defecto, ejemplo `ng serve -o`

#### Servidor de desarrollo local con Nginx ###

La principal razón para utilizar esta forma, es para compartir los token de acceso entre las diferentes aplicaciones, ya que de esta forma, todas las aplicaciones estarán en el mismo dominio y asi emular un ambiente de desarrollo en Kubernetes. Para esto realizar los siguientes pasos:

1. Descargar [Nginx](http://nginx.org/)
2. Descomprimir el contenido, por ejemplo: ```C:\opt\nginx-1.17.10```
3. Iniciar la aplicación ejecutando el comando `start nginx` desde la ubicación de Nginx. Para validar que se esté ejecutando correctamente se puede consultar la dirección `http://localhost` en el navegador.
4. Desplegar las aplicaciones que se desean de forma local con el siguiente comando.

   ```bash
   ng serve <nombre-proyecto> --port <puerto> --host 0.0.0.0 --baseHref=<contexto asociado a la aplicación> --disable-host-check  --public-host="http://localhost:<puerto>"
   ```

   Ejemplo:

   ```bash
   ng serve sitio-base-privado-sitio-base-privado --port 4002 --host 0.0.0.0 --disable-host-check --baseHref=/portal-privado/ --public-host="http://localhost:4002"
   ```

   > **Importante**: el valor asociado al parámetro baseHref, debe terminar con el caracter ```/```

5. Abrir el archivo de configuración de nginx ```nginx.conf``` que se encuentra en  ```<ruta>/nginx-<version>/conf```, ejemplo ```C:\opt\nginx-1.17.10\conf```

6. En dicho archivo conf, agregar un servidor de la siguiente forma:

    ```bash
    server {
      listen <puerto-server>;
      listen [::]:<puerto-server>;
      server_name <nombre-server>;
      location /<base-href>/ {
         proxy_pass       http://localhost:<puerto-angular>/<base-href>;
         proxy_set_header Upgrade    $http_upgrade;
         proxy_set_header Connection $http_connection;
         proxy_set_header Host            $host;
        }
     }
    ```

   Donde:

   - *puerto-server*: puerto dado al servidor nginx y **debe ser diferente a las aplicaciones Angular**. Para todas las aplicaciones que se cargarán de forma local debe ser el mismo valor.
   - *nombre-server*: nombre del server o dominio dado a la aplicación Angular. Para todas las aplicaciones que se cargarán de forma local debe ser el mismo valor. Este valor debe ser inscrito en tu archivo host apuntando localmente, ejemplo ```127.0.0.1 <nombre-server>```
   - *base-href*: Valor definido para el parámetro ```baseHref```, en la aplicación Angular al momento de desplegar de forma local, del paso 3.
   - *puerto-angular*: valor definido para parámetro ```port``` en la aplicación Angular al momento de desplegar de forma local del paso 3.

7. Si se desea agregar otra aplicación al mismo dominio, agregar otro ```location``` con los valores que corresponden a la aplicación referenciada, en el mismo server.

8. Para aplicar los cambios realizados al archivo de configuración ejecutar el comando `nginx -s reload`.

9. Ahora para ver el resultado en el navegador colocar ```http://<nombre-server>:<puerto-server>/<base-href>```, según valores correspondientes.

### Como agregar la libreria bootstrap a nuestro proyecto ###

1. Ir al archivo angular.json
2. Agregar la ruta de Bootstrap a "nombre_proyecto.architect.build.options.styles".

   Tener en cuenta , que debe encontrase en la primera posición , para evitar sobreescribir nuestros estilo:

   ```json
    "styles": [
      "node_modules/bootstrap/scss/bootstrap.scss",
      "apps/nombre-aplicacion/modulo/modulo/src/styles.scss"
    ],
   ```

3. Agregar los siguientes scripts a la ruta "nombre_proyecto.architect.build.options.scripts" , estos ayudarán a que las animaciones de bootstrap funcionen sin problemas:

   ```json
    "scripts": [
      "node_modules/jquery/dist/jquery.min.js",
      "node_modules/popper.js/dist/umd/popper.min.js",
      "node_modules/bootstrap/dist/js/bootstrap.min.js"
    ],

   ```

4. Al compilar, Angular agregará Bootstrap a nuestro proyecto.

### Generar manejo de estados con NGXS ###

Pasos para crear un state dentro de nuestra app. - Instalar el cli de
ngsxs [https://github.com/ngxs/cli](https://github.com/ngxs/cli)

- Nos paramos en la carpeta app de nuestra app , por ejemplo : "/apps/cuentas/cambio-fondos/cambio-fondos/src/app".
- Ejecutamos el comando ngxs --name nombre-state --spec false
- Agregamos el parámetro --spec false , ya que no es necesario generar pruebas unitarias a este nivel.
- Con esto , deberia generar una carpeta de nombre state, con dos archivos , nombre-state.state.ts & nombre-state.actions.ts

Ya con lo anterior como base, podemos comenzar con nuestro desarrollo.

### Mantener estados en Storage (storage-pluggin NGXS) ###

Al usar NGXS los estados se mantienen en la instancia generada al iniciar
a la aplicación, sin embargo, si tu refrescas la pantalla la instancia es
reiniciada y los datos almacenados se pierden.

Si alguna aplicación cuenta con más de un paso y se desea mantener los
estados durante todo el flujo de la aplicación se debe utilizar el
pluggin storage-pluggin de NGXS.

Para lo anterior se debe instalar el pluggin en el workspace (en caso de
no estar agregado), con el siguiente comando:

- `npm install @ngxs/storage-plugin --save`

Una vez instalado el pluggin en el workspace se debe añadir el pluggin a
la aplicación que desea implementar. Para lo anterior importamos el
pluggin NgxsStoragePluginModule en el app module de la aplicación.

Ej:

```ts
  import { NgxsModule } from '@ngxs/store';
  import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';

  @NgModule({
    imports: [NgxsModule.forRoot([]), NgxsStoragePluginModule.forRoot()]
  })
  export class AppModule {}
```

Lo anterior hará que todos los estados de la aplicación se mantengan en el
storage y sean persistidos. Si solo se necesita persistir un State se debe
especificar en el app module de la siguiente forma:

```ts
@NgModule({
  imports: [
    NgxsStoragePluginModule.forRoot({
      key: NovelsState
    })
  ]
})
export class AppModule {}
```

Para más información del pluggin visitar la página oficial
[Storage](https://www.ngxs.io/plugins/storage)

### Ejecutar pruebas unitarias ###

Para las pruebas unitarias se utiliza Jest, y existen dos opciones para ejecutarlos:

1.

```bash
npm test
```

2.

```bash
npm run test:coverage
```

### Ejecutar pruebas end-to-end ###

Las pruebas [Cypress](https://www.cypress.io) se pueden ejecutar de la
siguiente manera :

- Correr el comando `ng e2e <ruta-carpeta-e2e>`.

> ***NOTA:*** La `ruta-carpeta-e2e` hace referencia al path de la carpeta
> e2e dentro de cada aplicación.
#   c i c l o - p a g o - f r o n t  
 