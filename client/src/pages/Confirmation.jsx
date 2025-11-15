import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getOrderById } from "../services/orderService";
import { formatPrice } from "../utils/format-price";
import { useAuthContext } from "../context/AuthContext";
import { useCartContext } from "../context/CartContext";

const Confirmation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuthContext();
  const { clearCart } = useCartContext();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cartClearedRef = useRef(false);

  useEffect(() => {
    // Si no hay usuario logueado, redirigir a login
    if (!currentUser) {
      navigate("/login");
      return;
    }

    const fetchOrder = async () => {
      try {
        const orderData = await getOrderById(id);
        console.log("Orden recibida:", orderData);
        console.log("Items de la orden:", orderData.items);
        if (orderData.items && orderData.items.length > 0) {
          console.log("Primer item:", orderData.items[0]);
          console.log("Precio del primer item:", orderData.items[0].precio);
        }
        setOrder(orderData);
        // Limpiar el carrito una vez que la orden se haya cargado exitosamente
        if (!cartClearedRef.current) {
          clearCart();
          cartClearedRef.current = true;
        }
      } catch (err) {
        console.error("Error al obtener la orden:", err);
        setError("No se pudo cargar la información de la orden.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchOrder();
    } else {
      setError("ID de orden no válido.");
      setLoading(false);
    }
  }, [id, currentUser, navigate, clearCart]);

  if (loading) {
    return (
      <section className="confirmation">
        <div className="confirmation-container">
          <p>Cargando información de la orden...</p>
        </div>
      </section>
    );
  }

  if (error || !order) {
    return (
      <section className="confirmation">
        <div className="confirmation-container">
          <div className="confirmation-error">
            <h1>Error</h1>
            <p>{error || "Orden no encontrada"}</p>
            <Link to="/productos" className="confirmation-button">
              Volver al Catálogo
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="confirmation">
      <div className="confirmation-container">
        <div className="confirmation-success">
          <div className="confirmation-icon">✓</div>
          <h1>¡Pedido Confirmado!</h1>
          <p className="confirmation-message">
            Gracias por tu compra. Tu pedido ha sido registrado exitosamente.
          </p>
          <p className="confirmation-order-id">
            Número de orden:{" "}
            <strong>#{order._id.slice(-8).toUpperCase()}</strong>
          </p>
        </div>

        <div className="confirmation-details">
          <div className="confirmation-section">
            <h2>Resumen del Pedido</h2>
            <div className="confirmation-items">
              {order.items.map((item, index) => (
                <div key={index} className="confirmation-item">
                  <img src={item.imagenUrl} alt={item.nombre} />
                  <div className="confirmation-item-details">
                    <span className="confirmation-item-name">
                      {item.nombre}
                    </span>
                    <span className="confirmation-item-quantity">
                      Cantidad: {item.cantidad}
                    </span>
                  </div>
                  <span className="confirmation-item-price">
                    {formatPrice(item.precio * item.cantidad)}
                  </span>
                </div>
              ))}
            </div>
            <div className="confirmation-total">
              <p>
                Total: <span>{formatPrice(order.total)}</span>
              </p>
            </div>
          </div>

          <div className="confirmation-section">
            <h2>Datos de Contacto</h2>
            <div className="confirmation-info">
              <p>
                <strong>Nombre:</strong> {order.datosContacto.nombre}
              </p>
              <p>
                <strong>Email:</strong> {order.datosContacto.email}
              </p>
              <p>
                <strong>Teléfono:</strong> {order.datosContacto.telefono}
              </p>
            </div>
          </div>

          <div className="confirmation-section">
            <h2>Dirección de Envío</h2>
            <div className="confirmation-info">
              <p>
                {order.direccionEnvio.calle} {order.direccionEnvio.numero}
              </p>
              <p>
                {order.direccionEnvio.ciudad}, {order.direccionEnvio.provincia}
              </p>
              <p>Código Postal: {order.direccionEnvio.codigoPostal}</p>
            </div>
          </div>

          <div className="confirmation-section">
            <h2>Estado del Pedido</h2>
            <p className="confirmation-status">
              Estado: <strong>{order.estado}</strong>
            </p>
            <p className="confirmation-date">
              Fecha:{" "}
              {new Date(order.createdAt).toLocaleDateString("es-AR", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>

        <div className="confirmation-actions">
          <Link to="/productos" className="confirmation-button">
            Continuar Comprando
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Confirmation;
