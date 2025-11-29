import { postJSON } from "../utils/api";

export default async function registerUser(userData) {
  try {
    const user = await postJSON("/api/auth/registro", userData);
    return user;
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    throw new Error(
      `Error al crear el usuario: ${error.message || "Error desconocido"}`
    );
  }
}

export async function verifyTokenBackend(token) {
  try {
    const API_BASE = import.meta.env.VITE_API_BASE;
    const response = await fetch(`${API_BASE}/api/auth/verify`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Token inválido o expirado");
    }

    return await response.json();
  } catch (error) {
    console.error("Error al verificar token:", error);
    throw error;
  }
}
