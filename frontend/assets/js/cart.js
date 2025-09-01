let cart = JSON.parse(localStorage.getItem("cart")) || [];

cartCount();


document.addEventListener("click", (e) => {
    if (e.target.closest(".btn-cart")) {
        const btn = e.target.closest(".btn-cart");
        
        const product = {
            id: btn.dataset.id,
            name: btn.dataset.name,
            price: parseFloat(btn.dataset.price),
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
