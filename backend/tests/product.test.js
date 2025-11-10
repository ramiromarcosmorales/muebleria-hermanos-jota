import request from "supertest";
import { describe, test, beforeEach, expect, jest } from "@jest/globals";
import { mockProduct } from "./setup.js";

// Importar app después de configurar los mocks
import { app } from "../app.js";

describe("API de Productos", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("GET /api/productos debe responder con status 200 y un JSON con el array de productos", async () => {
    const mockProducts = [
      {
        _id: "507f1f77bcf86cd799439011",
        nombre: "Producto 1",
        descripcion: "Descripción 1",
        precio: 100,
        imagenUrl: "/images/test.jpg",
        altValue: "Test",
        destacado: false,
        dimensiones: "10x10x10",
        capacidad: "10kg",
        estilo: "Moderno",
        material: "Madera",
        garantia: "1 año",
        origen: "Argentina",
        peso: 10,
        color: "Blanco",
      },
    ];

    // Mock de Product.find() para devolver productos
    mockProduct.find.mockReturnValue({
      select: jest.fn().mockResolvedValue(mockProducts),
    });

    const res = await request(app)
      .get("/api/productos")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test("GET /api/productos/:id debe responder con status 200 y un JSON con el objeto del producto", async () => {
    const mockProductId = "507f1f77bcf86cd799439011";
    const mockProductData = {
      _id: mockProductId,
      nombre: "Producto Test",
      descripcion: "Descripción del producto",
      precio: 100,
      imagenUrl: "/images/test.jpg",
      altValue: "Test",
      destacado: false,
      dimensiones: "10x10x10",
      capacidad: "10kg",
      estilo: "Moderno",
      material: "Madera",
      garantia: "1 año",
      origen: "Argentina",
      peso: 10,
      color: "Blanco",
    };

    // Mock de Product.findById() para devolver un producto
    mockProduct.findById.mockResolvedValue(mockProductData);

    const res = await request(app)
      .get(`/api/productos/${mockProductId}`)
      .expect("Content-Type", /json/)
      .expect(200);

    expect(res.body).toHaveProperty("_id", mockProductId);
    expect(res.body.nombre).toBe(mockProductData.nombre);
  });

  test("GET /api/productos/:id debe responder con status 404 cuando el producto no existe", async () => {
    const invalidId = "507f1f77bcf86cd799439999"; // ID válido pero no existente

    // Mock de Product.findById() para devolver null (producto no encontrado)
    mockProduct.findById.mockResolvedValue(null);

    const res = await request(app)
      .get(`/api/productos/${invalidId}`)
      .expect(404);

    expect(res.body).toEqual(
      expect.objectContaining({ error: "Producto no encontrado" })
    );
  });

  test("GET /api/productos/:id debe responder con status 500 cuando el ID es inválido", async () => {
    const invalidId = "1"; // ID inválido (no es ObjectId de 24 caracteres)

    // Mock de Product.findById() para lanzar un error de cast
    const castError = new Error("Cast to ObjectId failed");
    castError.name = "CastError";
    castError.kind = "ObjectId";

    mockProduct.findById.mockRejectedValue(castError);

    const res = await request(app)
      .get(`/api/productos/${invalidId}`)
      .expect(500);

    expect(res.body).toHaveProperty("error");
  });
});
