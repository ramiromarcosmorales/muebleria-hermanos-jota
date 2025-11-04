import { User } from "../models/Users.js";
import { validateUser } from "../utils/validateUser.js";
import bcrypt from "bcrypt";

export default async function registerUser(userData) {
  const errors = validateUser(userData);
  if (errors.length > 0) {
    const error = new Error("Error de validación");
    error.details = errors;
    throw error;
  }

  // Se busca si hay un usuario registrado con el mismo email
  const userAlreadyExists = await User.findOne({
    correoElectronico: userData.email,
  });
  if (userAlreadyExists) {
    const error = new Error("El usuario ya existe");
    error.details = ["Ya existe un usuario con ese correo electrónico."];
    throw error;
  }

  // Hasheo de contraseña
  const salt = await bcrypt.genSalt(10);
  userData.password = await bcrypt.hash(userData.password, salt);

  const newUser = new User(userData);

  return await newUser.save();
}
