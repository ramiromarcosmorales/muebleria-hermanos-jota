import { useState } from "react";

export default function Registration() {
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

  function handleSubmit(event) {
    event.preventDefault();
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

        <div className={status}></div>

        <button type="submit">Finalizar registro</button>
      </form>
    </section>
  );
}
