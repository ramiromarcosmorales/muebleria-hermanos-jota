import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ContactForm from "./pages/ContactForm";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import useProducts from "./hooks/useProducts";
import useCart from "./hooks/useCart";
import ProductDetail from "./components/ProductDetail";

function App() {
  const [currentPage, setCurrentPage] = useState(
    () => localStorage.getItem("currentPage") || "home"
  );

  useEffect(() => {
    localStorage.setItem("currentPage", currentPage);
    if ("scrollBehavior" in document.documentElement.style) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo(0, 0);
    }
  }, [currentPage]);

  const { productos, loading, error, refetch } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const {
    cart,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
    addToCart,
  } = useCart();

  const goToPage = (page, product = null) => {
    setCurrentPage(page);
    if (product) {
      setSelectedProduct(product);
    }
  };

  const PAGES = {
    home: (
      <Home
        goToPage={goToPage}
        productos={productos}
        loading={loading}
        error={error}
      />
    ),
    catalog: (
      <Catalog
        goToPage={goToPage}
        productos={productos}
        loading={loading}
        error={error}
        refetch={refetch}
        addToCart={addToCart}
      />
    ),
    productDetail: (
      <ProductDetail
        product={selectedProduct}
        goToPage={goToPage}
        addToCart={addToCart}
      />
    ),
    contact: <ContactForm />,
  };

  return (
    <>
      <Navbar
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
        goToPage={goToPage}
        productos={productos}
      />
      <main>{PAGES[currentPage] || PAGES["home"]}</main>
      <Footer />
    </>
  );
}

export default App;
