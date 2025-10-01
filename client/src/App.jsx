import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { getJSON } from "./utils/api";

getJSON("/api/productos").then(console.log);

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
