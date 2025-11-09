/**
 * Rutas para la gestión de productos.
 * Utiliza express.Router() para organizar los endpoints relacionados a productos.
 */

import express from "express";
import {
  createProduct,
  updateProductById,
  deleteProductById,
  getAllProducts,
  getProductById,
  getProductImage,
} from "../controllers/productController.js";

// Importación de multer y asociados a multer
import multer from "multer";

// Configuración de multer

// Path donde se guardarán las imágenes
const storage = multer.memoryStorage();
const upload = multer({ storage });

export const productsRouter = express.Router();

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
productsRouter.get("/", getAllProducts);

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
productsRouter.get("/:id", getProductById);

productsRouter.get("/:id/imagen", getProductImage);

productsRouter.post("/", upload.single("imagen"), createProduct);

productsRouter.put("/:id", upload.single("imagen"), updateProductById);

productsRouter.delete("/:id", deleteProductById);
