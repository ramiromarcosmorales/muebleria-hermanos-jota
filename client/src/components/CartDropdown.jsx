import { formatPrice } from "../utils/format-price";
import { useCartContext } from "../context/CartContext";

const CartDropdown = () => {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useCartContext();
  const total = cart.reduce(
    (sum, item) => sum + item.precio * item.quantity,
    0
  );

  return (
    <div className="cart-dropdown" onClick={(e) => e.stopPropagation()}>
      <div className="cart-items">
        {cart.length === 0 ? (
          <p style={{ textAlign: "center", color: "#777" }}>Carrito vacío</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.srcImg} alt={item.nombre} />
              <div className="cart-item-details">
                <span className="cart-item-name">{item.nombre}</span>
                <div className="cart-item-quantity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      decreaseQuantity(item.id);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        e.stopPropagation();
                        decreaseQuantity(item.id);
                      }
                    }}
                    disabled={item.quantity <= 1}
                    aria-label="Reducir cantidad"
                  >
                    -
                  </button>
                  <span className="item-quantity">{item.quantity}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      increaseQuantity(item.id);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        e.stopPropagation();
                        increaseQuantity(item.id);
                      }
                    }}
                    aria-label="Incrementar cantidad"
                  >
                    +
                  </button>
                </div>
              </div>
              <span className="cart-item-price">
                {formatPrice(item.precio * item.quantity)}
              </span>
              <button
                className="btn-clean-product"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFromCart(item.id);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    e.stopPropagation();
                    removeFromCart(item.id);
                  }
                }}
                aria-label="Eliminar producto del carrito"
              >
                ❌
              </button>
            </div>
          ))
        )}
      </div>

      {cart.length > 0 && (
        <div className="cart-total">
          <button
            className="btn-clean-cart"
            onClick={(e) => {
              e.stopPropagation();
              clearCart();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                e.stopPropagation();
                clearCart();
              }
            }}
            aria-label="Vaciar carrito"
          >
            Vaciar Carrito
          </button>
          <p>
            Total: <span>{formatPrice(total)}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default CartDropdown;
