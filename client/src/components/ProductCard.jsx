import { formatPrice } from "../utils/format-price";
import { Link } from "react-router-dom";
import { useCartContext } from "../context/CartContext";

const ProductCard = ({ product, variant = "catalog" }) => {
  const { addToCart } = useCartContext();

  const API_BASE = import.meta.env.VITE_API_BASE;

  const imagePath = API_BASE + product.imagenUrl;

  // home
  if (variant === "home") {
    return (
      <div className="products-card">
        <img src={imagePath} alt={product.altValue} />
        <p>{product.nombre}</p>
        <p className="products-precio">{formatPrice(product.precio)}</p>
        <Link
          to={`/producto/${product._id}`}
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
      <img src={imagePath} alt={product.altValue} />
      <p>Precio: {formatPrice(product.precio)}</p>
      <Link
        to={`/producto/${product._id}`}
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
