import { formatPrice } from "./format-price.js";
import { products } from "./products.js";

const searchInput = document.getElementById("search-input");
const resultsContainer = document.getElementById("search-results");
const searchBox = document.querySelector(".search-box");

const normalizeText = (text) =>
  text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

const openResults = () => resultsContainer.classList.add("is-open");
const closeResults = () => resultsContainer.classList.remove("is-open");

const renderResults = (filteredProducts) => {
  resultsContainer.innerHTML = "";

  if (filteredProducts.length === 0) {
    resultsContainer.innerHTML = `<div class="search-result-empty">No se encontraron productos.</div>`;
    openResults();
    return;
  }

  filteredProducts.forEach((p) => {
    const item = document.createElement("a");
    item.href = `producto.html?id=${p.id}`;
    item.className = "search-result-item";

    item.innerHTML = `
      <img src="${p.srcImg}" alt="${p.nombre}" class="search-result-img" />
      <span class="search-result-name">${p.nombre}</span>
      <span class="search-result-price">${formatPrice(p.precio)}</span>
    `;

    resultsContainer.appendChild(item);
  });

  openResults();
};

searchInput.addEventListener("input", (e) => {
  const query = e.target.value.trim();

  if (query === "") {
    resultsContainer.innerHTML = "";
    closeResults();
    return;
  }

  const filtered = products.filter((p) =>
    normalizeText(p.nombre).includes(normalizeText(query))
  );

  renderResults(filtered);
});

searchInput.addEventListener("focus", () => {
  if (searchInput.value.trim() && resultsContainer.innerHTML) openResults();
});

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeResults();
});

document.addEventListener("click", (e) => {
  if (!searchBox.contains(e.target)) closeResults();
});

resultsContainer.addEventListener("click", (e) => {
  const link = e.target.closest("a.search-result-item");
  if (link) closeResults();
});
