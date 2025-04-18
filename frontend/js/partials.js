

fetch('../partials/header.html')
    .then(res => res.text())
    .then(data => {
        document.getElementById('header').innerHTML = data;

        const script = document.createElement('script');
        script.src = '../js/dropdown.js';
        document.body.appendChild(script);

        updateUserHeader();
    });

fetch('../partials/header_accueil.html')
    .then(res => res.text())
    .then(data => {
        document.getElementById('header_accueil').innerHTML = data;

        const script = document.createElement('script');
        script.src = '../js/dropdown.js';
        document.body.appendChild(script);

        updateUserHeader();
    });

fetch('../partials/footer.html')
    .then(res => res.text())
    .then(data => {
        document.getElementById('footer').innerHTML = data;
    });

function updateUserHeader() {
    const user = JSON.parse(localStorage.getItem("currentUser"));

    if (user) {
        const profileImage = document.querySelector('#profile-button img');
        if (profileImage && user.photo) {
            profileImage.src = user.photo;
        }

        const nameHolder = document.querySelector('#username-display');
        if (nameHolder && user.username) {
            nameHolder.textContent = user.username;
        }
    }
}
