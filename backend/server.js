const express = require("express");
require("dotenv").config();

// Importación de middlewares y utilidades
const logger = require("./middleware/logger.js");

// Importación de Swagger para documentación interactiva
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

// Inicialización de la app de Express
const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares globales
app.use(express.json());      // Permite recibir JSON en las peticiones
app.use(logger.log);          // Middleware personalizado para logs

// Documentación Swagger disponible en /api/docs
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * Importa y conecta el router de productos.
 * Todas las rutas relacionadas a productos están centralizadas en routes/products.js
 * Esto mantiene el código modular y fácil de mantener.
 */
const productsRouter = require('./routes/products');
app.use('/api/productos', productsRouter);

// Levanta el servidor en el puerto especificado
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
