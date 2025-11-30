import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuthContext();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (location.state?.email) {
      setForm((f) => ({ ...f, email: location.state.email }));
    }
  }, [location.state]);

  const STATUS_CLASSNAMES_ENUM = {
    SUCCESS: "success-status",
    ERROR: "error-status",
    NO_STATUS: "",
  };
  const [status, setStatus] = useState(STATUS_CLASSNAMES_ENUM.NO_STATUS);

  const [errors, setErrors] = useState([]);

  function isValidEmail(email = form.email) {
    const EMAIL_REGEX =
      // eslint-disable-next-line no-control-regex
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i;

    return EMAIL_REGEX.test(email);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!form.email || !isValidEmail(form.email) || !form.password) {
      setErrors(["Las credenciales ingresadas no son correctas."]);
      setStatus(STATUS_CLASSNAMES_ENUM.ERROR);
      return;
    }

    try {
      const API_BASE = import.meta.env.VITE_API_BASE;
      const response = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }

      // Usar el método login del contexto para actualizar el estado
      login(data.token);
      setStatus(STATUS_CLASSNAMES_ENUM.SUCCESS);

      // Redirigir a la página de origen o al home
      const from = location.state?.from || "/";
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 800);
    } catch (error) {
      setErrors([error.message]);
      setStatus(STATUS_CLASSNAMES_ENUM.ERROR);
    }
  }

  function displaySuccess() {
    return <p>Formulario enviado exitosamente.</p>;
  }

  function displayErrors() {
    return (
      <>
        <p>No se pudo iniciar sesión por los siguientes errores:</p>
        <ul>
          {errors.map((e, i) => (
            <li key={i}>{e}</li>
          ))}
        </ul>
      </>
    );
  }

  return (
    <section className="auth">
      <div className="auth-container">
        <div className="auth-header">
          <h1>Iniciar sesión</h1>
          <p>
            Ingresa tus credenciales para acceder a tu cuenta y disfrutar de
            nuestros productos exclusivos.
          </p>
        </div>

        <form noValidate onSubmit={handleSubmit} className="auth-form">
          <div className="auth-field">
            <label htmlFor="correoUsuario">Correo electrónico</label>
            <input
              type="email"
              id="correoUsuario"
              name="email"
              placeholder="correode@ejemplo.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="auth-field">
            <label htmlFor="passwordUsuario">Contraseña</label>
            <input
              type="password"
              id="passwordUsuario"
              name="password"
              placeholder="Ingresa tu contraseña"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className={status} role="status" aria-live="polite">
            {status === STATUS_CLASSNAMES_ENUM.ERROR && displayErrors()}
            {status === STATUS_CLASSNAMES_ENUM.SUCCESS && displaySuccess()}
          </div>

          <button type="submit" className="auth-button">
            Iniciar sesión
          </button>

          {/* FOOTER: ir a registro */}
          <div className="auth-footer">
            <p>
              ¿No tenés cuenta?{" "}
              <Link
                to="/registro"
                state={{ from: location.state?.from || "/" }}
                className="link-inline"
              >
                Registrate
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
