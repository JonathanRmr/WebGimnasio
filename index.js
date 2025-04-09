const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
require('dotenv').config()

const app = express();

// capturar body
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// Conexión a Base de datos

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.lgq5iiy.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority&appName=Cluster0`;
mongoose.connect(uri)
.then(() => console.log('Base de datos conectada'))
.catch(e => console.log('error db:', e))

  
// import routes

const authRoutes = require('./routes/auth')
const validateToken = require('./middlewares/validate-token')
const adminRoutes = require('./routes/admin')

const productRoutes = require('./routes/products');

// route middlewares
app.use('/api/user', authRoutes);
app.use('/api/admin',validateToken, adminRoutes);

app.use('/api/user', authRoutes);
app.use('/api/admin', validateToken, adminRoutes);
app.use('/api/products', productRoutes); // Nueva ruta para productos

app.get('/', (req, res) => {
    res.json({
        estado: true,
        mensaje: 'funciona!'
    })
});

// iniciar server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`servidor andando en: ${PORT}`)
})

