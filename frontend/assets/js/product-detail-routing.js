import { formatPrice } from "./format-price.js";
import { products } from "./products.js";

const params = new URLSearchParams(window.location.search);

const productId = parseInt(params.get("id"));

const product = products.find((p) => p.id === productId);

const detailContainer = document.getElementById("product-detail");
const characteristicsContainer = document.getElementById("product-characteristics")

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
    characteristicsContainer.innerHTML = `
        <div>
          <h2>Características del producto</h2>
        </div>
        <div>
          <div>
            <p>DIMENSIONES</p>
            <p>${product.dimensiones}</p>
          </div>
          <div>
            <p>MATERIAL</p>
            <p>${product.material}</p>
          </div>
          <div>
            <p>COLOR</p>
            <p>${product.color}</p>
          </div>
          <div>
            <p>PESO</p>
            <p>${product.peso}</p>
          </div>
          <div>
            <p>CAPACIDAD</p>
            <p>${product.capacidad}</p>
          </div>
          <div>
            <p>ESTILO</p>
            <p>${product.estilo}</p>
          </div>
          <div>
            <p>GARANTIA</p>
            <p>${product.garantia}</p>
          </div>
          <div>
            <p>ORIGEN</p>
            <p>${product.origen}</p>
          </div>
        </div>
      `;
} else {
  detailContainer.innerHTML = `<p>Producto no encontrado</p>`;
}
