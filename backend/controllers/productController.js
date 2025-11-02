import * as productService from "../service/productService.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAll();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({
      error: "Error interno del servidor al obtener productos",
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productService.getById(id);

    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Error al obtener producto:", error);
    res.status(500).json({
      error: "Error interno del servidor al obtener el producto",
    });
  }
};

export const createProduct = async (req, res) => {
  try {
    const product = await productService.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    console.error("Error al crear producto:", error);
    if (error.details) {
      res.status(400).json({ message: error.message, errors: error.details });
    } else {
      res.status(500).json({
        error: "Error interno del servidor al crear el producto",
      });
    }
  }
};

export const updateProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await productService.update(id, req.body);

    if (!updatedProduct) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    if (error.details) {
      res.status(400).json({ message: error.message, errors: error.details });
    } else {
      res.status(500).json({
        error: "Error interno del servidor al actualizar el producto",
      });
    }
  }
};

export const deleteProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await productService.remove(id);

    if (!deletedProduct) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.status(200).json({
      message: "Producto eliminado exitosamente",
      product: deletedProduct,
    });
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    res.status(500).json({
      error: "Error interno del servidor al eliminar el producto",
    });
  }
};
