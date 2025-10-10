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
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const boxRef = useRef(null);
  const resultsRef = useRef(null);

  const inputId = "searchbox-input";

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
    setSelectedIndex(-1);
    goToPage("productDetail", producto);
    console.log(producto);
  };

  const handleKeyDown = (e) => {
    if (!open || filtered.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) => (prev < filtered.length - 1 ? prev + 1 : 0));
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filtered.length - 1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < filtered.length) {
          handleSelect(filtered[selectedIndex]);
        }
        break;
      case "Escape":
        setOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (boxRef.current && !boxRef.current.contains(event.target)) {
        setOpen(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="search-box" ref={boxRef}>
      <label htmlFor={inputId} className="search-label">
        <i className="fa-solid fa-search" aria-hidden="true"></i>
        <span className="sr-only">Buscar muebles</span>
      </label>
      <input
        id={inputId}
        type="text"
        placeholder="Buscar muebles..."
        value={query}
        onChange={handleChange}
        onFocus={() => query && setOpen(true)}
        onKeyDown={handleKeyDown}
      />
      {open && (
        <div className="search-results is-open" ref={resultsRef}>
          {filtered.length === 0 ? (
            <div className="search-result-empty">
              No se encontraron productos.
            </div>
          ) : (
            filtered.map((p, index) => (
              <div
                key={p.id}
                className={`search-result-item ${
                  index === selectedIndex ? "selected" : ""
                }`}
                onClick={() => handleSelect(p)}
                role="option"
                aria-selected={index === selectedIndex}
                tabIndex={-1}
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
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBox;
