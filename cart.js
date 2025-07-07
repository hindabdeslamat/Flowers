document.addEventListener("DOMContentLoaded", () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.getElementById("cart-container");
  const totalDisplay = document.getElementById("total-price");

  function renderCart() {
    container.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
      container.innerHTML = `<p class="empty-message">Your cart is empty 🌸</p>`;
      totalDisplay.textContent = "$0.00";
      return;
    }

    cart.forEach((item, index) => {
      const price = getProductPrice(item.title);
      const subtotal = price * item.quantity;
      total += subtotal;

      const itemDiv = document.createElement("div");
      itemDiv.classList.add("cart-item");

      itemDiv.innerHTML = `
        <div class="cart-item-title">🌷 ${item.title}</div>
        <div class="cart-item-quantity">x ${item.quantity}</div>
        <button class="remove-btn" data-index="${index}">Remove</button>
      `;

      container.appendChild(itemDiv);
    });

    totalDisplay.textContent = `$${total.toFixed(2)}`;
  }

  // Price function (you can improve it by linking real prices)
  function getProductPrice(title) {
    const prices = {
      "Flower Pot": 13.99,
    };
    return prices[title] || 10.00; // Default price
  }

  // Remove one item
  container.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-btn")) {
      const index = e.target.getAttribute("data-index");
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    }
  });

  // Clear all
  document.querySelector(".clear-cart-btn").addEventListener("click", () => {
    localStorage.removeItem("cart");
    location.reload();
  });

  renderCart();
});
