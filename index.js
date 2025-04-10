const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
require('dotenv').config()
const { swaggerUi, specs } = require('./swagger'); // Ajusta la ruta si está en carpeta

const app = express();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


// capturar body
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// Conexión a Base de datos
const uri = process.env.MONGO_URI;
mongoose.connect(uri)
  .then(() => console.log('Base de datos conectada'))
  .catch(e => console.log('error db:', e))

// import routes
const authRoutes = require('./routes/auth');
const privateRoutes = require('./routes/private');
const workoutRoutes = require('./routes/workout');

// route middlewares
app.use('/api/user', authRoutes);
app.use('/api/private', privateRoutes);
app.use('/api/workout', workoutRoutes);

// ruta raíz
app.get('/', (req, res) => {
  res.json({
    estado: true,
    mensaje: 'funciona!'
  });
});

// iniciar server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`servidor andando en: ${PORT}`)
});
