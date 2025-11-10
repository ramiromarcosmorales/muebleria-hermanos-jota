import { useState } from "react";
import registerUser from "../services/userService";
import { useNavigate } from "react-router-dom";

export default function Registration() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const STATUS_CLASSNAMES_ENUM = {
    SUCCESS: "success-status",
    ERROR: "error-status",
    NO_STATUS: "",
  };
  const [status, setStatus] = useState(STATUS_CLASSNAMES_ENUM.NO_STATUS);

  const [errors, setErrors] = useState([]);

  // Constantes para la validación del form
  const NAME_MIN_LENGTH = 3;
  const NAME_MAX_LENGTH = 100;
  const PASSWORD_MIN_LENGTH = 6;
  const EMAIL_REGEX =
    // eslint-disable-next-line no-control-regex
    /(?:[a-z0-9+!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i;

  function validateForm() {
    const errors = [];

    if (
      !form.username ||
      form.username.length < NAME_MIN_LENGTH ||
      form.username.length > NAME_MAX_LENGTH
    ) {
      errors.push(
        `El nombre de usuario debe tener entre ${NAME_MIN_LENGTH} y ${NAME_MAX_LENGTH} caracteres.`
      );
    }

    if (!form.email || !EMAIL_REGEX.test(form.email)) {
      errors.push(
        "El correo electrónico debe cumplir con el formato adecuado."
      );
    }

    if (!form.password || form.password.length < PASSWORD_MIN_LENGTH) {
      errors.push(
        `La contraseña debe tener al menos ${PASSWORD_MIN_LENGTH} caracteres.`
      );
    }

    return errors;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const errors = validateForm();
    if (errors.length > 0) {
      setErrors(errors);
      setStatus(STATUS_CLASSNAMES_ENUM.ERROR);
      return;
    }

    try {
      // Preparar los datos para enviar
      const userData = {
        nombreDeUsuario: form.username,
        correoElectronico: form.email,
        passwordUsuario: form.password,
      };

      await registerUser(userData);

      setStatus(STATUS_CLASSNAMES_ENUM.SUCCESS);

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Error al crear el usuario:", error);
      setErrors([error.message || "Error al crear el usuario."]);
      setStatus(STATUS_CLASSNAMES_ENUM.ERROR);
    }
  }

  function displayErrors() {
    return (
      <>
        <p>No se pudo enviar el formulario por los siguientes errores:</p>
        <ul>
          {errors.map((e, i) => (
            <li key={i}>{e}</li>
          ))}
        </ul>
      </>
    );
  }

  function displaySuccess() {
    return <p>Formulario enviado exitosamente.</p>;
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  return (
    <section>
      <header>
        <h1>Registro</h1>
      </header>

      <form noValidate onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombreUsuario">Nombre de usuario</label>
          <input
            type="text"
            id="nombreUsuario"
            name="username"
            placeholder="Nombre de usuario"
            value={form.username}
            onChange={handleChange}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="correoUsuario">Correo electrónico</label>
          <input
            type="email"
            id="correoUsuario"
            name="email"
            placeholder="ejemplo@correo.com"
            value={form.email}
            onChange={handleChange}
            required
          ></input>
        </div>
        <div>
          <label>Contraseña</label>
          <input
            type="password"
            id="passwordUsuario"
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            required
          ></input>
        </div>

        <div className={status}>
          {status === STATUS_CLASSNAMES_ENUM.ERROR && displayErrors()}
          {status === STATUS_CLASSNAMES_ENUM.SUCCESS && displaySuccess()}
        </div>

        <button type="submit">Finalizar registro</button>
      </form>
    </section>
  );
}
