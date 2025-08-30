import { formatPrice } from "./format-price.js";
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
  let productsHtml = "";

  products.forEach((p) => {
    productsHtml += `
            <article>
                <h3>${p.nombre}</h3>
                <img src="${p.srcImg}" alt="${p.nombre}" />
                <p>Precio: ${formatPrice(p.precio)}</p>
                <a href="producto.html?id=${
                  p.id
                }" class="product-button">Ver Producto</a>
            </article>
        `;
  });
  container.innerHTML = productsHtml;
}

async function initCatalog() {
  const container = document.getElementById("container");
  if (!container) return;

  container.innerHTML = `<p role="status" aria-live="polite">Cargando productos...</p>`;

  try {
    const data = await getProductsAsync();
    renderProducts(data, container);
  } catch (e) {
    container.innerHTML = `<p>No hay productos disponibles.</p>`;
    console.error("Error: ", e);
  }
}

initCatalog().catch(console.error);
