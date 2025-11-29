import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../context/CartContext";
import { createOrder } from "../services/orderService";
import { formatPrice } from "../utils/format-price";

const EMAIL_REGEX =
  // eslint-disable-next-line no-control-regex
  /(?:[a-z0-9+!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i;

const Checkout = () => {
  const navigate = useNavigate();
  const { cart } = useCartContext();

  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    calle: "",
    numero: "",
    ciudad: "",
    codigoPostal: "",
    provincia: "",
  });

  const [errors, setErrors] = useState([]);
  const [status, setStatus] = useState("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Si el carrito está vacío, redirigir al catálogo
    if (cart.length === 0) {
      navigate("/productos");
      return;
    }
  }, [cart, navigate]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const validate = () => {
    const errs = [];

    if (!form.nombre || form.nombre.length < 3) {
      errs.push("El nombre debe tener al menos 3 caracteres.");
    }
    if (!form.email || !EMAIL_REGEX.test(form.email)) {
      errs.push("El correo electrónico no es válido.");
    }
    if (!form.telefono || form.telefono.length < 8) {
      errs.push("El teléfono debe tener al menos 8 caracteres.");
    }
    if (!form.calle || form.calle.length < 3) {
      errs.push("La calle debe tener al menos 3 caracteres.");
    }
    if (!form.numero || form.numero.length < 1) {
      errs.push("El número es requerido.");
    }
    if (!form.ciudad || form.ciudad.length < 2) {
      errs.push("La ciudad debe tener al menos 2 caracteres.");
    }
    if (!form.codigoPostal || form.codigoPostal.length < 4) {
      errs.push("El código postal debe tener al menos 4 caracteres.");
    }
    if (!form.provincia || form.provincia.length < 2) {
      errs.push("La provincia debe tener al menos 2 caracteres.");
    }

    return errs;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);

    if (errs.length) {
      setStatus("error");
      return;
    }

    setIsSubmitting(true);
    setStatus("idle");

    try {
      const items = cart.map((item) => ({
        productoId: item._id,
        nombre: item.nombre,
        precio: Number(item.precio),
        cantidad: Number(item.quantity),
        imagenUrl: item.imagenUrl,
      }));

      const total = cart.reduce(
        (sum, item) => sum + item.precio * item.quantity,
        0
      );

      const orderData = {
        items,
        direccionEnvio: {
          calle: form.calle,
          numero: form.numero,
          ciudad: form.ciudad,
          codigoPostal: form.codigoPostal,
          provincia: form.provincia,
        },
        datosContacto: {
          nombre: form.nombre,
          telefono: form.telefono,
          email: form.email,
        },
      };

      const order = await createOrder(orderData);

      // Redirigir a la página de confirmación con el ID de la orden
      // El carrito se limpiará en la página de confirmación cuando se cargue exitosamente
      navigate(`/confirmacion/${order._id}`, { replace: true });
    } catch (error) {
      console.error("Error al crear la orden:", error);
      setErrors([
        error.message ||
          "Error al procesar la orden. Por favor, intenta nuevamente.",
      ]);
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const total = cart.reduce(
    (sum, item) => sum + item.precio * item.quantity,
    0
  );

  // Solo redirigir si el carrito está vacío, pero no si estamos procesando una orden
  if (cart.length === 0 && !isSubmitting) {
    return null; // Se está redirigiendo al catálogo
  }

  return (
    <section className="checkout">
      <div className="checkout-container">
        <div className="checkout-header">
          <h1>Finalizar Compra</h1>
          <p>Completa tus datos para finalizar tu pedido</p>
        </div>

        <div className="checkout-content">
          <div className="checkout-form-container">
            <form className="checkout-form" noValidate onSubmit={onSubmit}>
              <h2>Datos de Contacto</h2>

              <div className="checkout-field">
                <label htmlFor="nombre">Nombre completo</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  placeholder="Nombre completo"
                  required
                  value={form.nombre}
                  onChange={onChange}
                />
              </div>

              <div className="checkout-field">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="ejemplo@correo.com"
                  required
                  value={form.email}
                  onChange={onChange}
                />
              </div>

              <div className="checkout-field">
                <label htmlFor="telefono">Teléfono</label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  placeholder="1234567890"
                  required
                  value={form.telefono}
                  onChange={onChange}
                />
              </div>

              <h2>Dirección de Envío</h2>

              <div className="checkout-field">
                <label htmlFor="calle">Calle</label>
                <input
                  type="text"
                  id="calle"
                  name="calle"
                  placeholder="Nombre de la calle"
                  required
                  value={form.calle}
                  onChange={onChange}
                />
              </div>

              <div className="checkout-field-row">
                <div className="checkout-field">
                  <label htmlFor="numero">Número</label>
                  <input
                    type="text"
                    id="numero"
                    name="numero"
                    placeholder="123"
                    required
                    value={form.numero}
                    onChange={onChange}
                  />
                </div>

                <div className="checkout-field">
                  <label htmlFor="codigoPostal">Código Postal</label>
                  <input
                    type="text"
                    id="codigoPostal"
                    name="codigoPostal"
                    placeholder="1234"
                    required
                    value={form.codigoPostal}
                    onChange={onChange}
                  />
                </div>
              </div>

              <div className="checkout-field-row">
                <div className="checkout-field">
                  <label htmlFor="ciudad">Ciudad</label>
                  <input
                    type="text"
                    id="ciudad"
                    name="ciudad"
                    placeholder="Ciudad"
                    required
                    value={form.ciudad}
                    onChange={onChange}
                  />
                </div>

                <div className="checkout-field">
                  <label htmlFor="provincia">Provincia</label>
                  <input
                    type="text"
                    id="provincia"
                    name="provincia"
                    placeholder="Provincia"
                    required
                    value={form.provincia}
                    onChange={onChange}
                  />
                </div>
              </div>

              <div
                id="status-message"
                role="status"
                aria-live="polite"
                className={
                  status === "error"
                    ? "error-status"
                    : status === "ok"
                      ? "success-status"
                      : ""
                }
              >
                {status === "error" && (
                  <>
                    <p>
                      No se pudo procesar la orden por los siguientes errores:
                    </p>
                    <ul>
                      {errors.map((e, i) => (
                        <li key={i}>{e}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>

              <button
                type="submit"
                className="checkout-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Procesando..." : "Confirmar Pedido"}
              </button>
            </form>
          </div>

          <div className="checkout-summary">
            <h2>Resumen del Pedido</h2>
            <div className="checkout-items">
              {cart.map((item) => (
                <div key={item._id} className="checkout-item">
                  <img src={item.imagenUrl} alt={item.altValue} />
                  <div className="checkout-item-details">
                    <span className="checkout-item-name">{item.nombre}</span>
                    <span className="checkout-item-quantity">
                      Cantidad: {item.quantity}
                    </span>
                  </div>
                  <span className="checkout-item-price">
                    {formatPrice(item.precio * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
            <div className="checkout-total">
              <p>
                Total: <span>{formatPrice(total)}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
