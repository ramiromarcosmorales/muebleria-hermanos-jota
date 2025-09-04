import { formatPrice } from "./format-price.js";

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartDropdown = document.getElementById("cart-dropdown");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotalEl = document.getElementById("cart-total");
const cartIcon = document.querySelector(".cart-icon");

const calcCartTotal = (items = cart) => 
  items.reduce((total, item) => total + item.price * item.quantity, 0);

cartCount();

document.addEventListener("click", (e) => {
    if (e.target.closest(".btn-cart")) {
        const btn = e.target.closest(".btn-cart");
        
        const product = {
            id: btn.dataset.id,
            name: btn.dataset.name,
            price: parseFloat(btn.dataset.price),
            image: btn.dataset.image,
            quantity: 1
        };
        
        addToCart(product);
    }
})

function updateCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  cartCount();
  if (!cartDropdown.classList.contains("hidden")) renderCartDropdown();
}


function addToCart(product) {
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push(product);
    }

    updateCart();
}

function cartCount(){
    let count = cart.reduce((acc, item) => acc + item.quantity, 0);
    document.getElementById("cart-count").textContent = count;
}

window.addEventListener("storage", cartCount);


/* Renderizado del desplegable */

const renderCartDropdown = () => {
  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p style='text-align:center; color:#777;'>Carrito vacío</p>";
    cartTotalEl.textContent = formatPrice(0);
    return;
  }

  cart.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-item-details">
        <span>${item.name}</span>
        <span class="cart-item-quantity">x${item.quantity}</span>
      </div>
      <span class="cart-item-price">${formatPrice(item.price * item.quantity)}</span>
      <button>❌</button>
    `;
    cartItemsContainer.appendChild(div);
  });

  cartTotalEl.textContent = formatPrice(calcCartTotal());
}

cartIcon.addEventListener("click", (e) => {
  cartDropdown.classList.toggle("hidden");
  renderCartDropdown();
  e.stopPropagation();
});

document.addEventListener("click", (e) => {
    if (!cartIcon.contains(e.target) && !cartDropdown.contains(e.target)) {
        cartDropdown.classList.add("hidden");
    }
});
