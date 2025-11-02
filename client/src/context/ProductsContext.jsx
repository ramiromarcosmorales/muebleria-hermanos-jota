import { createContext, useContext } from "react";
import useProducts from "../hooks/useProducts";

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const { productos, loading, error, refetch } = useProducts();
  return (
    <ProductsContext.Provider value={{ productos, loading, error, refetch }}>
      {children}
    </ProductsContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useProductsContext = () => useContext(ProductsContext);
