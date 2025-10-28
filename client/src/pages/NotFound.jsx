import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="not-found-section">
      <div className="not-found-container">
        <div className="not-found-content">
          <h1>404</h1>
          <h2>Página no encontrada</h2>
          <p>
            Lo sentimos, la página que estás buscando no existe o ha sido
            movida.
          </p>
          <Link
            to="/"
            className="not-found-btn"
            aria-label="Volver a la página de inicio"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
