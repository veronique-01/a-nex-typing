document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document.getElementById("confirm-password").value.trim();

  if (password !== confirmPassword) {
    alert("Les mots de passe ne correspondent pas.");
    return;
  }

  const res = await fetch("http://localhost:3000/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });

  const data = await res.json();

  if (res.ok) {

    localStorage.setItem("user", JSON.stringify({
      username: data.user.username,
      email: data.user.email,
      photo: data.user.photo || ""
    }));

  
    window.location.href = "./docs/profiles.html";
  } else {
    alert(data.message || "Erreur lors de l'inscription.");
  }
});
