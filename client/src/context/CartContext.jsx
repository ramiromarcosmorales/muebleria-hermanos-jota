import { createContext, useContext } from "react";
import useCart from "../hooks/useCart";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCartContext = () => useContext(CartContext);
