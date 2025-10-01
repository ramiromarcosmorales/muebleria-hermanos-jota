import { Link } from "react-router-dom";
import { formatPrice } from "../utils/format-price";

const ProductCard = ({ product, onSelect, variant = "catalog" }) => {
  const handleCardClick = () => {
    if (onSelect) onSelect(product);
  };

  // index
  if (variant === "home") {
    return (
      <div className="products-card" onClick={handleCardClick}>
        <img src={product.srcImg} alt={product.descripcion} />
        <p>{product.nombre}</p>
        <p className="products-precio">{formatPrice(product.precio)}</p>
        <Link
          to={`/producto/${product.id}`}
          className="featured-product-button"
        >
          Ver Producto
        </Link>
      </div>
    );
  }

  // catalogo
  return (
    <article onClick={handleCardClick}>
      <h3>{product.nombre}</h3>
      <img src={product.srcImg} alt={product.descripcion} />
      <p>Precio: {formatPrice(product.precio)}</p>
      <Link to={`/producto/${product.id}`} className="product-button">
        Ver Producto
      </Link>

      <button
        className="btn-cart"
        data-id={product.id}
        data-name={product.nombre}
        data-price={product.precio}
        data-image={product.srcImg}
        onClick={(e) => {
          e.stopPropagation();
          console.log("Añadir al carrito:", product);
        }}
        aria-label={`Añadir ${product?.nombre} al carrito`}
      >
        <div className="cart-icon">
          <i className="fa-solid fa-cart-shopping"></i>
          <span className="cart-count">+</span>
        </div>
      </button>
    </article>
  );
};

export default ProductCard;
