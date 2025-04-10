const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Diario de Entrenamiento Deportivo',
      version: '1.0.0',
      description: 'API para registrar, visualizar y analizar entrenamientos diarios',
    },
    servers: [
      {
        url: 'http://localhost:3001',
      },
    ],
  },
  apis: ['./routes/*.js'], // Aquí Swagger buscará anotaciones
};

const specs = swaggerJsDoc(options);

module.exports = {
  swaggerUi,
  specs
};
