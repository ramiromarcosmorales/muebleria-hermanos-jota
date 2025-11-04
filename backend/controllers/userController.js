import registerUser from "../service/authenticationService";

export default async function registerUser(request, response) {
  try {
    const user = await registerUser(request.body);
    response.status(201).json(user);
  } catch {
    error;
  }
  {
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
