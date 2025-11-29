import { getJSON, postFormData, deleteJSON, putFormData } from "../utils/api";

export async function getAllProducts() {
  try {
    const productos = await getJSON("/api/productos");
    return productos;
  } catch (error) {
    console.error("Error al obtener productos:", error);
    throw new Error(
      `Error al cargar productos: ${error.message || "Error desconocido"}`
    );
  }
}

export async function getProductById(id) {
  try {
    const producto = await getJSON(`/api/productos/${id}`);
    return producto;
  } catch (error) {
    console.error("Error al obtener producto:", error);
    throw new Error(
      `Error al cargar el producto: ${error.message || "Error desconocido"}`
    );
  }
}

export async function createProduct(data) {
  try {
    const producto = await postFormData("/api/productos", data);
    return producto;
  } catch (error) {
    console.error("Error al crear producto:", error);
    throw new Error(
      `Error al crear producto: ${error.message || "Error desconocido"}`
    );
  }
}

export async function deleteProduct(id) {
  try {
    const respuesta = await deleteJSON(`/api/productos/${id}`);
    return respuesta;
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    throw new Error(
      `Error al eliminar producto: ${error.message || "Error desconocido"}`
    );
  }
}

export async function updateProduct(id, data) {
  try {
    const producto = await putFormData(`/api/productos/${id}`, data);
    return producto;
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    throw new Error(
      `Error al actualizar producto: ${error.message || "Error desconocido"}`
    );
  }
}
