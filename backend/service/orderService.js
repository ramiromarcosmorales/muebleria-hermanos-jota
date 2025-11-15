import { Order } from "../models/Orders.js";

export const create = async (orderData) => {
  const newOrder = new Order(orderData);
  return await newOrder.save();
};

export const getById = async (id) => {
  return await Order.findById(id).populate(
    "usuarioId",
    "nombreDeUsuario correoElectronico"
  );
};

export const getByUserId = async (userId) => {
  return await Order.find({ usuarioId: userId })
    .populate("usuarioId", "nombreDeUsuario correoElectronico")
    .sort({ createdAt: -1 });
};
