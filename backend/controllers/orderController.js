import * as orderService from "../service/orderService.js";

export const createOrder = async (req, res) => {
  try {
    const { items, direccionEnvio, datosContacto } = req.body;
    const usuarioId = req.user.id;

    if (!items || items.length === 0) {
      return res
        .status(400)
        .json({ error: "El pedido debe contener al menos un producto" });
    }

    const validatedItems = items.map((item) => {
      const precio =
        typeof item.precio === "string"
          ? parseFloat(item.precio)
          : Number(item.precio);
      const cantidad =
        typeof item.cantidad === "string"
          ? parseInt(item.cantidad)
          : Number(item.cantidad);

      if (isNaN(precio) || precio <= 0) {
        throw new Error(`Precio inválido para el producto: ${item.nombre}`);
      }
      if (isNaN(cantidad) || cantidad <= 0) {
        throw new Error(`Cantidad inválida para el producto: ${item.nombre}`);
      }

      return {
        ...item,
        precio,
        cantidad,
      };
    });

    const total = validatedItems.reduce(
      (sum, item) => sum + item.precio * item.cantidad,
      0
    );

    const orderData = {
      usuarioId,
      items: validatedItems,
      total,
      direccionEnvio,
      datosContacto,
      estado: "pendiente",
    };

    const order = await orderService.create(orderData);
    const populatedOrder = await orderService.getById(order._id);

    res.status(201).json(populatedOrder);
  } catch (error) {
    console.error("Error al crear orden:", error);
    res.status(500).json({
      error: "Error interno del servidor al crear la orden",
      message: error.message,
    });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await orderService.getById(id);

    if (!order) {
      return res.status(404).json({ error: "Orden no encontrada" });
    }

    // Verificar que el usuario sea el dueño de la orden o admin
    if (order.usuarioId._id.toString() !== req.user.id && !req.user.isAdmin) {
      return res
        .status(403)
        .json({ error: "No tienes permiso para ver esta orden" });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error("Error al obtener orden:", error);
    res.status(500).json({
      error: "Error interno del servidor al obtener la orden",
    });
  }
};

export const getOrdersByUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await orderService.getByUserId(userId);
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error al obtener órdenes:", error);
    res.status(500).json({
      error: "Error interno del servidor al obtener las órdenes",
    });
  }
};
