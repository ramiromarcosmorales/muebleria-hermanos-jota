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
