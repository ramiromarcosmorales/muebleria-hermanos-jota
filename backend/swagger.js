const swaggerJSDoc = require("swagger-jsdoc");

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
        url: "https://muebleria-hermanos-jota.onrender.com",
        description: "Servidor local",
      },
    ],
  },
  apis: ["./routes/products.js", "./routes/status.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
