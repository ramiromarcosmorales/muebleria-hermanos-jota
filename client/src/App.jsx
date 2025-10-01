import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { getJSON } from "./utils/api";

getJSON("/api/productos").then(console.log);

function App() {
  const [cart] = useState([]);
  const [currentPage, setCurrentPage] = useState("home");

  function renderPage() {
    let pageToRender = null;
    switch (currentPage) {
      case "home":
        pageToRender = <h1>HOME</h1>;
        break;
      case "catalog":
        pageToRender = <h1>CATALOG</h1>;
        break;
      case "productDetail":
        pageToRender = <h1>PRODUCT DETAIL</h1>;
        break;
      case "contact":
        pageToRender = <h1>CONTACT</h1>;
        break;
      default:
        pageToRender = <h1>HOME</h1>;
        break;
    }
    return pageToRender;
  }

  return (
    <>
      <Navbar cartCount={cart.length} changePageFn={setCurrentPage} />
      {renderPage()}
      <Footer />
    </>
  );
}

export default App;
