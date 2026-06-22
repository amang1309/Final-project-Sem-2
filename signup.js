/* ============================================================
   signup.js
   Validates the sign-up form (without a server, so all checks
   happen here in the browser) and, if everything looks good,
   saves the new user into localStorage and logs them straight in.

   Validation rules, kept deliberately simple for a student project:
     - name, email, password are required
     - email must look like an email (basic pattern, not a full RFC check)
     - password must be at least 8 characters
     - confirm password must match password
     - that email must not already be registered
     - the terms checkbox must be ticked
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signup-form");
  if (!form) return;

  const messageEl = document.getElementById("form-message");

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // stop the browser from doing a full page reload

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const password = form.password.value;
    const confirm = form.confirm.value;
    const agreed = form.terms.checked;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !password || !confirm) {
      return showMessage("Please fill in all required fields.");
    }
    if (!emailPattern.test(email)) {
      return showMessage("Please enter a valid email address.");
    }
    if (password.length < 8) {
      return showMessage("Password must be at least 8 characters.");
    }
    if (password !== confirm) {
      return showMessage("Passwords do not match.");
    }
    if (!agreed) {
      return showMessage("You must agree to the Terms & Privacy Policy.");
    }
    if (findUserByEmail(email)) {
      return showMessage("An account with that email already exists. Try signing in instead.");
    }

    // Everything checks out: save the new user and log them in
    registerUser({ name, email, phone, password });
    setCurrentUser(email);

    showMessage("Account created! Redirecting…", "success");
    setTimeout(() => {
      window.location.href = "index.html";
    }, 800);
  });

  function showMessage(text, type = "error") {
    messageEl.textContent = text;
    messageEl.className = `form-message ${type}`;
  }
});
