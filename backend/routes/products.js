/**
 * Rutas para la gestión de productos.
 * Utiliza express.Router() para organizar los endpoints relacionados a productos.
 */

import express from "express";
import { createProduct } from "../controllers/productController.js";
import { updateProductById } from "../controllers/productController.js";
import { deleteProductById } from "../controllers/productController.js";
import { getAllProducts } from "../controllers/productController.js";
import { getProductById } from "../controllers/productController.js";

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

productsRouter.post("/", createProduct);

productsRouter.put("/:id", updateProductById);

productsRouter.delete("/:id", deleteProductById);
