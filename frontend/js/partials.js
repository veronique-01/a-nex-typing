fetch('../partials/header.html')
    .then(res => res.text())
    .then(data => {
        document.getElementById('header').innerHTML = data;


        const script = document.createElement('script');
        script.src = '../js/dropdown.js';
        document.body.appendChild(script);
    });


fetch('../partials/header_accueil.html')
    .then(res => res.text())
    .then(data => {
        document.getElementById('header_accueil').innerHTML = data;


        const script = document.createElement('script');
        script.src = '../js/dropdown.js';
        document.body.appendChild(script);
    });

fetch('../partials/footer.html')
    .then(res => res.text())
    .then(data => {
        document.getElementById('footer').innerHTML = data;
    });

