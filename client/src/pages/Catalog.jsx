import ProductCard from "../components/ProductCard";
import { useProductsContext } from "../context/ProductsContext";

const Catalog = () => {
  const { productos, loading, error, refetch } = useProductsContext();

  return (
    <section className="products-section">
      <h1 className="products-title-section">Catálogo de Productos</h1>
      <section className="products-container">
        {loading && (
          <div className="loading-state">
            <div
              className="spinner"
              aria-label="Cargando catálogo de productos"
            />
            <p>Cargando catálogo de productos...</p>
          </div>
        )}

        {error && (
          <div className="error-state">
            <i className="fa-solid fa-circle-exclamation"></i>
            <p>
              Ocurrió un error al cargar los productos. Por favor, intentá
              nuevamente.
            </p>
            <button onClick={refetch}>Reintentar</button>
          </div>
        )}

        {!loading &&
          !error &&
          productos.map((producto) => (
            <ProductCard key={producto.id} product={producto} />
          ))}
      </section>
    </section>
  );
};

export default Catalog;
