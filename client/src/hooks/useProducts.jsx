import { useEffect, useState } from "react";
import { getAllProducts } from "../services/productService";

const useProducts = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getAllProducts();
      setProductos(data);
    } catch (err) {
      console.error("Error cargando productos:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { productos, loading, error, refetch: fetchProducts };
};

export default useProducts;
