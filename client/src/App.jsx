import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { getJSON } from "./utils/api";

getJSON("/api/productos").then(console.log);

function App() {
  const [cart, setCart] = useState([]);

  function addToCart(product) {
    let newCart = Array.from(cart);
    newCart.push(product);
    setCart(newCart);
  }

  function removeFromCart(id) {
    let newCart = Array.from(cart);
    newCart = newCart.filter((product) => product.id !== id);
    setCart(newCart);
  }

  function clearCart() {
    setCart([]);
  }

  return (
    <>
      <Navbar cartCount={cart.length} />
      <Footer />
    </>
  );
}

export default App;
