import express from "express";
import {
  createOrder,
  getOrderById,
  getOrdersByUser,
} from "../controllers/orderController.js";
import { verifyToken } from "../middleware/auth.js";

export const ordersRouter = express.Router();

/**
 * @swagger
 * /api/ordenes:
 *   post:
 *     summary: Crea una nueva orden
 *     tags: [Órdenes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - items
 *               - direccionEnvio
 *               - datosContacto
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productoId:
 *                       type: string
 *                     nombre:
 *                       type: string
 *                     precio:
 *                       type: number
 *                     cantidad:
 *                       type: number
 *                     imagenUrl:
 *                       type: string
 *               direccionEnvio:
 *                 type: object
 *                 properties:
 *                   calle:
 *                     type: string
 *                   numero:
 *                     type: string
 *                   ciudad:
 *                     type: string
 *                   codigoPostal:
 *                     type: string
 *                   provincia:
 *                     type: string
 *               datosContacto:
 *                 type: object
 *                 properties:
 *                   nombre:
 *                     type: string
 *                   telefono:
 *                     type: string
 *                   email:
 *                     type: string
 *     responses:
 *       201:
 *         description: Orden creada exitosamente
 *       400:
 *         description: Error de validación
 *       500:
 *         description: Error interno del servidor
 */
ordersRouter.post("/", verifyToken, createOrder);

/**
 * @swagger
 * /api/ordenes/usuario:
 *   get:
 *     summary: Obtiene todas las órdenes del usuario autenticado
 *     tags: [Órdenes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de órdenes del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       401:
 *         description: No autenticado
 *       500:
 *         description: Error interno del servidor
 */
ordersRouter.get("/usuario", verifyToken, getOrdersByUser);

/**
 * @swagger
 * /api/ordenes/{id}:
 *   get:
 *     summary: Obtiene una orden por su ID
 *     tags: [Órdenes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la orden
 *     responses:
 *       200:
 *         description: Orden encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       403:
 *         description: No tienes permiso para ver esta orden
 *       404:
 *         description: Orden no encontrada
 *       500:
 *         description: Error interno del servidor
 */
ordersRouter.get("/:id", verifyToken, getOrderById);
