import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  const [cart] = useState([]);

  return (
    <>
      <Navbar cartCount={cart.length} />
      <Footer />
    </>
  );
}

export default App;
