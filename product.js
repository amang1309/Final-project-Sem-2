/* ============================================================
   product.js
   Renders every product in PRODUCTS as a card, and makes the
   "Add to Cart" button actually DO something (the original site's
   button just redirected to cart.html — it didn't add anything).
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  const gridEl = document.getElementById("product-grid");
  if (!gridEl) return;

  gridEl.innerHTML = PRODUCTS.map(
    (p) => `
      <div class="card product-card">
        <div class="img-placeholder">
          <img src="${p.img}" alt="${escapeHtml(p.name)}" style="width:100%; height:160px;" />
        </div>
        <h3>${escapeHtml(p.name)}</h3>
        <p class="muted">${escapeHtml(p.desc)}</p>
        <p class="price">${formatPrice(p.price)}</p>
        <button class="btn add-to-cart-btn" data-id="${p.id}" type="button">Add to Cart</button>
      </div>
    `
  ).join("");

  // One click listener per "Add to Cart" button.
  // Clicking it adds 1 unit of that product to the cart in
  // localStorage, refreshes the cart-count badge in the header,
  // and shows a little "Added to cart" confirmation popup.
  gridEl.querySelectorAll(".add-to-cart-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      addToCart(btn.dataset.id, 1);
      renderHeader(); // redraw header so the cart badge number updates
      const product = findProduct(btn.dataset.id);
      showToast(`Added "${product.name}" to cart`);
    });
  });
});
