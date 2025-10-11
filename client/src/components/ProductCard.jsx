import { formatPrice } from "../utils/format-price";

const ProductCard = ({
  product,
  variant = "catalog",
  onViewProduct,
  onAddToCart,
}) => {
  const handleViewProduct = (e) => {
    e.stopPropagation();
    if (onViewProduct) {
      onViewProduct(product);
    }
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  // home
  if (variant === "home") {
    return (
      <div className="products-card">
        <img src={product.srcImg} alt={product.altValue} />
        <p>{product.nombre}</p>
        <p className="products-precio">{formatPrice(product.precio)}</p>
        <button
          onClick={handleViewProduct}
          className="featured-product-button"
          aria-label="Ver producto"
        >
          Ver Producto
        </button>
      </div>
    );
  }

  // catalogo
  return (
    <article>
      <h2>{product.nombre}</h2>
      <img src={product.srcImg} alt={product.altValue} />
      <p>Precio: {formatPrice(product.precio)}</p>
      <button
        onClick={handleViewProduct}
        className="product-button"
        aria-label="Ver producto"
      >
        Ver Producto
      </button>

      <button
        className="btn-cart"
        onClick={handleAddToCart}
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
