import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useProductsContext } from "../context/ProductsContext";

const Home = () => {
  const { productos, loading, error } = useProductsContext();
  const destacados = productos.filter((p) => p.destacado);
  return (
    <>
      <section className="hero">
        <div className="hero-container">
          <div className="hero-badge">
            <i className="fa-solid fa-star"></i>
            <span>Colección Premium 2025</span>
          </div>
          <h1>
            Redescubrir el <span className="highlight">arte</span> de vivir
          </h1>
          <p>
            Transforma tu hogar en un santuario de elegancia y confort. Descubre
            muebles únicos que cuentan historias y crean momentos inolvidables.
          </p>
          <Link to={"productos"} className="hero-btn">
            Ver Colección →
          </Link>
        </div>
        <div className="hero-img">
          <img
            src="/images/banner-index.png"
            alt="Imagen del banner con un living elegante"
          />
        </div>
      </section>
      <section className="products">
        <h2>Productos Destacados</h2>
        {loading && (
          <div className="loading-state">
            <div
              className="spinner"
              aria-label="Cargando productos destacados"
            />
            <p>Cargando productos destacados...</p>
          </div>
        )}

        {error && (
          <div className="error-state">
            <i className="fa-solid fa-circle-exclamation"></i>
            <p>
              Ocurrió un error al cargar los productos. Por favor, intentá
              nuevamente.
            </p>
          </div>
        )}

        {!loading && !error && (
          <div className="products-container">
            {destacados.length > 0 ? (
              destacados.map((producto) => (
                <ProductCard
                  key={producto._id}
                  product={producto}
                  variant="home"
                />
              ))
            ) : (
              <p className="no-products">
                No hay productos destacados en este momento.
              </p>
            )}
          </div>
        )}
      </section>
      <section className="values">
        <h2>Nuestros Valores</h2>
        <div className="values-container">
          <div className="values-card">
            <img
              src="/images/diamante-valores-index.png"
              alt="imagen de un diamante"
            />
            <h3>Diseño contemporaneo</h3>
            <p>
              Creaciones que definen la vanguardia, fusionando estética moderna
              con funcionalidad intuitiva.
            </p>
          </div>
          <div className="values-card">
            <img
              src="/images/hoja-valores-index.png"
              alt="imagen de una hoja"
            />
            <h3>Materiales sostenibles</h3>
            <p>
              Comprometidos con el planeta, usamos recursos renovables y
              procesos ecológicos en cada pieza.
            </p>
          </div>
          <div className="values-card">
            <img
              src="/images/reloj-valores-index.png"
              alt="imagen de un reloj"
            />
            <h3>Elegancia atemporal</h3>
            <p>
              Muebles diseñados para trascender modas, perdurando en estilo y
              calidad por generaciones.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
