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

/**
 * @swagger
 * /api/productos/{id}/imagen:
 *   get:
 *     summary: Obtiene la imagen de un producto
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
 *         description: Imagen del producto
 *         content:
 *           image/*:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: Producto o imagen no encontrada
 *       500:
 *         description: Error interno del servidor
 */
productsRouter.get("/:id/imagen", getProductImage);

/**
 * @swagger
 * /api/productos:
 *   post:
 *     summary: Crea un nuevo producto
 *     tags: [Productos]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - descripcion
 *               - precio
 *               - imagen
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               precio:
 *                 type: number
 *               imagen:
 *                 type: string
 *                 format: binary
 *               altValue:
 *                 type: string
 *               destacado:
 *                 type: boolean
 *               dimensiones:
 *                 type: string
 *               capacidad:
 *                 type: string
 *               estilo:
 *                 type: string
 *               material:
 *                 type: string
 *               garantia:
 *                 type: string
 *               origen:
 *                 type: string
 *               peso:
 *                 type: number
 *               color:
 *                 type: string
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 *       400:
 *         description: Error de validación
 *       500:
 *         description: Error interno del servidor
 */
productsRouter.post("/", upload.single("imagen"), createProduct);

/**
 * @swagger
 * /api/productos/{id}:
 *   put:
 *     summary: Actualiza un producto existente
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               precio:
 *                 type: number
 *               imagen:
 *                 type: string
 *                 format: binary
 *               altValue:
 *                 type: string
 *               destacado:
 *                 type: boolean
 *               dimensiones:
 *                 type: string
 *               capacidad:
 *                 type: string
 *               estilo:
 *                 type: string
 *               material:
 *                 type: string
 *               garantia:
 *                 type: string
 *               origen:
 *                 type: string
 *               peso:
 *                 type: number
 *               color:
 *                 type: string
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error interno del servidor
 */
productsRouter.put("/:id", upload.single("imagen"), updateProductById);

/**
 * @swagger
 * /api/productos/{id}:
 *   delete:
 *     summary: Elimina un producto por su ID
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
 *         description: Producto eliminado exitosamente
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error interno del servidor
 */
productsRouter.delete("/:id", deleteProductById);
