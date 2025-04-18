
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    try {
        const res = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (res.ok) {
            alert("Connexion réussie !");
            window.location.href = "../docs/acueil.html";
        } else {
            alert(data.message);
        }
    } catch (err) {
        console.error(err);
        alert("Erreur de connexion au serveur.");
    }
});