const app = require('./app');

// Inicialización de la app de Express
const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Levanta el servidor en el puerto especificado
app.listen(PORT, () => {
  if (NODE_ENV === 'production') {
    console.log("Servidor iniciado en producción");
  } else {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  }
});