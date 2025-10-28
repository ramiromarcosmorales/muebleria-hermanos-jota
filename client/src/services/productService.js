import { getJSON } from "../utils/api.js";

const API_BASE = import.meta.env.VITE_API_BASE;

/**
 * Servicio centralizado para la comunicación con la API de productos
 * Maneja todas las operaciones CRUD relacionadas con productos
 */

/**
 * Obtiene todos los productos disponibles
 * @returns {Promise<Array>} Array de productos
 * @throws {Error} Error si falla la petición
 */
export const getAllProducts = async () => {
  try {
    const response = await getJSON("/api/productos");
    return response;
  } catch (error) {
    console.error("Error al obtener todos los productos:", error);
    throw new Error(
      "No se pudieron cargar los productos. Por favor, intentá nuevamente."
    );
  }
};

/**
 * Obtiene un producto específico por su ID
 * @param {string|number} id - ID del producto
 * @returns {Promise<Object>} Datos del producto
 * @throws {Error} Error si falla la petición o el producto no existe
 */
export const getProductById = async (id) => {
  try {
    if (!id) {
      throw new Error("ID del producto es requerido");
    }

    const response = await getJSON(`/api/productos/${id}`);
    return response;
  } catch (error) {
    console.error(`Error al obtener el producto con ID ${id}:`, error);
    throw new Error(
      "No se pudo cargar el producto. Verificá que el ID sea correcto."
    );
  }
};

/**
 * Crea un nuevo producto
 * @param {Object} productData - Datos del producto a crear
 * @returns {Promise<Object>} Producto creado
 * @throws {Error} Error si falla la creación
 */
export const createProduct = async (productData) => {
  try {
    if (!productData) {
      throw new Error("Los datos del producto son requeridos");
    }

    // TODO: Implementar cuando el endpoint esté disponible en el backend
    // const response = await fetch(`${API_BASE}/api/productos`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(productData),
    // });

    // if (!response.ok) {
    //   throw new Error(`Error en la creación: ${response.status}`);
    // }

    // return await response.json();

    console.log(
      "Función createProduct no implementada aún - datos recibidos:",
      productData
    );
    throw new Error(
      "La funcionalidad de crear productos aún no está implementada en el backend"
    );
  } catch (error) {
    console.error("Error al crear el producto:", error);
    throw new Error(
      "No se pudo crear el producto. Por favor, intentá nuevamente."
    );
  }
};

/**
 * Elimina un producto por su ID
 * @param {string|number} id - ID del producto a eliminar
 * @returns {Promise<Object>} Confirmación de eliminación
 * @throws {Error} Error si falla la eliminación
 */
export const deleteProduct = async (id) => {
  try {
    if (!id) {
      throw new Error("ID del producto es requerido");
    }

    // TODO: Implementar cuando el endpoint esté disponible en el backend
    // const response = await fetch(`${API_BASE}/api/productos/${id}`, {
    //   method: 'DELETE',
    // });

    // if (!response.ok) {
    //   throw new Error(`Error en la eliminación: ${response.status}`);
    // }

    // return await response.json();

    console.log("Función deleteProduct no implementada aún - ID:", id);
    throw new Error(
      "La funcionalidad de eliminar productos aún no está implementada en el backend"
    );
  } catch (error) {
    console.error(`Error al eliminar el producto con ID ${id}:`, error);
    throw new Error(
      "No se pudo eliminar el producto. Por favor, intentá nuevamente."
    );
  }
};

/**
 * Actualiza un producto existente
 * @param {string|number} id - ID del producto a actualizar
 * @param {Object} productData - Nuevos datos del producto
 * @returns {Promise<Object>} Producto actualizado
 * @throws {Error} Error si falla la actualización
 */
export const updateProduct = async (id, productData) => {
  try {
    if (!id) {
      throw new Error("ID del producto es requerido");
    }

    if (!productData) {
      throw new Error("Los datos del producto son requeridos");
    }

    // TODO: Implementar cuando el endpoint esté disponible en el backend
    // const response = await fetch(`${API_BASE}/api/productos/${id}`, {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(productData),
    // });

    // if (!response.ok) {
    //   throw new Error(`Error en la actualización: ${response.status}`);
    // }

    // return await response.json();

    console.log(
      "Función updateProduct no implementada aún - ID:",
      id,
      "Datos:",
      productData
    );
    throw new Error(
      "La funcionalidad de actualizar productos aún no está implementada en el backend"
    );
  } catch (error) {
    console.error(`Error al actualizar el producto con ID ${id}:`, error);
    throw new Error(
      "No se pudo actualizar el producto. Por favor, intentá nuevamente."
    );
  }
};
