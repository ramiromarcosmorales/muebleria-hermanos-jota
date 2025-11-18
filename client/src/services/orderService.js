import { postJSON, getJSON } from "../utils/api";

export async function createOrder(orderData) {
  try {
    const order = await postJSON("/api/ordenes", orderData, true);
    return order;
  } catch (error) {
    console.error("Error al crear la orden:", error);
    throw new Error(
      `Error al crear la orden: ${error.message || "Error desconocido"}`
    );
  }
}

export async function getOrderById(id) {
  try {
    const order = await getJSON(`/api/ordenes/${id}`, true);
    return order;
  } catch (error) {
    console.error("Error al obtener la orden:", error);
    throw new Error(
      `Error al obtener la orden: ${error.message || "Error desconocido"}`
    );
  }
}

export async function getOrdersByUser() {
  try {
    const orders = await getJSON("/api/ordenes/usuario", true);
    return orders;
  } catch (error) {
    console.error("Error al obtener las órdenes:", error);
    throw new Error(
      `Error al obtener las órdenes: ${error.message || "Error desconocido"}`
    );
  }
}
