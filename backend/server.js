const app = require('./app');

// Inicialización de la app de Express
const PORT = process.env.PORT || 3001;

// Levanta el servidor en el puerto especificado
/*
Vercel ejecuta en modo serverless function, entonces 
no permite levantar un servidor, por eso se procede a crear 
un condicional para evitar que vercel levante el servidor.
*/
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}

module.exports = (req, res) => app(req, res);