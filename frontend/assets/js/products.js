async function getProducts() {
  return fetch("./assets/js/products.json").then((response) => response.json());
}

export const products = await getProducts();
