# Encuestas de trabajo
Este es el repositorio del back-end para una aplicación web que permite a los usuarios crear y responder encuestas relacionadas con su trabajo. La aplicación utiliza Node.js y MongoDB para el almacenamiento de datos.

## Instalación
Para instalar las dependencias, ejecuta el siguiente comando en la raíz del proyecto:
~~~
npm install
~~~

## Configuración
Antes de iniciar la aplicación, es necesario configurar algunas variables de entorno. Modifica el archivo '.env_template' y completa las variables con la siguiente información:

~~~
PORT=<Puerto donde se alojará la aplicación>
MONGODB_CNN=<URI de la base de datos MongoDB>
JWT_SECRET=<clave secreta para la autenticación>
~~~

Una vez completado, cambia el nombre del archivo '.env_template' a '.env'.

## Uso
Para iniciar la aplicación en desarrollo, ejecuta el siguiente comando en la raíz del proyecto:

~~~
node index.js
~~~

La aplicación estará disponible en http://localhost:"PORT".

## API
La API de la aplicación cuenta con los siguientes endpoints:

<!-- - `/api/auth/signup: ` Registra un nuevo usuario.
- `/api/auth/login: ` Inicia sesión con un usuario registrado.
- `/api/surveys: ` Permite crear, obtener y eliminar encuestas. -->

<!-- Para obtener más información sobre el funcionamiento de la API, consulta la documentación en /docs/api.md. -->

## Contribuciones
Si deseas contribuir a este proyecto, por favor, sigue los siguientes pasos:

1. Haz un fork del repositorio.
2. Crea una rama para tu contribución.
3. Haz tus cambios y crea un pull request.

<!-- ### Licencia
Este proyecto está bajo la licencia MIT. Consulta el archivo LICENSE para más detalles. -->

### Creadores

- Gonzalo Morales
- Javier de la Vega
- Juan Mochon