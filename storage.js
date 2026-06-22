/* ============================================================
   storage.js
   --------------------------------------------------------------
   WHY THIS FILE EXISTS:
   A real shopping site keeps the cart and user accounts on a
   server/database. This project has no server, so instead we use
   the browser's built-in "localStorage" — a small key/value
   storage area that belongs to this site and survives page
   reloads (it's how the cart "remembers" items when you click
   from Products to Cart).

   localStorage can only store TEXT, so every time we save an
   object/array we convert it to text with JSON.stringify(), and
   every time we read it back we convert it back with
   JSON.parse().

   This file has two jobs:
     1. CART  – add/remove/update items, read totals.
     2. AUTH  – a *very* simplified stand-in for login, storing
        the list of signed-up users and who is currently logged in.

   Note for learners: storing passwords in plain text in
   localStorage is NOT secure and is only OK because this is a
   practice project with no real backend. A real site must hash
   passwords on a server and never store them in the browser.
   ============================================================ */

const CART_KEY = "gada_cart"; // { [productId]: quantity }
const USERS_KEY = "gada_users"; // array of { name, email, phone, password }
const SESSION_KEY = "gada_current_user"; // email of the logged-in user

/* ---------------------- CART ---------------------- */

// Read the cart object out of localStorage (or {} if there isn't one yet)
function getCart() {
  const raw = localStorage.getItem(CART_KEY);
  return raw ? JSON.parse(raw) : {};
}

// Save the cart object back into localStorage
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

// Add 1 (or `qty`) of a product to the cart. If it's already in the
// cart, we just increase the quantity instead of duplicating it.
function addToCart(productId, qty = 1) {
  const cart = getCart();
  cart[productId] = (cart[productId] || 0) + qty;
  saveCart(cart);
}

// Set the exact quantity for a product (used by the number input on
// the Cart page). Removing it entirely if the quantity drops to 0.
function setQuantity(productId, qty) {
  const cart = getCart();
  if (qty <= 0) {
    delete cart[productId];
  } else {
    cart[productId] = qty;
  }
  saveCart(cart);
}

// Remove a product from the cart completely
function removeFromCart(productId) {
  const cart = getCart();
  delete cart[productId];
  saveCart(cart);
}

// Empty the cart (used after "checkout")
function clearCart() {
  saveCart({});
}

// Total number of items in the cart (used for the badge in the header)
function getCartCount() {
  const cart = getCart();
  return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
}

// Total price of everything in the cart
function getCartTotal() {
  const cart = getCart();
  let total = 0;
  for (const id in cart) {
    const product = findProduct(id);
    if (product) total += product.price * cart[id];
  }
  return total;
}

/* ---------------------- AUTH ---------------------- */

function getUsers() {
  const raw = localStorage.getItem(USERS_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// Look up a user by email (used during sign in and to block duplicate sign-ups)
function findUserByEmail(email) {
  return getUsers().find((u) => u.email.toLowerCase() === email.toLowerCase());
}

// Add a brand-new user to the saved list
function registerUser(user) {
  const users = getUsers();
  users.push(user);
  saveUsers(users);
}

// Mark someone as "logged in" by remembering their email
function setCurrentUser(email) {
  localStorage.setItem(SESSION_KEY, email);
}

// Get the full record of whoever is currently logged in (or null)
function getCurrentUser() {
  const email = localStorage.getItem(SESSION_KEY);
  if (!email) return null;
  return findUserByEmail(email) || null;
}

// Log out
function logout() {
  localStorage.removeItem(SESSION_KEY);
}
