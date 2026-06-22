/* ============================================================
   toast.js
   A tiny reusable "popup message" that slides up from the bottom
   of the screen for a couple of seconds — used for things like
   "Added to cart!". Every page includes one empty <div id="toast">
   in its HTML; this script just fills it in and shows/hides it.
   ============================================================ */

function showToast(message) {
  let toastEl = document.getElementById("toast");

  // If a page forgot to add the <div id="toast">, create one on the fly
  if (!toastEl) {
    toastEl = document.createElement("div");
    toastEl.id = "toast";
    toastEl.className = "toast";
    document.body.appendChild(toastEl);
  }

  toastEl.textContent = message;
  toastEl.classList.add("show");

  clearTimeout(toastEl._hideTimer);
  toastEl._hideTimer = setTimeout(() => {
    toastEl.classList.remove("show");
  }, 2000);
}
