let count = 0;

export const requestCounter = (req, res, next) => {
  count++;
  req.app.set("requestCount", count);
  next();
};
