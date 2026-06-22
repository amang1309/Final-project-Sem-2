/* ============================================================
   signin.js
   Checks the typed email/password against the users that were
   saved by signup.js. There's no real server, so "checking a
   password" just means comparing it to the plain-text value we
   stored — fine for a classroom project, never for a real site.
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signin-form");
  if (!form) return;

  const messageEl = document.getElementById("form-message");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = form.email.value.trim();
    const password = form.password.value;

    const user = findUserByEmail(email);

    if (!user || user.password !== password) {
      messageEl.textContent = "Incorrect email or password.";
      messageEl.className = "form-message error";
      return;
    }

    setCurrentUser(user.email);
    messageEl.textContent = "Signed in! Redirecting…";
    messageEl.className = "form-message success";
    setTimeout(() => {
      window.location.href = "index.html";
    }, 600);
  });
});
