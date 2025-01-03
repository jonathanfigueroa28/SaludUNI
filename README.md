# Sistema Centro Médico SaludUNI

## Descripción

El siguiente proyecto tiene como finalidad el poder reservar citas médicas y realizar consultas de medicamentos

## Pasos para instalar y ejecutar el proyecto

### 1. Descargar Node.js

Dirígete al sitio web oficial de Node.js para descargar la última versión LTS (Long Term Support):

- [Página de descarga de Node.js](https://nodejs.org/)

### 2. Instalar Node.js

- **Windows/Mac**: Descarga el instalador correspondiente a tu sistema operativo y sigue las instrucciones del asistente de instalación.
- **Linux**:
  - Abre una terminal y usa el siguiente comando para instalar Node.js y npm (el gestor de paquetes de Node.js):
  
  **Ubuntu/Debian:**
  ```bash
  sudo apt update
  sudo apt install nodejs npm

### 3. Verificar Node.js

Una vez instalado ejecutar

```bash
node -v
npm -v
```

### 4. Clonar el proyecto

Dirígete al enlace del proyecto en Github
- [Página del proyecto en Github](https://github.com/jonathanfigueroa28/Trabajo_Final_G3)

En la terminal de cualquier editor de código colocamos el mensaje

```bash
git clone https://github.com/jonathanfigueroa28/Trabajo_Final_G3
```

### 5. Instalar PostgreSQL

Dirígete al sitio web oficial de PostgreSQL para descargar la versión 15.10
- [Página de descarga de PostgreSQL](https://www.postgresql.org/download/windows/)

Sigue los pasos de instalación y creación de password Superuser.

### 6. Crear Base de Datos e Importar

Una vez iniciado la aplicación pgAdmin4 creamos la base de datos

![Crear Base de Datos](images/crear-basedatos.png)

Posterior colocamos el siguiente nombre a nuestra base de datos

![centro_medico_db2](images/crear-basedatos2.png)

Luego de eso en la base de datos creada iniciamos la importación de la base de datos del proyecto

![Restore](images/importar-basedatos.png)

Seleccionamos la opción Directory

![Directory](images/importar-basedatos2.png)

Finalmente vamos a la carpeta del proyecto que clonamos y en database escogemos la siguiente base de datos

![Version 4](images/importar-basedatos3.png)

Por último podemos visualizar el contenido de la base de datos

![Visualización](images/visualizacion-basedatos.png)

### 7. Instalación y Configuración de Postman

Usaremos Postman para ver las peticiones y consultas que se realizan en la base de datos

Descarga y configura Postman, luego inicia sesión.
- [Página de descarga de Postman](https://www.postman.com/)

### 8. Configuración Final en el Proyecto de Github

Una vez estamos en el proyecto en nuestro editor de código hacemos lo siguiente:

- Vamos a la ruta del server e instalamos las dependencias necesarias (la instalación de bcrypt depende si no ejecuta el servidor)

```bash
cd server
npm install
npm install bcrypt
```

- Luego en otra terminal vamos a la ruta del client e instalamos las dependencias necesarias

```bash
cd client
npm install
```

- Después en nuestro proyecto clonado en la carpeta .env cambiamos las credenciales de la conexión por la que nosotros tenemos en nuestra base de datos (usuario postgres por defecto y password que configuramos)

![Configuración conexión](images/env.png)

### 9. Ejecución server y client

- En la terminal en la cual navegamos a la carpeta server lo ejecutamos
```bash
node index.js
```

- En la terminal en la cual navegamos a la carpeta client lo ejecutamos
```bash
npm start
```

- En la ventana de login escribimos lo siguiente

![Credenciales Login](images/credenciales-login.png)

```bash
Código UNI: 11111111
Contraseña: 11111111
```

Y luego de eso debe visualizarse la interfaz de entrada del estudiante

### 10. Creación de estudiantes en Postman

- Una vez en Postman podemos obtener los datos de los estudiantes

![Visualización datos estudiantes](images/postman1.png)

- Luego creamos un estudiante con la siguiente estructura y nos debe salir el código 201 HTTP

![Crear usuario](images/postman2.png)

- Posterior a eso volvemos a hacer la consulta en la base de datos donde se debe visualizar el último estudiante creado

![Estudiante registrado](images/postgresql1.png)

- Finalmente hacemos login con el Código UNI y Contraseña y debe ingresar al sistema

![Login éxito](images/loginfinal.png)

## Integrantes del Grupo y Rol en el Proyecto

- **Jonathan**: líder del proyecto y desarrollador backend/frontend
- **Khristie**: desarrollador backend
- **Sebastián**: administrador de base de datos
- **Orfeo**: desarrollador frontend