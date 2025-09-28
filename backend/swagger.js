const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Productos - Mueblería Hermanos Jota',
      version: '1.0.0',
      description: 'Documentación de la API de productos',
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Servidor local',
      },
    ],
  },
  apis: ['./routes/products.js', './routes/status.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;