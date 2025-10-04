import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ContactForm from "./components/ContactForm";
import Home from "./pages/Home";
import useProducts from "./hooks/useProducts";
import useCart from "./hooks/useCart";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const { productos, loading, error } = useProducts();
  const { cart, addToCart, removeFromCart, clearCart } = useCart();

  const PAGES = {
    home: (
      <Home
        goToPage={setCurrentPage}
        productos={productos}
        loading={loading}
        error={error}
      />
    ),
    catalog: <h1>CATALOG</h1>,
    productDetail: <h1>PRODUCT DETAIL</h1>,
    contact: <ContactForm />,
  };

  return (
    <>
      <Navbar cartCount={cart.length} goToPage={setCurrentPage} />
      <main>{PAGES[currentPage] || PAGES["home"]}</main>
      <Footer />
    </>
  );
}

export default App;
