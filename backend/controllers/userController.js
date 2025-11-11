import {
  registerUser,
  getUserByEmail,
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
      response.status.json({
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
      { id: user._id, username: user.nombreDeUsuario },
      process.env.JWT_SECRET
    );

    response.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.nombreDeUsuario,
        email: user.correoElectronico,
      },
    });
  } catch (error) {
    response.status(500).json({ message: "Error interno del servidor" });
  }
}
