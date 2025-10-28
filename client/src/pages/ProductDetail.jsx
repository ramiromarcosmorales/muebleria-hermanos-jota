import { formatPrice } from "../utils/format-price";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductById, deleteProduct } from "../services/productService";

const ProductDetail = ({ addToCart }) => {
  const { id } = useParams();
  const [product, setProducto] = useState(null);

  useEffect(() => {
    async function fetchProducto() {
      try {
        const data = await getProductById(id);
        setProducto(data);
      } catch (error) {
        console.error("Error al obtener el producto:", error);
      }
    }
    fetchProducto();
  }, [id]);

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

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "¿Estas seguro de eliminar este producto?"
    );
    if (confirmDelete) {
      try {
        await deleteProduct(id);
        alert("Producto Eliminado");
        // Opcional: redirigir al catálogo después de eliminar
        // window.location.href = '/productos';
      } catch (error) {
        console.error("Error al eliminar el producto:", error);
        alert(
          "No se pudo eliminar el producto. Por favor, intentá nuevamente."
        );
      }
    }
  };

  if (!product)
    return (
      <div className="center-screen">
        <div className="center-box">
          <h2>Producto no encontrado</h2>
          <p>
            Lo sentimos, el producto que estás buscando no existe o fue
            eliminado.
          </p>
          <Link className="featured-product-button" to={"/productos"}>
            Volver al Catálogo
          </Link>
        </div>
      </div>
    );

  return (
    <section className="product-detail-section">
      <section id="product-detail">
        <div className="product-detail-container">
          <div className="product-image">
            <img src={product.srcImg} alt={product.altValue} />
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
              aria-label={`Añadir ${product?.nombre} al carrito`}
            >
              Añadir al carrito
            </button>
            <button className="btn-cart btn-delete" onClick={handleDelete}>
              Eliminar
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
