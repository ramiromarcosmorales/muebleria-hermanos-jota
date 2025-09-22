/**
 * Rutas para la gestión de productos.
 * Utiliza express.Router() para organizar los endpoints relacionados a productos.
 */

const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

/**
 * @swagger
 * /api/productos:
 *   get:
 *     summary: Obtiene la lista completa de productos
 *     tags: [Productos]
 *     responses:
 *       200:
 *         description: Lista de productos
 */
router.get('/', (req, res) => {
  // Ruta al archivo de productos
  const productsPath = path.join(__dirname, '..', 'data', 'products.json');

  // Leer el archivo de productos
  fs.readFile(productsPath, 'utf8', (err, data) => {
    if (err) {
      // Error al leer el archivo
      return res.status(500).json({ error: 'Error al leer productos' });
    }
    // Enviar la lista de productos como JSON
    res.json(JSON.parse(data));
  });
});

/**
 * @swagger
 * /api/productos/{id}:
 *   get:
 *     summary: Obtiene un producto por su ID
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto encontrado
 *       404:
 *         description: Producto no encontrado
 */
router.get('/:id', (req, res) => {
  // Ruta al archivo de productos
  const productsPath = path.join(__dirname, '..', 'data', 'products.json');

  // Leer el archivo de productos
  fs.readFile(productsPath, 'utf8', (err, data) => {
    if (err) {
      // Error al leer el archivo
      return res.status(500).json({ error: 'Error al leer productos' });
    }

    // Convertir el contenido a objeto
    const productos = JSON.parse(data);

    // Buscar el producto por ID (comparando como string)
    const producto = productos.find(p => String(p.id) === req.params.id);

    if (!producto) {
      // Si no se encuentra el producto, devolver 404
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    // Enviar el producto encontrado como JSON
    res.json(producto);
  });
});

module.exports = router;