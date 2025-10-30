export const errorHandler = (err, req, res, next) => {
  // Si no tiene statusCode, asumimos que es 500
  const status = err.statusCode || 500;

  console.error({ status, message: err.message, stack: err.stack });

  res.status(status).json({
    success: false,
    error: {
      // Si el error tiene message lo mostramos, sino uno generico
      message:
        err.message ||
        (status === 500 ? "Error interno del servidor" : "Error"),
      code: err.code || (status == 500 ? "INTERNAL_ERROR" : "ERROR"),
    },
  });
};
