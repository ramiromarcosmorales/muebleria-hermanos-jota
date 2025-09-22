const notFound = (req, res, next) => {
    res.status(404).json({
        success: false,
        error: {
            message: "Ruta no encontrada",
            code: "ROUTE_NOT_FOUND"
        }
    });
};

module.exports = notFound;