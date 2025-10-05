import { formatPrice } from "../utils/format-price";

const ProductDetail = ({ addToCart, product }) => {
  const characteristicLabels = {
    dimensiones: "DIMENSIONES",
    capacidad: "CAPACIDAD",
    estilo: "ESTILO",
    material: "MATERIAL",
    garantia: "GARANTÍA",
    origen: "ORIGEN",
    peso: "PESO",
    color: "COLOR",
  };

  console.log(product);
  if (!product) return <p>Producto no encontrado</p>;

  return (
    <section className="product-detail-section">
      <section id="product-detail">
        <div className="product-detail-container">
          <div className="product-image">
            <img src={product.srcImg} alt={product.descripcion} />
          </div>
          <div className="product-info">
            <h1 className="product-title">{product.nombre}</h1>
            <p className="product-price">{formatPrice(product.precio)}</p>
            <p className="product-stock">
              En stock - Envío en 3-5 días hábiles
            </p>
            <p className="product-description">{product.descripcion}</p>
            <button
              className="btn-cart add-to-cart"
              data-id={product.id}
              data-name={product.nombre}
              data-price={product.precio}
              data-image={product.srcImg}
              onClick={() => addToCart(product)}
            >
              Añadir al carrito
            </button>
          </div>
        </div>
      </section>

      <section id="product-characteristics">
        <div className="product-characteristics">
          <h2>Características del producto</h2>
          <div className="characteristics-grid">
            {Object.entries(characteristicLabels).map(([key, label]) =>
              product[key] ? (
                <div key={key}>
                  <p className="char-title">{label}</p>
                  <p>{product[key]}</p>
                </div>
              ) : null
            )}
          </div>
        </div>
      </section>
    </section>
  );
};

export default ProductDetail;
