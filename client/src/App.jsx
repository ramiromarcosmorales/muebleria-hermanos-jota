import { ProductsProvider } from "./context/ProductsContext";
import { CartProvider } from "./context/CartContext";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <ProductsProvider>
      <CartProvider>
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </CartProvider>
    </ProductsProvider>
  );
}

export default App;
