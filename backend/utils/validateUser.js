export function validateUser(user) {
  const errors = [];

  // Constantes para la validación
  const NAME_MIN_LENGTH = 3;
  const NAME_MAX_LENGTH = 100;
  const PASSWORD_MIN_LENGTH = 6;
  const EMAIL_REGEX =
    // eslint-disable-next-line no-control-regex
    /(?:[a-z0-9+!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i;

  if (
    !user.nombreDeUsuario ||
    user.nombreDeUsuario.length < NAME_MIN_LENGTH ||
    user.nombreDeUsuario.length > NAME_MAX_LENGTH
  ) {
    errors.push(
      `El nombre de usuario debe tener entre ${NAME_MIN_LENGTH} y ${NAME_MAX_LENGTH} caracteres.`
    );
  }

  if (!user.correoElectronico || !EMAIL_REGEX.test(user.correoElectronico)) {
    errors.push("El correo electrónico debe cumplir con el formato adecuado.");
  }

  if (
    !user.passwordUsuario ||
    user.passwordUsuario.length < PASSWORD_MIN_LENGTH
  ) {
    errors.push(
      `La contraseña debe tener al menos ${PASSWORD_MIN_LENGTH} caracteres.`
    );
  }

  return errors;
}
