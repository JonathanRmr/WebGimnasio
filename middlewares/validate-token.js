// 

const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.header('auth-token') || req.query.token;
  
  if (!token) {
    return res.status(401).json({ 
      error: 'Acceso denegado',
      message: 'Se requiere token de autenticación'
    });
  }
  
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({
      error: 'Token no válido',
      details: error.message
    });
  }
};

module.exports = verifyToken;