import express from "express";
import "dotenv/config";
import cors from "cors";

// Importación de middlewares y utilidades
import { log } from "./middleware/logger.js";
import { requestCounter } from "./middleware/request.js";
import { notFound } from "./middleware/notFound.js";
import { errorHandler } from "./middleware/errorHandler.js";

// Importación de Swagger para documentación interactiva
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger.js";

// Conexión con MongoDB usando Mongoose
import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

await mongoose
  .connect(MONGO_URI)
  .then(() => console.log("¡Conexión exitosa a MongoDB!"))
  .catch((err) => console.error("Error al conectar a MongoDB:", err));

// Inicialización de la app de Express
export const app = express();

// Middlewares globales
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: "GET",
  })
);
app.use(express.json()); // Permite recibir JSON en las peticiones
app.use(log); // Middleware personalizado para logs
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
import { productsRouter } from "./routes/products.js";
app.use("/api/productos", productsRouter);

import { statusRouter } from "./routes/status.js";
app.use("/api/status", statusRouter);

//404 handler
app.use(notFound);

//Error handler
app.use(errorHandler);
