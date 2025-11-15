import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import ContactForm from "./pages/ContactForm";
import ProductDetail from "./pages/ProductDetail";
import ProductForm from "./pages/ProductForm";
import NotFound from "./pages/NotFound";
import "./styles/global.css";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Checkout from "./pages/Checkout";
import Confirmation from "./pages/Confirmation";

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
      { path: "admin/editar-producto/:id", element: <ProductForm /> },
      { path: "registro", element: <Registration /> },
      { path: "login", element: <Login /> },
      { path: "checkout", element: <Checkout /> },
      { path: "confirmacion/:id", element: <Confirmation /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
