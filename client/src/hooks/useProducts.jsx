import { useEffect, useState } from "react";
import { getJSON } from "../utils/api";

const useProducts = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getJSON("/api/productos")
      .then((data) => {
        setProductos(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error cargando productos:", err);
        setError(err);
        setLoading(false);
      });
  }, []);

  return { productos, loading, error };
};

export default useProducts;
