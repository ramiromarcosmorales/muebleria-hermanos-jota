import { ProductsProvider } from "./context/ProductsContext";
import { CartProvider } from "./context/CartContext";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <ProductsProvider>
        <CartProvider>
          <Navbar />
          <main>
            <Outlet />
          </main>
          <Footer />
        </CartProvider>
      </ProductsProvider>
    </AuthProvider>
  );
}

export default App;
