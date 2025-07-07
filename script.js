document.addEventListener("DOMContentLoaded", () => {
    const addCartButtons = document.querySelectorAll(".cart-btn");
    const cartIcon = document.querySelector(".fa-shopping-cart");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function updateCartCount() {
      let countBadge = document.querySelector(".cart-count");
      if (countBadge) {
        countBadge.textContent = cart.reduce((total, item) => total + item.quantity, 0);
      }
    }

    updateCartCount();

  

    addCartButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const productBox = btn.closest(".box");
        const title = productBox.querySelector("h3").innerText;

        const existingProduct = cart.find(p => p.title === title);
        if (existingProduct) {
          existingProduct.quantity += 1;
        } else {
          cart.push({ title, quantity: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
        alert(`${title} added to cart!`);
      });
    });
});
// Update cart count on page load
// This ensures the cart count is displayed correctly when the page loads
  document.addEventListener("DOMContentLoaded", () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const countSpan = document.querySelector(".cart-count");
  if (countSpan) {
    countSpan.textContent = cart.reduce((total, item) => total + item.quantity, 0);
  }
});
const userIcon = document.getElementById('user-icon');
const dropdown = document.getElementById('user-dropdown');

userIcon.addEventListener('click', (e) => {
  e.preventDefault();
  dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
});

document.addEventListener('click', (e) => {
  if (!userIcon.contains(e.target) && !dropdown.contains(e.target)) {
    dropdown.style.display = 'none';
  }
});
  document.getElementById("contact-form").addEventListener("submit", function(e) {
    e.preventDefault(); // prevent reload

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message").value.trim();
    const msg = document.getElementById("form-msg");

    if (name === "" || email === "" || phone === "" || message === "") {
      msg.style.color = "red";
      msg.textContent = "Please fill in all fields.";
    } else {
      msg.style.color = "green";
      msg.textContent = "Your message has been sent successfully!";
      this.reset();
    }
  });
document.getElementById("contact-form").addEventListener("submit", function(event) {
  event.preventDefault();

  const form = event.target;
  const msg = document.getElementById("form-msg");

  const data = new FormData(form);

  fetch("https://formspree.io/f/mzzglbaz", {
    method: "POST",
    body: data,
    headers: {
      'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      msg.textContent = "✅ Message sent! We will reply soon.";
      msg.style.color = "green";
      form.reset();
    } else {
      msg.textContent = "❌ Error! Please try again.";
      msg.style.color = "red";
    }
  }).catch(error => {
    msg.textContent = "❌ Network error.";
    msg.style.color = "red";
  });
});
