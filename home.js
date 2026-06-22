/* ============================================================
   home.js
   Fills in the hero card and the "Featured Categories" grid using
   the same PRODUCTS array that the Products page uses, so the
   Home page never goes out of sync with what's actually for sale.
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  // --- Hero card: just feature the first product in the list ---
  const hero = PRODUCTS[0];
  const heroEl = document.getElementById("hero-product");
  if (hero && heroEl) {
    heroEl.innerHTML = `
      <div class="img-placeholder">
        <img src="${hero.img}" alt="${escapeHtml(hero.name)}" style="width:160px; height:160px;" />
      </div>
      <h3>${escapeHtml(hero.name)}</h3>
      <p class="muted">${escapeHtml(hero.desc)}</p>
    `;
  }

  // --- Featured categories: just show the first 3 products as a taste of the catalog ---
  const gridEl = document.getElementById("featured-grid");
  if (gridEl) {
    gridEl.innerHTML = PRODUCTS.slice(0, 3)
      .map(
        (p) => `
        <div class="card">
          <div class="img-placeholder">
            <img src="${p.img}" alt="${escapeHtml(p.name)}" style="width:100%; height:160px;" />
          </div>
          <p>${escapeHtml(p.desc)}</p>
        </div>
      `
      )
      .join("");
  }
});
