import { formatPrice } from "../utils/format-price";
import { Link } from "react-router-dom";
import { useCartContext } from "../context/CartContext";

const ProductCard = ({ product, variant = "catalog" }) => {
  const { addToCart } = useCartContext();
  // home
  if (variant === "home") {
    return (
      <div className="products-card">
        <img src={product.srcImg} alt={product.altValue} />
        <p>{product.nombre}</p>
        <p className="products-precio">{formatPrice(product.precio)}</p>
        <Link
          to={`/producto/${product.id}`}
          className="featured-product-button"
          aria-label="Ver producto"
        >
          Ver Producto
        </Link>
      </div>
    );
  }

  // catalogo
  return (
    <article>
      <h2>{product.nombre}</h2>
      <img src={product.srcImg} alt={product.altValue} />
      <p>Precio: {formatPrice(product.precio)}</p>
      <Link
        to={`/producto/${product.id}`}
        className="product-button"
        aria-label="Ver producto"
      >
        Ver Producto
      </Link>

      <button
        className="btn-cart"
        onClick={() => addToCart(product)}
        aria-label={`Añadir ${product?.nombre} al carrito`}
      >
        <div className="cart-icon-catalog">
          <i className="fa-solid fa-cart-shopping"></i>
          <span className="cart-count">+</span>
        </div>
      </button>
    </article>
  );
};

export default ProductCard;
