import { useState, useEffect, useRef } from "react";
import SearchBox from "./SearchBox";

const Navbar = ({ cartCount, goToPage, productos }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef(null);

  // Calcula y setea la variable CSS --header-h
  useEffect(() => {
    const setHeaderHeightVar = () => {
      const h = headerRef.current?.offsetHeight || 56;
      document.documentElement.style.setProperty("--header-h", `${h}px`);
    };

    setHeaderHeightVar();
    window.addEventListener("resize", setHeaderHeightVar);
    return () => window.removeEventListener("resize", setHeaderHeightVar);
  }, []);

  // Cierra el menú si se presiona Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Cierra el menú si se hace click fuera o en un link
  const handleBackdropClick = () => setMenuOpen(false);
  const handleLinkClick = (page) => {
    goToPage(page);
    setMenuOpen(false);
  };

  return (
    <header className="index-header" ref={headerRef}>
      <nav className="index-navbar">
        <div className="left">
          <button
            className="menu-toggle"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <i className="fa-solid fa-bars"></i>
          </button>
          <a onClick={() => handleLinkClick("home")}>
            <img
              src="/images/logo.svg"
              alt="Logotipo de Muebleria Hermanos Jota"
              className="navbar-logo"
            />
          </a>
        </div>

        <ul
          id="primary-menu"
          className={`navlink-container ${menuOpen ? "is-open" : ""}`}
        >
          <li>
            <a onClick={() => handleLinkClick("home")}>Inicio</a>
          </li>
          <li>
            <a onClick={() => handleLinkClick("catalog")}>Catálogo</a>
          </li>
          <li>
            <a onClick={() => handleLinkClick("contact")}>Contacto</a>
          </li>
        </ul>

        <div
          className={`backdrop ${menuOpen ? "is-open" : ""}`}
          hidden={!menuOpen}
          onClick={handleBackdropClick}
        ></div>

        <div className="nav-actions">
          <SearchBox productos={productos} goToPage={goToPage} />

          <div className="cart-container">
            <div className="cart-icon">
              <i className="fa-solid fa-cart-shopping"></i>
              <span id="cart-count" className="cart-count">
                {cartCount}
              </span>
            </div>

            <div id="cart-dropdown" className="cart-dropdown hidden">
              <div id="cart-items"></div>
              <div className="cart-total">
                <button id="btn-clean-cart" className="btn-clean-cart">
                  Vaciar Carrito
                </button>
                <p>
                  Total: <span id="cart-total">0</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
