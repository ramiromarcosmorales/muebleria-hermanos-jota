import { products } from "./products.js";

function renderProducts(products, container) {
    let productsHtml = '';

    products.filter(p => p.destacado).forEach(p => {
            productsHtml += 
            `
                <div class="products-card">
                    <img src="${p.srcImg}" alt="${p.nombre}"/>
                    <p>${p.nombre}</p>
                    <p class="products-precio">$${p.precio}</p>
                    <a href="producto.html?id=${p.id}" class="featured-product-button">Ver Producto</a>
                </div>
            `
    });
    container.innerHTML = productsHtml;
}

function initCatalog() {
    const container = document.getElementById("container");
    renderProducts(products, container);
}

document.addEventListener("DOMContentLoaded", initCatalog);