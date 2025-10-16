const express = require("express");
require("dotenv").config();
const cors = require("cors");

// Importación de middlewares y utilidades
const logger = require("./middleware/logger.js");
const requestCounter = require("./middleware/request.js");
const notFound = require("./middleware/notFound.js");
const errorHandler = require("./middleware/errorHandler.js");

// Importación de Swagger para documentación interactiva
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

// Inicialización de la app de Express
const app = express();

// Middlewares globales
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: "GET",
  })
);
app.use(express.json()); // Permite recibir JSON en las peticiones
app.use(logger.log); // Middleware personalizado para logs
app.use(requestCounter);

// Documentación Swagger disponible en /api/docs
app.use(
  "/api/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customCssUrl: "https://unpkg.com/swagger-ui-dist/swagger-ui.css",
    customJs: [
      "https://unpkg.com/swagger-ui-dist/swagger-ui-bundle.js",
      "https://unpkg.com/swagger-ui-dist/swagger-ui-standalone-preset.js",
    ],
  })
);

/**
 * Importa y conecta el router de productos.
 * Todas las rutas relacionadas a productos están centralizadas en routes/products.js
 * Esto mantiene el código modular y fácil de mantener.
 */
const productsRouter = require("./routes/products");
app.use("/api/productos", productsRouter);

const statusRouter = require("./routes/status.js");
app.use("/api/status", statusRouter);

//404 handler
app.use(notFound);

//Error handler
app.use(errorHandler);

module.exports = app;
