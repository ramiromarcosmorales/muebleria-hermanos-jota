import { formatPrice } from "./format-price.js";

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartDropdown = document.getElementById("cart-dropdown");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotalEl = document.getElementById("cart-total");
const cartIcon = document.querySelector(".cart-icon");
const cleanCartButton = document.getElementById("btn-clean-cart");

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
    div.setAttribute("data-id", item.id);
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-item-details">
        <span class="cart-item-name">${item.name}</span>
        <div class="cart-item-quantity">
          <span class="item-quantity">${item.quantity}</span>
          <button class="btn-decrease-quantity">-</button>
          <button class="btn-increase-quantity">+</button>
        </div>
      </div>
      <span class="cart-item-price">${formatPrice(item.price * item.quantity)}</span>
      <button data-id="${item.id}"class="btn-clean-product" >❌</button>
    `;
    cartItemsContainer.appendChild(div);
  });

  cartTotalEl.textContent = formatPrice(calcCartTotal());
  
  cleanProduct();
  editQuantity();
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


// Funciones para vaciar carrito

cleanCartButton.addEventListener("click", (e) => {
  cart = [];
  updateCart(); 
  renderCartDropdown();
});


function cleanProduct(){
  const button = document.querySelectorAll(".btn-clean-product");

  button.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      // Se busca contenedor padre con la clase ".cart-item".
      const cartItem = e.target.closest(".cart-item");
      // Se le da a la constante id, el mismo valor que el data-id del div.
      const id = cartItem.dataset.id
      // Filtramos el producto eliminado
      cart = cart.filter((item) => item.id != id);

      // Actualizamos todo (contador, total, localStorage)
      updateCart();
      renderCartDropdown();
    });
  });
}

function editQuantity() {
  const btnDecrease = document.querySelectorAll(".btn-decrease-quantity");
  const btnIncrease = document.querySelectorAll(".btn-increase-quantity");

  btnDecrease.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const cartItem = e.target.closest(".cart-item");
      const id = cartItem.dataset.id;

      const product = cart.find((item) => item.id == id);

      if (product.quantity > 1) {
        product.quantity -= 1;
      } else {
        cart = cart.filter((item) => item.id != id);
      }

      updateCart();
      renderCartDropdown();
    });
  });

  btnIncrease.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const cartItem = e.target.closest(".cart-item");
      const id = cartItem.dataset.id;

      const product = cart.find((item) => item.id == id);

      product.quantity += 1;

      updateCart();
      renderCartDropdown();
    });
  });
}