const router = require('express').Router();
const verifyToken = require('../middlewares/verifyToken');

/**
 * @swagger
 * /api/private/dashboard:
 *   get:
 *     summary: Acceso al panel privado (requiere autenticación)
 *     tags: [Private]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Acceso exitoso al panel privado
 *       401:
 *         description: Token no proporcionado o inválido
 */
router.get('/dashboard', verifyToken, (req, res) => {
  res.json({
    mensaje: 'Bienvenido al panel privado',
    user: req.user 
  });
});

module.exports = router;
