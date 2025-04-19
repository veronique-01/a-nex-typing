document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const usernameDisplay = document.getElementById('username-display');
      const emailDisplay = document.getElementById('email-display');
      const profilePic = document.getElementById('profile-pic');
  
      if (usernameDisplay) usernameDisplay.textContent = user.username;
      if (emailDisplay) emailDisplay.textContent = user.email;
      if (profilePic && user.photo) profilePic.src = user.photo;
  

      const headerPic = document.getElementById('header-profile-pic');
      if (headerPic && user.photo) headerPic.src = user.photo;
    } else {
      alert("Vous devez être connecté pour accéder au profil.");
      window.location.href = "login.html";
    }
  });
  
  function toggleEditForm(show) {
    document.getElementById('profile-view').style.display = show ? 'none' : 'flex';
    document.getElementById('profile-edit-form').style.display = show ? 'block' : 'none';
  
    const user = JSON.parse(localStorage.getItem("user"));
    if (show && user) {
      document.getElementById('username-input').value = user.username;
      document.getElementById('photo-input').value = user.photo || '';
    }
  }
  
  async function saveChanges(e) {
    e.preventDefault();
  
    const newUsername = document.getElementById('username-input').value.trim();
    const newPhoto = document.getElementById('photo-input').value.trim();
    const user = JSON.parse(localStorage.getItem("user"));
  
    if (!user || !user.email) {
      alert("Utilisateur non authentifié.");
      return;
    }
  
    try {
      const res = await fetch("http://localhost:3000/api/update-photo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          photo: newPhoto,
          username: newUsername
        })
      });
  
      const data = await res.json();
  
      if (res.ok) {
        document.getElementById('username-display').textContent = newUsername;
        document.getElementById('email-display').textContent = user.email;
        document.getElementById('profile-pic').src = newPhoto;
        const headerPic = document.getElementById('header-profile-pic');
        if (headerPic) headerPic.src = newPhoto;
  
        const updatedUser = { ...user, username: newUsername, photo: newPhoto };
        localStorage.setItem("user", JSON.stringify(updatedUser));
  
        toggleEditForm(false);
      } else {
        alert(data.message || "Erreur lors de la mise à jour.");
      }
    } catch (err) {
      console.error(err);
      alert("Erreur serveur.");
    }
  }
  
  function delayedRedirect() {
    alert("Déconnexion en cours...");
    setTimeout(() => {
      localStorage.removeItem("user");
      window.location.href = "../docs/login.html";
    }, 3000);
  }
  