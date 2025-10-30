import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getAllProducts = async (req, res) => {
  // Ruta al archivo de productos
  const productsPath = path.join(__dirname, "..", "data", "products.json");

  try {
    // Leer el archivo de productos
    const data = await fs.readFile(productsPath, "utf8");
    console.log(JSON.parse(data));

    // Enviar la lista de productos como JSON
    res.json(JSON.parse(data));
  } catch (error) {
    // Error al leer el archivo o al parsear el JSON
    return res.status(500).json({ error: "Error al leer productos" });
  }
};

export const getProductById = async (req, res) => {
  // Ruta al archivo de productos
  const productsPath = path.join(__dirname, "..", "data", "products.json");

  try {
    // 1. Lectura del archivo (con await)
    const data = await fs.readFile(productsPath, "utf8");

    // 2. Convertir el contenido a objeto (dentro del try para manejar error de JSON.parse)
    const productos = JSON.parse(data);

    // 3. Buscar el producto por ID
    const producto = productos.find((p) => String(p.id) === req.params.id);

    // 4. Manejo de producto no encontrado (IF, no requiere catch)
    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    // 5. Enviar el producto
    res.json(producto);
  } catch (error) {
    // Este catch manejará:
    // a) Errores de lectura del archivo (fs.readFile)
    // b) Errores al parsear el JSON (JSON.parse)
    console.error("Error en la operación:", error);
    return res
      .status(500)
      .json({ error: "Error interno al procesar productos" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const product = await productService.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    if (err.details) {
      res.status(400).json({ message: err.message, errors: err.details });
    } else {
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }
};

export const updateProductById = async (req, res) => {};

export const deleteProductById = async (req, res) => {};
