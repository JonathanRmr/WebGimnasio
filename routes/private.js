const router = require('express').Router();
const verifyToken = require('../middlewares/verifyToken');

router.get('/dashboard', verifyToken, (req, res) => {
  res.json({
    mensaje: 'Bienvenido al panel privado',
    user: req.user 
  });
});

module.exports = router;
