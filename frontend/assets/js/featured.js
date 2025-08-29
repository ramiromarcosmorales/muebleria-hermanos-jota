import { products } from "./products.js";

function getProductsAsync() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (products && products.length > 0) {
                resolve(products);
            } else {
                reject("No hay productos disponibles.");
            }
        }, 1000);
    });
}

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

async function initCatalog() {
    const container = document.getElementById("container");
    if (!container) return;

    container.innerHTML = `<p role="status" aria-live="polite">Cargando productos...</p>`

    try {
        const data = await getProductsAsync();
        renderProducts(data, container);
    } catch (e) {
        container.innerHTML = `<p>No hay productos disponibles.</p>`
        console.error("Error: ", e)
    }
}

initCatalog().catch(console.error);