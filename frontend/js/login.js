document.getElementById('login-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    try {
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            // Enregistrement de l'utilisateur dans le localStorage
            localStorage.setItem('user', JSON.stringify(data.user));

            // Redirection vers la page d'accueil
            window.location.href = '../docs/acueil.html';
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Erreur lors de la connexion :', error);
        alert("Une erreur est survenue pendant la connexion.");
    }
});
