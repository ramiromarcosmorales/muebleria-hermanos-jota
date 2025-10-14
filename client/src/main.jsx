import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import ContactForm from "./pages/ContactForm";
import ProductDetail from "./pages/ProductDetail";
import ProductForm from "./pages/ProductForm";
import "./styles/global.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "productos", element: <Catalog /> },
      { path: "contacto", element: <ContactForm /> },
      { path: "producto/:id", element: <ProductDetail /> },
      { path: "admin/crear-producto", element: <ProductForm /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
