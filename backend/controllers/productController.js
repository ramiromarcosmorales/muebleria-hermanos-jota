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
    const {
      nombre,
      descripcion,
      altValue,
      precio,
      destacado,
      dimensiones,
      capacidad,
      estilo,
      material,
      garantia,
      origen,
      peso,
      color,
    } = req.body;

    const producto = {
      nombre: nombre,
      descripcion: descripcion,
      altValue: altValue,
      precio: precio,
      destacado: destacado,
      dimensiones: dimensiones,
      capacidad: capacidad,
      estilo: estilo,
      material: material,
      garantia: garantia,
      origen: origen,
      peso: peso,
      color: color,
    };

    if (req.file) {
      producto.imagen = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }

    const product = await productService.create(producto);
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
    const productData = { ...req.body };

    if (req.file) {
      productData.imagen = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }

    const updatedProduct = await productService.update(id, productData);

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

export const getProductImage = async (req, res) => {
  try {
    const producto = await productService.getById(req.params.id);
    if (!producto || !producto.imagen?.data) {
      return res.status(404).send("Imagen no encontrada");
    }

    res.set("Content-Type", producto.imagen.contentType);
    res.send(producto.imagen.data);
  } catch (error) {
    console.error("Error al obtener imagen:", error);
    res.status(500).send("Error interno del servidor");
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
