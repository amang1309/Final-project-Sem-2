/* ============================================================
   cart.js
   The original cart.html just showed two hardcoded rows of fake
   data — it never actually reflected what you'd clicked "Add to
   Cart" on. This version reads the REAL cart out of localStorage
   (filled in by product.js) and renders it for real, with:
     - a quantity box you can type into to change how many you want
     - a remove button per row
     - a live total
     - a "Checkout" button that clears the cart (simulating an order)
   ============================================================ */

function renderCart() {
  const bodyEl = document.getElementById("cart-body");
  const emptyEl = document.getElementById("cart-empty");
  const tableWrapEl = document.getElementById("cart-table-wrap");
  const totalEl = document.getElementById("cart-total");
  const checkoutBtn = document.getElementById("checkout-btn");
  if (!bodyEl) return;

  const cart = getCart();
  const ids = Object.keys(cart);

  if (ids.length === 0) {
    tableWrapEl.style.display = "none";
    emptyEl.style.display = "block";
    if (checkoutBtn) checkoutBtn.disabled = true;
    return;
  }

  tableWrapEl.style.display = "";
  emptyEl.style.display = "none";
  if (checkoutBtn) checkoutBtn.disabled = false;

  bodyEl.innerHTML = ids
    .map((id) => {
      const product = findProduct(id);
      if (!product) return ""; // product was removed from the catalog
      const qty = cart[id];
      const subtotal = product.price * qty;
      return `
        <tr data-id="${id}">
          <td data-label="Product">${escapeHtml(product.name)}</td>
          <td data-label="Price">${formatPrice(product.price)}</td>
          <td data-label="Quantity">
            <input class="qty-input" type="number" min="1" value="${qty}" />
          </td>
          <td data-label="Subtotal">${formatPrice(subtotal)}</td>
          <td><button class="remove-btn" type="button">Remove</button></td>
        </tr>
      `;
    })
    .join("");

  totalEl.textContent = formatPrice(getCartTotal());

  // Wire up each row's quantity box and remove button
  bodyEl.querySelectorAll("tr").forEach((row) => {
    const id = row.dataset.id;

    row.querySelector(".qty-input").addEventListener("change", (e) => {
      const newQty = parseInt(e.target.value, 10) || 0;
      setQuantity(id, newQty);
      renderHeader();
      renderCart();
    });

    row.querySelector(".remove-btn").addEventListener("click", () => {
      removeFromCart(id);
      renderHeader();
      renderCart();
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderCart();

  const checkoutBtn = document.getElementById("checkout-btn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      clearCart();
      renderHeader();
      renderCart();
      showToast("Order placed! Thank you for shopping with us.");
    });
  }
});
