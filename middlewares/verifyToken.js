const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.header('auth-token'); 
  if (!token) return res.status(401).json({ error: 'Acceso denegado' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET); 
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: 'Token no válido' });
  }
};

module.exports = verifyToken;
