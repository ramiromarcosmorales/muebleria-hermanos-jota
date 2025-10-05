import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ContactForm from "./components/ContactForm";
import Home from "./pages/Home";
import useProducts from "./hooks/useProducts";
import useCart from "./hooks/useCart";
import ProductDetail from "./components/ProductDetail";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectProduct, setSelectProduct] = useState(null);
  const { productos, loading, error } = useProducts();
  const { cart, addToCart, removeFromCart, clearCart } = useCart();

  const goToPage = (page, product = null) => {
    setCurrentPage(page);
    if (product) {
      setSelectProduct(product);
    }
  };

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
    productDetail: (
      <ProductDetail addToCart={addToCart} product={selectProduct} />
    ),
    contact: <ContactForm />,
  };

  return (
    <>
      <Navbar cartCount={cart.length} goToPage={goToPage} />
      <main>{PAGES[currentPage] || PAGES["home"]}</main>
      <Footer />
    </>
  );
}

export default App;
