import request from "supertest";
import { describe, test, beforeEach, expect, jest } from "@jest/globals";
import { mockProduct, mockSave } from "./setup.js";

import { app } from "../app.js";

describe("API de Productos", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockProductId = "507f1f77bcf86cd799439011";
  const mockProductData = {
    _id: mockProductId,
    nombre: "Producto Test de Longitud Suficiente",
    descripcion:
      "Esta es una descripción lo suficientemente larga para pasar la validación del backend que requiere al menos 10 caracteres.",
    precio: 100,
    imagenUrl: "/images/test.jpg",
    altValue: "Texto alternativo válido",
    destacado: false,
    dimensiones: "10x10x10 cm",
    capacidad: "10kg de capacidad",
    estilo: "Estilo Moderno Válido",
    material: "Madera de buena calidad",
    garantia: "1 año de garantía oficial",
    origen: "Industria Argentina",
    peso: 10,
    color: "Blanco Mate",
  };

  test("GET /api/productos debe responder con status 200 y un JSON con el array de productos", async () => {
    mockProduct.find.mockReturnValue({
      select: jest.fn().mockResolvedValue([mockProductData]),
    });

    const res = await request(app)
      .get("/api/productos")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test("GET /api/productos/:id debe responder con status 200 y un JSON con el objeto del producto", async () => {
    mockProduct.findById.mockResolvedValue(mockProductData);

    const res = await request(app)
      .get(`/api/productos/${mockProductId}`)
      .expect("Content-Type", /json/)
      .expect(200);

    expect(res.body).toHaveProperty("_id", mockProductId);
    expect(res.body.nombre).toBe(mockProductData.nombre);
  });

  test("GET /api/productos/:id debe responder con status 404 cuando el producto no existe", async () => {
    const invalidId = "507f1f77bcf86cd799439999";
    mockProduct.findById.mockResolvedValue(null);

    const res = await request(app)
      .get(`/api/productos/${invalidId}`)
      .expect(404);

    expect(res.body).toEqual(
      expect.objectContaining({ error: "Producto no encontrado" })
    );
  });

  test("GET /api/productos/:id debe responder con status 500 cuando el ID es inválido", async () => {
    const invalidId = "1";
    const castError = new Error("Cast to ObjectId failed");
    castError.name = "CastError";
    castError.kind = "ObjectId";

    mockProduct.findById.mockRejectedValue(castError);

    const res = await request(app)
      .get(`/api/productos/${invalidId}`)
      .expect(500);

    expect(res.body).toHaveProperty("error");
  });

  test("POST /api/productos debe crear un producto y responder con status 201", async () => {
    mockSave.mockResolvedValue(mockProductData);

    const newProduct = { ...mockProductData };
    delete newProduct._id;

    const res = await request(app)
      .post("/api/productos")
      .field("nombre", newProduct.nombre)
      .field("descripcion", newProduct.descripcion)
      .field("altValue", newProduct.altValue)
      .field("precio", newProduct.precio)
      .field("dimensiones", newProduct.dimensiones)
      .field("capacidad", newProduct.capacidad)
      .field("estilo", newProduct.estilo)
      .field("material", newProduct.material)
      .field("garantia", newProduct.garantia)
      .field("origen", newProduct.origen)
      .field("peso", newProduct.peso)
      .field("color", newProduct.color)
      .attach("imagen", Buffer.from("fake image"), "test.jpg") // Mock file upload
      .expect(201);

    expect(res.body).toBeDefined();
    expect(mockSave).toHaveBeenCalled();
  });

  test("PUT /api/productos/:id debe actualizar un producto y responder con status 200", async () => {
    mockProduct.findByIdAndUpdate.mockResolvedValue({
      ...mockProductData,
      nombre: "Producto Actualizado Válido",
    });

    const res = await request(app)
      .put(`/api/productos/${mockProductId}`)
      .field("nombre", "Producto Actualizado Válido")
      .field("descripcion", mockProductData.descripcion)
      .field("altValue", mockProductData.altValue)
      .field("precio", mockProductData.precio)
      .field("dimensiones", mockProductData.dimensiones)
      .field("capacidad", mockProductData.capacidad)
      .field("estilo", mockProductData.estilo)
      .field("material", mockProductData.material)
      .field("garantia", mockProductData.garantia)
      .field("origen", mockProductData.origen)
      .field("peso", mockProductData.peso)
      .field("color", mockProductData.color)
      .attach("imagen", Buffer.from("fake image"), "test.jpg")
      .expect(200);

    expect(res.body.nombre).toBe("Producto Actualizado Válido");
    expect(mockProduct.findByIdAndUpdate).toHaveBeenCalledWith(
      mockProductId,
      expect.objectContaining({ nombre: "Producto Actualizado Válido" }),
      expect.anything()
    );
  });

  test("DELETE /api/productos/:id debe eliminar un producto y responder con status 200", async () => {
    mockProduct.findByIdAndDelete.mockResolvedValue(mockProductData);

    const res = await request(app)
      .delete(`/api/productos/${mockProductId}`)
      .expect(200);

    expect(res.body.message).toBe("Producto eliminado exitosamente");
    expect(mockProduct.findByIdAndDelete).toHaveBeenCalledWith(mockProductId);
  });
});
