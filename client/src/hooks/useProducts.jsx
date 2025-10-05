import { useEffect, useState } from "react";
import { getJSON } from "../utils/api";

const useProducts = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = () => {
    setLoading(true);
    setError(null);

    getJSON("/api/productos")
      .then((data) => {
        setProductos(data);
      })
      .catch((err) => {
        console.error("Error cargando productos:", err);
        setError(err);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { productos, loading, error, refetch: fetchProducts };
};

export default useProducts;
