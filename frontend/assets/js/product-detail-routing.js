import { formatPrice } from "./format-price.js";
import { products } from "./products.js";

const params = new URLSearchParams(window.location.search);

const productId = parseInt(params.get("id"));

const product = products.find((p) => p.id === productId);

const detailContainer = document.getElementById("product-detail");

if (product) {
  detailContainer.innerHTML = `
        <div>
            <img src=${product.srcImg} alt=${product.descripcion}>
        </div>
        <div>
            <a href="productos.html">← Volver a productos</a>
            <h2>${product.nombre}</h2>
            <p>Precio: ${formatPrice(product.precio)}</p>
            <p>En stock - Envío en 3-5 días hábiles</p>
            <p>${product.descripcion}</p>
            <button class="btn-cart">Agregar al carrito</button>
        </div>
      `;
} else {
  detailContainer.innerHTML = `<p>Producto no encontrado</p>`;
}
