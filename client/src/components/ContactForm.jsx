import { useState } from "react";

const NAME_MIN = 3;
const NAME_MAX = 50;
const MSG_MIN = 10;
const MSG_MAX = 500;

// RFC-ish email (similar al que usabas)
const EMAIL_REGEX =
  /(?:[a-z0-9+!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i;


const ContactForm = () => {

  const [form, setForm] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });

  const [errors, setErrors] = useState([]);

  const [status, setStatus] = useState("idle");

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };
  
  const validate = ({ nombre, email, mensaje }) => {
    const errs = [];

    if (!nombre || nombre.length < NAME_MIN || nombre.length > NAME_MAX) {
      errs.push(
        `El nombre debe tener entre ${NAME_MIN} y ${NAME_MAX} caracteres.`
      );
    }
    if (!email || !EMAIL_REGEX.test(email)) {
      errs.push(
        "El correo electrónico no puede estar vacío y debe cumplir con el formato adecuado."
      );
    }
    if (!mensaje || mensaje.length < MSG_MIN || mensaje.length > MSG_MAX) {
      errs.push(
        `El mensaje debe tener entre ${MSG_MIN} y ${MSG_MAX} caracteres.`
      );
    }
    return errs;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    if (errs.length) {
      setStatus("error");
      return;
    }
    setStatus("ok");
    console.log("Formulario enviado:", form); // <-- lo que pide la issue
    // si querés limpiar el form al éxito:
    // setForm({ nombre: "", email: "", mensaje: "" });
  };

  // flags de accesibilidad por campo
  const nameInvalid =
    status === "error" &&
    (!form.nombre || form.nombre.length < NAME_MIN || form.nombre.length > NAME_MAX);
  const emailInvalid = status === "error" && (!form.email || !EMAIL_REGEX.test(form.email));
  const msgInvalid =
    status === "error" &&
    (!form.mensaje || form.mensaje.length < MSG_MIN || form.mensaje.length > MSG_MAX);

  return (
    <section className="contact">
      <div className="contact-container">
        <header className="contact-header">
          <h2>Ponte en contacto con nosotros</h2>
          <p>
            ¡Estaremos encantados de ayudarte! Rellena el siguiente formulario
            y nos pondremos en contacto contigo lo antes posible.
          </p>
        </header>

        <form id="contact-form" className="contact-form" noValidate onSubmit={onSubmit}>
          <div className="contact-field">
            <label htmlFor="nombreUsuario">Nombre</label>
            <input
              type="text"
              id="nombreUsuario"
              name="nombre"
              placeholder="Nombre completo"
              minLength={NAME_MIN}
              maxLength={NAME_MAX}
              required
              value={form.nombre}
              onChange={onChange}
              aria-invalid={nameInvalid}
            />
          </div>

          <div className="contact-field">
            <label htmlFor="emailUsuario">Email</label>
            <input
              type="email"
              id="emailUsuario"
              name="email"
              placeholder="ejemplo@correo.com"
              required
              value={form.email}
              onChange={onChange}
              aria-invalid={emailInvalid}
            />
          </div>

          <div className="contact-field">
            <label htmlFor="mensajeUsuario">Mensaje</label>
            <textarea
              id="mensajeUsuario"
              name="mensaje"
              rows={5}
              placeholder="Escribe tu mensaje aquí..."
              minLength={MSG_MIN}
              maxLength={MSG_MAX}
              required
              value={form.mensaje}
              onChange={onChange}
              aria-invalid={msgInvalid}
            />
          </div>

          {/* Estado accesible */}
          <div
            id="status-message"
            role="status"
            aria-live="polite"
            className={status === "error" ? "error-status" : status === "ok" ? "success-status" : ""}
          >
            {status === "error" && (
              <>
                <p>No se pudo enviar el formulario por los siguientes errores:</p>
                <ul>
                  {errors.map((e, i) => (
                    <li key={i}>{e}</li>
                  ))}
                </ul>
              </>
            )}
            {status === "ok" && <p>Formulario enviado exitosamente.</p>}
          </div>

          <button type="submit" className="contact-button">
            Enviar consulta
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
