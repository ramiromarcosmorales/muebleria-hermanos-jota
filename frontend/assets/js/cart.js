import { formatPrice } from "./format-price.js";

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartDropdown = document.getElementById("cart-dropdown");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotalEl = document.getElementById("cart-total");
const cartIcon = document.querySelector(".cart-icon");
const cleanCartButton = document.getElementById("btn-clean-cart");

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


function addToCart(product) {
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    cartCount();
}


function cartCount(){
    let count = cart.reduce((acc, item) => acc + item.quantity, 0);
    document.getElementById("cart-count").innerText = count;
}

window.addEventListener("storage", cartCount);



/* Renderizado del desplegable */

const renderCartDropdown = () => {
  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p style='text-align:center; color:#777;'>Carrito vacío</p>";
    cartTotalEl.innerText = "0";
    return;
  }

  cart.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.setAttribute("data-id", item.id);
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-item-details">
        <span>${item.name}</span>
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
  // Se vacia el array
  cart = [];
  // Se actualiza el LocalStorage
  localStorage.setItem("cart", JSON.stringify(cart));
  // Se actualiza el CONTENIDO MOSTRADO EN EL CARRITO
  cartItemsContainer.innerHTML = "";
  // Se resetea el contador de carrito
  document.getElementById("cart-count").innerText = 0;
});


function cleanProduct(){
  const button = document.querySelectorAll(".btn-clean-product");

  button.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      // Se busca contenedor padre con la clase ".cart-item".
      const cartItem = e.target.closest(".cart-item");
      // Se le da a la constante id, el mismo valor que el data-id del div.
      const id = cartItem.dataset.id
      // Se elimina contenedor del producto seleccionado.
      cartItem.remove();
      // Se crea un nuevo array con los productos que no igualen el id del podcuto eliminado
      cart = cart.filter((item) => item.id != id);
      // Se actualiza el localStorage
      localStorage.setItem("cart", JSON.stringify(cart));
    });
  });
}

function editQuantity(){
  const btnDecrease = document.querySelectorAll(".btn-decrease-quantity");
  const btnIncrease = document.querySelectorAll(".btn-increase-quantity");
  const cartCount = document.getElementById("cart-count");

  btnDecrease.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const cartItem = e.target.closest(".cart-item");
      const id = cartItem.dataset.id;
      const quantitySpan = cartItem.querySelector(".item-quantity");

      const product = cart.find((item) => item.id == id);
  
      if (product.quantity > 1){
        product.quantity -= 1;
        quantitySpan.textContent = `${product.quantity}`;
        // Se actualica el contador del carrito
        cartCount.innerText = parseInt(cartCount.innerText) - 1;
      } else {
        cart = cart.filter((item) => item.id != id);
        cartItem.remove();
        // Se actualiza el contador de carrito
        cartCount.innerText = parseInt(cartCount.innerText) - 1;
      }
      localStorage.setItem("cart", JSON.stringify(cart));
    })
  });

  btnIncrease.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const cartItem = e.target.closest(".cart-item");
      const id = cartItem.dataset.id;
      const quantitySpan = cartItem.querySelector(".item-quantity");

      const product = cart.find((item) => item.id == id);

      product.quantity += 1;
      quantitySpan.textContent = `${product.quantity}`
      // Se actualiza el contador del carrito
      cartCount.innerText = parseInt(cartCount.innerText) + 1;

      localStorage.setItem("cart", JSON.stringify(cart));
    })
  });
}