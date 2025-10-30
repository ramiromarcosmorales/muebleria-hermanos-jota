import request from "supertest";
import { app } from "../app";

describe("API de Productos", () => {
  test("GET /api/productos debe responder con status 200 y un JSON con el array de productos", async () => {
    const res = await request(app)
      .get("/api/productos")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
  });

  test("GET /api/productos/:id debe responder con status 200 y un JSON con el objeto del producto", async () => {
    const res = await request(app)
      .get("/api/productos/1")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(res.body.id).toBe(1);
  });

  test("GET /api/productos/:id debe responder con status 404", async () => {
    const res = await request(app).get("/api/productos/-290").expect(404);

    expect(res.body).toEqual(
      expect.objectContaining({ error: "Producto no encontrado" })
    );
  });
});
