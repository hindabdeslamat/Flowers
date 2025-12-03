 const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.getElementById("cart-container");
  const totalDisplay = document.getElementById("total-price");
  const summarySection = document.getElementById("cart-summary");

  function getProductPrice(title) {
    const prices = { "Flower Pot": 13.99 };
    return prices[title] || 10.00;
  }

  function renderCart() {
    container.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
      container.innerHTML = "<p class='empty-message'>Your cart is empty 🌸</p>";
      summarySection.style.display = "none";
      return;
    }

    cart.forEach((item, index) => {
      const price = getProductPrice(item.title);
      const subtotal = price * item.quantity;
      total += subtotal;

      const itemDiv = document.createElement("div");
      itemDiv.className = "cart-item";

      itemDiv.innerHTML = `
        <span class="cart-item-title">🌷 ${item.title}</span>
        <span class="cart-item-quantity">Qty: ${item.quantity}</span>
        <button class="remove-btn" data-index="${index}">Remove</button>
      `;

      container.appendChild(itemDiv);
    });

    totalDisplay.textContent = `$${total.toFixed(2)}`;
    summarySection.style.display = "block";

    document.querySelectorAll(".remove-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const index = btn.getAttribute("data-index");
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
      });
    });
  }

  document.getElementById("clear-cart-btn").addEventListener("click", () => {
    localStorage.removeItem("cart");
    location.reload();
  });

  renderCart();
