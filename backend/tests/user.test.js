import { jest, describe, test, beforeEach, expect } from "@jest/globals";
import request from "supertest";
import { mockUser, mockSave, createQueryMock } from "./setup.js";

jest.unstable_mockModule("bcrypt", () => ({
  default: {
    compare: jest.fn().mockResolvedValue(true),
    hash: jest.fn().mockResolvedValue("hashed_password"),
    genSalt: jest.fn().mockResolvedValue("salt"),
  },
  compare: jest.fn().mockResolvedValue(true),
  hash: jest.fn().mockResolvedValue("hashed_password"),
  genSalt: jest.fn().mockResolvedValue("salt"),
}));

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
  sign: jest.fn().mockReturnValue("mock_token"),
  verify: jest.fn((token, secret, cb) => {
    if (typeof cb === "function") {
      cb(null, { id: "507f1f77bcf86cd799439011" });
    }
    return { id: "507f1f77bcf86cd799439011" };
  }),
}));

const { app } = await import("../app.js");

describe("API de Usuarios", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockUserData = {
    _id: "507f1f77bcf86cd799439011",
    nombreDeUsuario: "testuser",
    correoElectronico: "test@example.com",
    passwordUsuario: "hashed_password",
    esAdmin: false,
  };

  test("POST /api/auth/registro debe crear un usuario y responder con 201", async () => {
    mockUser.findOne.mockResolvedValue(null);
    mockSave.mockResolvedValue(mockUserData);

    const res = await request(app)
      .post("/api/auth/registro")
      .send({
        nombreDeUsuario: "testuser",
        correoElectronico: "test@example.com",
        passwordUsuario: "password123",
      })
      .expect(201);

    expect(res.body).toHaveProperty("_id");
    expect(res.body.email).toBe("test@example.com");
  });

  test("POST /api/auth/login debe autenticar y devolver token", async () => {
    mockUser.findOne.mockResolvedValue(mockUserData);

    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "test@example.com",
        password: "password123",
      })
      .expect(200);

    expect(res.body).toHaveProperty("token", "mock_token");
  });

  test("GET /api/auth/verify debe verificar token y devolver usuario", async () => {
    mockUser.findById.mockReturnValue(createQueryMock(mockUserData));

    const res = await request(app)
      .get("/api/auth/verify")
      .set("Authorization", "Bearer mock_token")
      .expect(200);

    expect(res.body).toHaveProperty("email", "test@example.com");
  });
});
