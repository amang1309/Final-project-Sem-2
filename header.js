/* ============================================================
   header.js
   --------------------------------------------------------------
   Every page has an empty <header id="site-header"></header> tag.
   This script fills it in with the same nav bar, so we only have
   to write the header HTML ONCE instead of copy-pasting it into
   5 different files. It also:
     - highlights the link for whatever page you're currently on
     - shows how many items are in the cart (the little badge)
     - shows "Hi, <name>" + Logout if someone is signed in,
       or Sign In / Sign Up links if not
   ============================================================ */

function renderHeader() {
  const headerEl = document.getElementById("site-header");
  if (!headerEl) return;

  const currentPage = document.body.dataset.page; // e.g. "home", "product", "cart"
  const user = getCurrentUser();
  const cartCount = getCartCount();

  const navLink = (href, label, page) =>
    `<a href="${href}" class="${currentPage === page ? "active" : ""}">${label}</a>`;

  const accountHtml = user
    ? `<div class="account-pill">
         <span>Hi, <strong>${escapeHtml(user.name)}</strong></span>
         <button class="link-btn" id="logout-btn" type="button">Log out</button>
       </div>`
    : `<div class="account-pill">
         <a href="signin.html">Sign In</a>
         <span>·</span>
         <a href="signup.html">Sign Up</a>
       </div>`;

  headerEl.innerHTML = `
    <div class="container header-wrap">
      <a href="index.html" class="brand">GADA ELECTRONICS</a>
      <nav class="nav">
        ${navLink("index.html", "Home", "home")}
        ${navLink("product.html", "Products", "product")}
        ${navLink("cart.html", `Cart${cartCount ? ` <span class="cart-badge">${cartCount}</span>` : ""}`, "cart")}
      </nav>
      ${accountHtml}
    </div>
  `;

  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      logout();
      window.location.href = "index.html";
    });
  }
}

// Tiny helper so a user's name can never break the page's HTML
// (basic protection against putting raw "<" or ">" into the page)
function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

// Run as soon as this script loads, on every page
document.addEventListener("DOMContentLoaded", renderHeader);
