/**
 * Rutas para la gestión de productos.
 * Utiliza express.Router() para organizar los endpoints relacionados a productos.
 */

const express = require("express");
const fs = require("fs");
const path = require("path");
const {
  createProduct,
  updateProductById,
  deleteProductById,
  getAllProducts,
  getProductById,
} = require("../controllers/productController");

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
router.get("/", getAllProducts);

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
router.get("/:id", getProductById);

router.post("/", createProduct);

router.put("/:id", updateProductById);

router.delete("/:id", deleteProductById);

module.exports = router;
