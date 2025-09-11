const express = require("express");
require("dotenv").config();

// Middleware imports
const logger = require("./middleware/logger.js").logger;

const app = express();
const PORT = process.env.PORT;

// Global middlewares
app.use(express.json());
app.use(logger);

// Routes

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
