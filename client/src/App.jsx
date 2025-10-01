import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { getJSON } from "./utils/api";

getJSON("/api/productos").then(console.log);

function App() {
  const [cart, setCart] = useState([]);
  const [currentPage, setCurrentPage] = useState("home");

  const PAGES = {
    home: <h1>HOME</h1>,
    catalog: <h1>CATALOG</h1>,
    productDetail: <h1>PRODUCT DETAIL</h1>,
    contact: <h1>CONTACT</h1>,
  };

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
      <Navbar cartCount={cart.length} goToPage={setCurrentPage} />
      {PAGES[currentPage] || PAGES["home"]}
      <Footer />
    </>
  );
}

export default App;
