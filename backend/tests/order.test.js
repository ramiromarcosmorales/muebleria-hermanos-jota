import { jest, describe, test, beforeEach, expect } from "@jest/globals";
import request from "supertest";
import { mockOrder, mockSave, createQueryMock } from "./setup.js";

// Mock jsonwebtoken para pasar auth
jest.unstable_mockModule("jsonwebtoken", () => ({
  default: {
    sign: jest.fn().mockReturnValue("mock_token"),
    verify: jest.fn((token, secret, cb) => {
      if (typeof cb === "function") {
        cb(null, { id: "507f1f77bcf86cd799439011" });
      }
      return { id: "507f1f77bcf86cd799439011" };
    }),
  },
  verify: jest.fn((token, secret, cb) => {
    if (typeof cb === "function") {
      cb(null, { id: "507f1f77bcf86cd799439011" });
    }
    return { id: "507f1f77bcf86cd799439011" };
  }),
}));

// Importar app dinámicamente
const { app } = await import("../app.js");

describe("API de Órdenes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockOrderData = {
    _id: "order123",
    usuarioId: "507f1f77bcf86cd799439011",
    items: [
      {
        productoId: "prod1",
        nombre: "Producto 1",
        precio: 100,
        cantidad: 2,
        imagenUrl: "img.jpg",
      },
    ],
    total: 200,
    direccionEnvio: {
      calle: "Calle Falsa",
      numero: "123",
      ciudad: "Ciudad",
      codigoPostal: "1234",
      provincia: "Provincia",
    },
    datosContacto: {
      nombre: "Juan",
      telefono: "123456",
      email: "juan@test.com",
    },
    estado: "pendiente",
  };

  test("POST /api/ordenes debe crear una orden y responder con 201", async () => {
    // 1. Mock save de la nueva orden
    mockSave.mockResolvedValue(mockOrderData);

    // 2. Mock getById después de crear para devolver la orden populada
    // createOrder controller llama a orderService.getById(order._id)
    const populatedOrder = {
      ...mockOrderData,
      usuarioId: { _id: "507f1f77bcf86cd799439011", nombreDeUsuario: "test" },
    };
    mockOrder.findById.mockReturnValue(createQueryMock(populatedOrder));

    const res = await request(app)
      .post("/api/ordenes")
      .set("Authorization", "Bearer mock_token")
      .send({
        items: [
          {
            productoId: "prod1",
            nombre: "Producto 1",
            precio: 100,
            cantidad: 2,
            imagenUrl: "img.jpg",
          },
        ],
        direccionEnvio: mockOrderData.direccionEnvio,
        datosContacto: mockOrderData.datosContacto,
      })
      .expect(201);

    expect(res.body).toHaveProperty("_id", "order123");
    expect(res.body.total).toBe(200);
    expect(mockSave).toHaveBeenCalled();
  });

  test("GET /api/ordenes/usuario debe devolver las órdenes del usuario", async () => {
    const mockOrders = [mockOrderData];
    mockOrder.find.mockReturnValue(createQueryMock(mockOrders));

    const res = await request(app)
      .get("/api/ordenes/usuario")
      .set("Authorization", "Bearer mock_token")
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]._id).toBe("order123");
  });

  test("GET /api/ordenes/:id debe devolver una orden por id", async () => {
    const populatedOrder = {
      ...mockOrderData,
      usuarioId: {
        _id: "507f1f77bcf86cd799439011", // Mismo ID que el del token mockeado
        toString: () => "507f1f77bcf86cd799439011",
      },
    };
    mockOrder.findById.mockReturnValue(createQueryMock(populatedOrder));

    const res = await request(app)
      .get("/api/ordenes/order123")
      .set("Authorization", "Bearer mock_token")
      .expect(200);

    expect(res.body._id).toBe("order123");
  });
});
