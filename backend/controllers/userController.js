import {
  registerUser,
  getUserByEmail,
  getUserById,
} from "../service/authenticationService.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function register(request, response) {
  try {
    const user = await registerUser(request.body);
    response.status(201).json({
      _id: user._id,
      username: user.nombreDeUsuario,
      email: user.correoElectronico,
    });
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    if (error.details) {
      response
        .status(400)
        .json({ message: error.message, errors: error.details });
    } else {
      response.status(500).json({
        error: "Error interno del servidor al crear el usuario",
      });
    }
  }
}

export async function login(request, response) {
  try {
    const user = await getUserByEmail(request.body.email);
    if (!user) {
      return response.status(400).json({ message: "Credenciales inválidas." });
    }

    const isValidPassword = await bcrypt.compare(
      request.body.password,
      user.passwordUsuario
    );
    if (!isValidPassword) {
      return response.status(400).json({ message: "Credenciales inválidas." });
    }

    const token = jwt.sign(
      { id: user._id, username: user.nombreDeUsuario, isAdmin: user.esAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    response.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.nombreDeUsuario,
        email: user.correoElectronico,
        isAdmin: user.esAdmin,
      },
    });
  } catch (error) {
    response.status(500).json({ message: "Error interno del servidor" });
  }
}

export async function verifySession(request, response) {
  try {
    // request.user.id viene del middleware verifyToken
    const user = await getUserById(request.user.id);

    if (!user) {
      return response.status(404).json({ message: "Usuario no encontrado" });
    }

    response.status(200).json({
      id: user._id,
      username: user.nombreDeUsuario,
      email: user.correoElectronico,
      isAdmin: user.esAdmin,
    });
  } catch (error) {
    console.error("Error verificando sesión:", error);
    response.status(500).json({ message: "Error interno del servidor" });
  }
}
