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
 *     responses:
 *       201:
 *         description: Orden creada exitosamente
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
 *       404:
 *         description: Orden no encontrada
 */
ordersRouter.get("/:id", verifyToken, getOrderById);
