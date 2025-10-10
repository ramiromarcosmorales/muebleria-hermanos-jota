const Footer = () => {
  return (
    <footer>
      <ul>
        <li className="footer-link">
          <a href="#" aria-label="Ir a navegación">
            Navegación
          </a>
        </li>
        <li className="footer-link">
          <a href="#" aria-label="Ir a legal">
            Legal
          </a>
        </li>
      </ul>
      <ul>
        <li className="footer-icon">
          <a href="#" aria-label="Ir a instagram">
            <i className="fa-brands fa-instagram"></i>
          </a>
        </li>
        <li className="footer-icon">
          <a href="#" aria-label="Ir a facebook">
            <i className="fa-brands fa-facebook"></i>
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
