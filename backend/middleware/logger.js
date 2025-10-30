export function log(req, res, next) {
  console.log(`Petición Recibida: ${req.method} en la ruta ${req.originalUrl}`);
  next();
}
