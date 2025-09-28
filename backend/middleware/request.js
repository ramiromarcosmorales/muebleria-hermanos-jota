let count = 0;

const requestCounter = (req, res, next) => {
    count++;
    req.app.set('requestCount', count);
    next();
}

module.exports = requestCounter;