import { products } from "./products.js";

function renderProducts(products, container) {
    let productsHtml = '';
    products.forEach(p => {
        productsHtml += 
        `
            <article>
                <h3>${p.nombre}</h3>
                <img src="${p.srcImg}" alt="${p.nombre}" />
                <p>Precio: $${p.precio}</p>
                <a href="producto.html?id=${p.id}" class="product-button">Ver Producto</a>
            </article>
        `;
    });
    container.innerHTML = productsHtml;
}

function initCatalog() {
    const container = document.getElementById("container");
    renderProducts(products, container);
}

document.addEventListener("DOMContentLoaded", initCatalog);