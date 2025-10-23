const fs = require("fs");
const path = require("path");

async function getAllProducts(req, res) {
  // Ruta al archivo de productos
  const productsPath = path.join(__dirname, "..", "data", "products.json");

  // Leer el archivo de productos
  fs.readFile(productsPath, "utf8", (err, data) => {
    if (err) {
      // Error al leer el archivo
      return res.status(500).json({ error: "Error al leer productos" });
    }
    // Enviar la lista de productos como JSON
    res.json(JSON.parse(data));
  });
}

async function getProductById(req, res) {
  // Ruta al archivo de productos
  const productsPath = path.join(__dirname, "..", "data", "products.json");

  // Leer el archivo de productos
  fs.readFile(productsPath, "utf8", (err, data) => {
    if (err) {
      // Error al leer el archivo
      return res.status(500).json({ error: "Error al leer productos" });
    }

    // Convertir el contenido a objeto
    const productos = JSON.parse(data);

    // Buscar el producto por ID (comparando como string)
    const producto = productos.find((p) => String(p.id) === req.params.id);

    if (!producto) {
      // Si no se encuentra el producto, devolver 404
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    // Enviar el producto encontrado como JSON
    res.json(producto);
  });
}

async function createProduct(req, res) {}

async function updateProductById(req, res) {}

async function deleteProductById(req, res) {}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProductById,
  deleteProductById,
};
