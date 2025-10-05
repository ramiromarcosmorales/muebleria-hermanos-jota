import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';

function getJSON(url) {
  return fetch(url).then(res => {
    if (!res.ok) throw new Error('Error en la petición');
    return res.json();
  });
}

function CatalogPage() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getJSON('https://muebleria-hermanos-jota-hq26.onrender.com/api/productos')
      .then(data => {
        setProductos(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) {
    return (
      <div className="error-block">
        <p>Error al cargar productos.</p>
        <button onClick={() => window.location.reload()}>Reintentar</button>
      </div>
    );
  }

  return (
    <div className="catalogo-grid">
      {productos.map(producto => (
        <ProductCard key={producto.id} producto={producto} />
      ))}
    </div>
  );
}

export default CatalogPage;