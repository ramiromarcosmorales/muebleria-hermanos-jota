import { useState } from "react";

export default function Login() {
  const [form, setForm] = useState({
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

  function isValidEmail() {
    const EMAIL_REGEX =
      // eslint-disable-next-line no-control-regex
      /(?:[a-z0-9+!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i;

    return EMAIL_REGEX.test(form.email);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!form.email || !isValidEmail(form.email) || !form.password) {
      setErrors([
        "Las credenciales ingresadas no son correctas. Por favor, intente de nuevo.",
      ]);
      setStatus(STATUS_CLASSNAMES_ENUM.ERROR);
      return;
    }

    setStatus(STATUS_CLASSNAMES_ENUM.SUCCESS);
  }

  function displaySuccess() {
    return <p>Formulario enviado exitosamente.</p>;
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

  return (
    <section>
      <header>
        <h1>Iniciar sesión</h1>
      </header>

      <form noValidate onSubmit={handleSubmit}>
        <div>
          <label htmlFor="correoUsuario">Correo electrónico</label>
          <input
            type="email"
            id="correoUsuario"
            name="email"
            placeholder="correode@ejemplo.com"
            value={form.email}
            onChange={handleChange}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="passwordUsuario">Contraseña</label>
          <input
            type="password"
            id="passwordUsuario"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          ></input>
        </div>

        <div className={status}>
          {status === STATUS_CLASSNAMES_ENUM.ERROR && displayErrors()}
          {status === STATUS_CLASSNAMES_ENUM.SUCCESS && displaySuccess()}
        </div>

        <button type="submit">Iniciar sesión</button>
      </form>
    </section>
  );
}
