const Product = require('../models/Product');

// Obtener todos los productos (acceso público)
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
};

//Crear producto (acceso público)
exports.createProduct = async (req, res) => {
    const { name, description, quantity, minStock } = req.body;
    
    try {
      const product = new Product({
        name,
        description,
        quantity,
        minStock
      });
      
      await product.save();
      res.status(201).json(product);
    } catch (err) {
      res.status(400).json({ error: 'Error al crear producto' });
    }
  };

// Obtener producto por ID (acceso público)
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener producto' });
  }
};

// Actualizar inventario (requiere autenticación)
exports.updateInventory = async (req, res) => {
  const { operation, quantity } = req.body;
  
  if (!['entrada', 'salida'].includes(operation)) {
    return res.status(400).json({ error: 'Operación no válida' });
  }
  
  if (quantity <= 0) {
    return res.status(400).json({ error: 'Cantidad debe ser mayor a cero' });
  }

  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });

    if (operation === 'entrada') {
      product.quantity += quantity;
    } else if (operation === 'salida') {
      if (product.quantity - quantity < product.minStock) {
        return res.status(400).json({ 
          error: 'Stock insuficiente',
          currentStock: product.quantity,
          minStock: product.minStock
        });
      }
      product.quantity -= quantity;
    }

    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar inventario' });
  }
};