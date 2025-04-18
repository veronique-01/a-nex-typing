function toggleEditForm(show) {
    document.getElementById('profile-view').style.display = show ? 'none' : 'flex';
    document.getElementById('profile-edit-form').style.display = show ? 'block' : 'none';

    if (show) {
        document.getElementById('username-input').value = document.getElementById('username-display').textContent;
        document.getElementById('photo-input').value = document.getElementById('profile-pic').src;
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
            document.getElementById('profile-pic').src = newPhoto;

  
            user.username = newUsername;
            user.photo = newPhoto;
            localStorage.setItem("user", JSON.stringify(user));

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
