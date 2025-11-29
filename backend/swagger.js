import path from "path";
import swaggerJSDoc from "swagger-jsdoc";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Productos - Mueblería Hermanos Jota",
      version: "1.0.0",
      description: "Documentación de la API de productos",
    },
    servers: [
      {
        url: "https://muebleria-hermanos-jota-backend.vercel.app",
        description: "Producción",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Ingresa el token JWT obtenido al hacer login",
        },
      },
    },
  },
  apis: [
    path.join(__dirname, "routes", "products.js"),
    path.join(__dirname, "routes", "status.js"),
    path.join(__dirname, "routes", "orders.js"),
    path.join(__dirname, "routes", "authentication.js"),
  ],
};

export const swaggerSpec = swaggerJSDoc(options);
