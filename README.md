# WebGimnasio

# Diario de Entrenamiento Deportivo 🏋️‍♀️

API RESTful para registrar, visualizar y administrar entrenamientos deportivos diarios. Desarrollada con Node.js, Express y MongoDB. Autenticación segura con JWT.

## 📦 Características actuales

- Registro y login de usuarios
- Autenticación mediante JSON Web Tokens (JWT)
- Middleware de protección para rutas privadas
- CRUD completo de entrenamientos:
  - Crear entrenamiento
  - Listar entrenamientos del usuario autenticado
  - Actualizar entrenamiento
  - Eliminar entrenamiento
- Asociación de entrenamientos con cada usuario
- Pruebas realizadas con Postman
- Base de datos MongoDB Atlas

## 📁 Estructura del proyecto

. ├── index.js ├── .env ├── models/ │ ├── User.js │ └── Workout.js ├── routes/ │ ├── auth.js │ ├── private.js │ └── workouts.js ├── middlewares/ │ └── verifyToken.js ├── validations/ │ └── userValidation.js



## 🚀 Instalación y ejecución

1. Clona el repositorio
2. Instala las dependencias
npm install

3. Crea un archivo .env con el siguiente contenido:

PORT=3001
MONGO_URI=mongodb://localhost:27017/webgimnasio
TOKEN_SECRET=supersecreto

4. Inicia el servidor
   npm run dev

🧪 Pruebas con Postman

Registro de usuario: POST /api/user/register
Login de usuario: POST /api/user/login → devuelve token
Dashboard privado: GET /api/private/dashboard (requiere header auth-token)
Entrenamientos:
Crear: POST /api/user/workout
Listar: GET /api/user/workout
Actualizar: PUT /api/user/workout/:id
Eliminar: DELETE /api/user/workout/:id


Todas las rutas de entrenamiento requieren el header auth-token con el token válido del usuario autenticado.


✅ Próximas funcionalidades

Filtrar entrenamientos por fecha o tipo
Establecer metas personales
Visualizar progreso con gráficas (Chart.js)
Autenticación con OAuth2.0
Despliegue en Vercel y MongoDB Atlas

📘 Documentación de la API con Swagger

Esta API cuenta con documentación interactiva generada automáticamente usando Swagger UI.

📍 Acceso
Una vez el servidor esté corriendo, puedes acceder a la documentación desde:

http://localhost:3001/api-docs
📦 Instalación necesaria
Swagger está configurado en el archivo swagger.js. Asegúrate de tener instalados estos paquetes:

npm install swagger-jsdoc swagger-ui-express



