const express = require("express");

// Middleware imports
const logger = require("./middleware/logger.js");

const app = express();
const PORT = 3001;

// Global middlewares
app.use(express.json());
app.use(logger.log);

// Routes

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
