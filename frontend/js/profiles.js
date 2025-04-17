
function toggleEditForm(show) {
    document.getElementById('profile-view').style.display = show ? 'none' : 'flex';
    document.getElementById('profile-edit-form').style.display = show ? 'block' : 'none';

    if (show) {

        document.getElementById('username-input').value = document.getElementById('username-display').textContent;
        document.getElementById('photo-input').value = document.getElementById('profile-pic').src;
    }
}

function saveChanges(e) {
    e.preventDefault();

    const newUsername = document.getElementById('username-input').value;
    const newPhoto = document.getElementById('photo-input').value;

    document.getElementById('username-display').textContent = newUsername;
    document.getElementById('profile-pic').src = newPhoto;

    toggleEditForm(false);
}

function delayedRedirect() {

    alert("Déconnexion en cours...");


    setTimeout(() => {
        window.location.href = "../index.html";
    }, 10000);
}