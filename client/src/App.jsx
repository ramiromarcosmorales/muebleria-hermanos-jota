import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { getJSON } from "./utils/api";

getJSON("/api/productos").then(console.log);

function App() {
  const [cart] = useState([]);
  const [currentPage, setCurrentPage] = useState("sdsadsadsadsa");

  const PAGES = {
    home: <h1>HOME</h1>,
    catalog: <h1>CATALOG</h1>,
    productDetail: <h1>PRODUCT DETAIL</h1>,
    contact: <h1>CONTACT</h1>,
  };

  return (
    <>
      <Navbar
        cartCount={cart.length}
        goToHome={() => setCurrentPage("home")}
        goToCatalog={() => setCurrentPage("catalog")}
        goToContact={() => setCurrentPage("contact")}
      />
      {PAGES[currentPage] || <h1>HOME</h1>}
      <Footer />
    </>
  );
}

export default App;
