import { formatPrice } from "../utils/format-price";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductById, deleteProduct } from "../services/productService";
import { useCartContext } from "../context/CartContext";
import { useAuthContext } from "../context/AuthContext";
import { useProductsContext } from "../context/ProductsContext";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProducto] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuthContext();
  const { refetch } = useProductsContext();

  const { addToCart } = useCartContext();

  useEffect(() => {
    async function fetchProducto() {
      try {
        setLoading(true);
        setError(null);
        const data = await getProductById(id);
        setProducto(data);
      } catch (error) {
        console.error("Error al obtener el producto:", error);
        setError(error.message || "Error al cargar el producto");
      } finally {
        setLoading(false);
      }
    }
    fetchProducto();
  }, [id]);

  const API_BASE = import.meta.env.VITE_API_BASE;

  const characteristicLabels = {
    dimensiones: "DIMENSIONES",
    capacidad: "CAPACIDAD",
    estilo: "ESTILO",
    material: "MATERIAL",
    garantia: "GARANTÍA",
    origen: "ORIGEN",
    peso: "PESO (KG)",
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
        refetch();
        navigate("/productos");
      } catch (error) {
        console.error("Error al eliminar producto:", error);
        alert(error.message || "Error al eliminar el producto");
      }
    }
  };

  if (loading)
    return (
      <div className="center-screen">
        <div className="center-box">
          <h2>Cargando producto...</h2>
        </div>
      </div>
    );

  if (error || !product)
    return (
      <div className="center-screen">
        <div className="center-box">
          <h2>Producto no encontrado</h2>
          <p>
            {error ||
              "Lo sentimos, el producto que estás buscando no existe o fue eliminado."}
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
            <img
              src={`${API_BASE}/api/productos/${product._id}/imagen`}
              alt={product.altValue}
            />
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
              data-id={product._id}
              data-name={product.nombre}
              data-price={product.precio}
              onClick={() => addToCart(product)}
              aria-label={`Añadir ${product?.nombre} al carrito`}
            >
              Añadir al carrito
            </button>
            {currentUser?.isAdmin && (
              <>
                <button className="btn-cart btn-delete" onClick={handleDelete}>
                  Eliminar
                </button>
                <button
                  className="btn-cart btn-delete"
                  onClick={() => navigate(`/admin/editar-producto/${id}`)}
                >
                  Editar
                </button>
              </>
            )}
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
