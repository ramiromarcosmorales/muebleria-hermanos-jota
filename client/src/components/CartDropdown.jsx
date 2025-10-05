import { formatPrice } from "../utils/format-price";

const CartDropdown = ({ cart, onRemove, onIncrease, onDecrease, onClear }) => {
  const total = cart.reduce(
    (sum, item) => sum + item.precio * item.quantity,
    0
  );

  return (
    <div className="cart-dropdown">
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
                    onClick={() => onDecrease(item.id)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="item-quantity">{item.quantity}</span>
                  <button onClick={() => onIncrease(item.id)}>+</button>
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
