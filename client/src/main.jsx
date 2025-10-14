import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import ContactForm from "./pages/ContactForm";
import ProductDetail from "./pages/ProductDetail";
import "./styles/global.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "catalogo", element: <Catalog /> },
      { path: "contacto", element: <ContactForm /> },
      { path: "producto/:id", element: <ProductDetail /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
