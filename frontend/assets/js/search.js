import { products } from "./products.js";

const searchInput = document.getElementById("search-input");
const resultsContainer = document.getElementById("search-results");

const normalizeText = (text) => {
  return text
    .normalize("NFD")           
    .replace(/[\u0300-\u036f]/g, "") 
    .toLowerCase();         
}

const renderResults = (filteredProducts) => {
  resultsContainer.innerHTML = "";

  if (filteredProducts.length === 0) {
    resultsContainer.innerHTML = `
      <div class="search-result-empty">No se encontraron productos.</div>
    `;
    return;
  }

  filteredProducts.forEach(p => {
    const item = document.createElement("a");
    item.href = `producto.html?id=${p.id}`;
    item.classList.add("search-result-item");

    item.innerHTML = `
      <img src="${p.srcImg}" alt="${p.nombre}" class="search-result-img" />
      <span class="search-result-name">${p.nombre}</span>
      <span class="search-result-price">$${p.precio}</span>
    `;

    resultsContainer.appendChild(item);
  });
}

searchInput.addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase().trim();

  if (query === "") {
    resultsContainer.innerHTML = "";
    return;
  }

  const filtered = products.filter(p =>
   normalizeText(p.nombre).includes(normalizeText(query))
  );

  renderResults(filtered);
});
