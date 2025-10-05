import { useState, useRef, useEffect } from "react";
import { formatPrice } from "../utils/format-price";

const normalizeText = (text) =>
  text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

const SearchBox = ({ productos, goToPage }) => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const boxRef = useRef(null);

  const filtered = productos.filter((p) =>
    normalizeText(p.nombre).includes(normalizeText(query))
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setOpen(value.trim() !== "");
  };

  const handleSelect = (producto) => {
    setQuery("");
    setOpen(false);
    goToPage("productDetail", producto);
    console.log(producto);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (boxRef.current && !boxRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="search-box" ref={boxRef}>
      <i className="fa-solid fa-search"></i>
      <input
        type="text"
        placeholder="Buscar muebles..."
        value={query}
        onChange={handleChange}
        onFocus={() => query && setOpen(true)}
        onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
      />
      {open && (
        <div className="search-results is-open">
          {filtered.length === 0 ? (
            <div className="search-result-empty">
              No se encontraron productos.
            </div>
          ) : (
            filtered.map((p) => (
              <a
                key={p.id}
                className="search-result-item"
                onClick={() => handleSelect(p)}
              >
                <img
                  src={p.srcImg}
                  alt={p.nombre}
                  className="search-result-img"
                />
                <span className="search-result-name">{p.nombre}</span>
                <span className="search-result-price">
                  {formatPrice(p.precio)}
                </span>
              </a>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBox;
