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
  }, [currentPage]);

  const { productos, loading, error, refetch } = useProducts();
  const [selectProduct, setSelectProduct] = useState(null);
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
    catalog: (
      <Catalog
        goToPage={setCurrentPage}
        productos={productos}
        loading={loading}
        error={error}
        refetch={refetch}
      />
    ),
    productDetail: (
      <ProductDetail addToCart={addToCart} product={selectProduct} />
    ),
    contact: <ContactForm />,
  };

  return (
    <>
      <Navbar
        cartCount={cart.length}
        goToPage={setCurrentPage}
        productos={productos}
      />
      <main>{PAGES[currentPage] || PAGES["home"]}</main>
      <Footer />
    </>
  );
}

export default App;
