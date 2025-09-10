const express = require("express");

// Middleware imports
const logger = require("./middleware/logger.js").logger;

const app = express();
const PORT = 3001;

// Global middlewares
app.use(express.json());
app.use(logger);

// Routes

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
