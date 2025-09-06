import { formatPrice } from "./format-price.js";
import { products } from "./products.js";

const params = new URLSearchParams(window.location.search);

const productId = parseInt(params.get("id"));

const product = products.find((p) => p.id === productId);

const detailContainer = document.getElementById("product-detail");
const characteristicsContainer = document.getElementById("product-characteristics")

if (product) {
  detailContainer.innerHTML = `
    <div class="product-detail-container">
        <div class="product-image">
            <img src="${product.srcImg}" alt="${product.descripcion}">
        </div>
        <div class="product-info">
            <a href="productos.html" class="back-link">← Volver a productos</a>
            <h1 class="product-title">${product.nombre}</h1>
            <p class="product-price">${formatPrice(product.precio)}</p>
            <p class="product-stock">En stock - Envío en 3-5 días hábiles</p>
            <p class="product-description">${product.descripcion}</p>
            <button class="btn-cart add-to-cart"
                        data-id="${product.id}"
                        data-name="${product.nombre}"
                        data-price="${product.precio}"
                        data-image="${product.srcImg}">
                  Agregar al carrito
            </button>
        </div>
    </div>
  `;

  characteristicsContainer.innerHTML = `
    <div class="product-characteristics">
      <h2>Características del producto</h2>
      <div class="characteristics-grid">
        <div><p class="char-title">DIMENSIONES</p><p>${product.dimensiones}</p></div>
        <div><p class="char-title">MATERIAL</p><p>${product.material}</p></div>
        <div><p class="char-title">COLOR</p><p>${product.color}</p></div>
        <div><p class="char-title">PESO</p><p>${product.peso}</p></div>
        <div><p class="char-title">CAPACIDAD</p><p>${product.capacidad}</p></div>
        <div><p class="char-title">ESTILO</p><p>${product.estilo}</p></div>
        <div><p class="char-title">GARANTÍA</p><p>${product.garantia}</p></div>
        <div><p class="char-title">ORIGEN</p><p>${product.origen}</p></div>
      </div>
    </div>
  `;
} else {
  detailContainer.innerHTML = `<p>Producto no encontrado</p>`;
}
