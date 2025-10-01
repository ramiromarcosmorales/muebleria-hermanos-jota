const Navbar = ({ cartCount, goToPage }: any) => {
  return (
    <header className="index-header">
      <nav className="index-navbar">
        <div className="left">
          <button className="menu-toggle">
            <i className="fa-solid fa-bars"></i>
          </button>
          <a href="./index.html">
            <img
              src="/images/logo.svg"
              alt="Logotipo de Muebleria Hermanos Jota"
              className="navbar-logo"
            />
          </a>
        </div>
        <ul id="primary-menu" className="navlink-container">
          <li>
            <a onClick={() => goToPage("home")}>Inicio</a>
          </li>
          <li>
            <a onClick={() => goToPage("catalog")}>Catálogo</a>
          </li>
          <li>
            <a onClick={() => goToPage("contact")}>Contacto</a>
          </li>
        </ul>
        <div className="backdrop" hidden></div>
        <div className="nav-actions">
          <div className="search-box">
            <i className="fa-solid fa-search"></i>
            <input
              id="search-input"
              type="text"
              placeholder="Buscar muebles..."
            />
            <div id="search-results" className="search-results"></div>
          </div>
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
