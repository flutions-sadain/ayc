module.exports = (req, res, next) => {
    if (req.method === 'POST' && req.path === '/uploadFile') {
      res.json({ message: 'Data successfully submitted' });
    } else {
      // Call next() to pass the request to the next middleware
      next();
    }
  };
  