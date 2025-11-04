import { useState } from "react";

export default function Registration() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  function handleSubmit() {
    return;
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
      </form>
    </section>
  );
}
