import { formatPrice } from "../utils/format-price";

const CartDropdown = ({ cart, onRemove, onIncrease, onDecrease, onClear }) => {
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
                      onDecrease(item.id);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        e.stopPropagation();
                        onDecrease(item.id);
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
                      onIncrease(item.id);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        e.stopPropagation();
                        onIncrease(item.id);
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
                  onRemove(item.id);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    e.stopPropagation();
                    onRemove(item.id);
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
              onClear();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                e.stopPropagation();
                onClear();
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
