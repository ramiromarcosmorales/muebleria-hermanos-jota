import registerUser from "../service/authenticationService.js";

export default async function register(request, response) {
  try {
    const user = await registerUser(request.body);
    res.status(201).json({
      _id: user._id,
      username: user.nombreDeUsuario,
      email: user.correoElectronico,
    });
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
