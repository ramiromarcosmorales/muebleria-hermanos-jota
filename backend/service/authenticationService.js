import { User } from "../models/Users";
import { validateUser } from "../utils/validateUser";

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

  const newUser = new User(userData);

  return await newUser.save();
}
