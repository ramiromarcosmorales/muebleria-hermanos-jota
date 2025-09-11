const express = require("express");
require("dotenv").config();

// Middleware imports
const logger = require("./middleware/logger.js");

const app = express();
const PORT = process.env.PORT;

// Global middlewares
app.use(express.json());
app.use(logger.log);

// Routes

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
