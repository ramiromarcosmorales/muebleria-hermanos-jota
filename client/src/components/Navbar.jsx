import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import SearchBox from "./SearchBox";
import CartDropdown from "./CartDropdown";
import { useCartContext } from "../context/CartContext";
import { useProductsContext } from "../context/ProductsContext";
import { useAuthContext } from "../context/AuthContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const cartRef = useRef(null);
  const userMenuRef = useRef(null);

  const { cart } = useCartContext();
  const { productos } = useProductsContext();
  const location = useLocation();

  const { currentUser, logout } = useAuthContext();

  // Ajusta variable CSS --header-h
  useEffect(() => {
    const setHeaderHeightVar = () => {
      const h = headerRef.current?.offsetHeight || 56;
      document.documentElement.style.setProperty("--header-h", `${h}px`);
    };
    setHeaderHeightVar();
    window.addEventListener("resize", setHeaderHeightVar);
    return () => window.removeEventListener("resize", setHeaderHeightVar);
  }, []);

  // Cierra menú con Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setCartOpen(false);
        setUserMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Cierra menú y carrito si se hace click afuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
      if (cartRef.current && !cartRef.current.contains(e.target)) {
        setCartOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Cierra menú automáticamente al cambiar de ruta
  useEffect(() => {
    setMenuOpen(false);
    setUserMenuOpen(false);
    setCartOpen(false);
  }, [location]);

  const cartCount = cart.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <header className="index-header" ref={headerRef}>
      <nav className="index-navbar">
        <div className="left">
          <button
            className="menu-toggle"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menú de navegación"
          >
            <i className="fa-solid fa-bars"></i>
          </button>
          <Link to="/">
            <img
              src="/images/logo.svg"
              alt="Logotipo de Muebleria Hermanos Jota"
              className="navbar-logo"
            />
          </Link>
        </div>

        <ul
          ref={menuRef}
          className={`navlink-container ${menuOpen ? "is-open" : ""}`}
        >
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="productos">Catálogo</Link>
          </li>
          <li>
            <Link to="contacto">Contacto</Link>
          </li>
        </ul>

        <div
          className={`backdrop ${menuOpen ? "is-open" : ""}`}
          hidden={!menuOpen}
        ></div>

        <div className="nav-actions">
          <SearchBox productos={productos} />
          <div
            className="cart-container"
            ref={cartRef}
            role="button"
            tabIndex={0}
            aria-label="Abrir carrito de compras"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                e.stopPropagation();
                setCartOpen((prev) => !prev);
              }
            }}
          >
            <div
              className="cart-icon"
              onClick={(e) => {
                e.stopPropagation();
                setCartOpen((prev) => !prev);
              }}
            >
              <i className="fa-solid fa-cart-shopping"></i>
              <span className="cart-count">{cartCount}</span>
            </div>

            {cartOpen && <CartDropdown cart={cart} />}
          </div>
          <div className="nav-auth">
            {!currentUser ? (
              <div className="auth-guest">
                {/* VERSION DESKTOP: Botones con texto */}
                <div className="desktop-auth">
                  <Link to="/login" className="btn-text">
                    Ingresar
                  </Link>
                  <Link to="/registro" className="btn-primary">
                    Registrarse
                  </Link>
                </div>

                {/* VERSION MOBILE: Solo ícono de usuario */}
                <Link
                  to="/login"
                  className="mobile-auth-icon"
                  aria-label="Ingresar a mi cuenta"
                >
                  <i className="fa-regular fa-user"></i>
                </Link>
              </div>
            ) : (
              <div className="user-menu-container" ref={userMenuRef}>
                <button
                  className="user-trigger"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                >
                  <div className="avatar-circle">
                    {currentUser.username.charAt(0).toUpperCase()}
                  </div>
                  <span className="username-text">{currentUser.username}</span>
                  <i
                    className={`fa-solid fa-chevron-down ${userMenuOpen ? "rotate" : ""}`}
                  ></i>
                </button>

                {/* Dropdown de Usuario */}
                {userMenuOpen && (
                  <div className="user-dropdown">
                    <div className="dropdown-header">
                      <p className="u-name">{currentUser?.username}</p>
                      <p className="u-role">
                        {currentUser?.isAdmin ? "Admin" : "Cliente"}
                      </p>
                    </div>
                    <hr />
                    <ul className="dropdown-list">
                      {currentUser?.isAdmin && (
                        <li>
                          <Link to="/admin/crear-producto">
                            <i className="fa-solid fa-gear"></i> Panel Admin
                          </Link>
                        </li>
                      )}
                      <li>
                        <button onClick={logout} className="logout-btn">
                          <i className="fa-solid fa-arrow-right-from-bracket"></i>{" "}
                          Cerrar sesión
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
