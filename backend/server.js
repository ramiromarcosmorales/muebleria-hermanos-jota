const app = require('./app');

// Inicialización de la app de Express
const PORT = process.env.PORT || 3001;

// Levanta el servidor en el puerto especificado
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});