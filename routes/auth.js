const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../validations/userValidation'); 
const verifyToken = require('../middlewares/verifyToken');



// REGISTRO
router.post('/register', async (req, res) => {
  // Validar datos
  const { error } = registerValidation(req.body); 
  if (error) return res.status(400).json({ error: error.details[0].message });

  // Validar si el correo ya existe
  const isEmailExist = await User.findOne({ email: req.body.email });
  if (isEmailExist) return res.status(400).json({ error: 'Correo ya registrado' });

  // Hash contraseña
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);

  // Crear usuario
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password
  });

  try {
    const savedUser = await user.save();
    res.json({
      error: null,
      data: savedUser._id
    });
  } catch (error) {
    res.status(400).json({ error });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  // Validar entrada
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  // Buscar usuario
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json({ error: 'Email no encontrado' });

  // Comparar contraseñas
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).json({ error: 'Contraseña incorrecta' });

  // Crear y asignar token
  const token = jwt.sign(
    { _id: user._id, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.header('auth-token', token).json({
    error: null,
    data: {
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    }
  });
});

module.exports = router;
