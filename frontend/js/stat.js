document.getElementById("stat-lessons").textContent = "6";
document.getElementById("stat-accuracy").textContent = "92%";
document.getElementById("stat-speed").textContent = "48 MPM";
document.getElementById("stat-time").textContent = "15:24";
const ctx = document.getElementById('speedChart').getContext('2d');
const speedChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Leçon 1', 'Leçon 2', 'Leçon 3', 'Leçon 4', 'Leçon 5', 'Leçon 6'],
        datasets: [{
            label: 'Vitesse (MPM)',
            data: [32, 35, 40, 45, 47, 48],
            backgroundColor: 'rgba(13, 110, 253, 0.2)',
            borderColor: '#0d6efd',
            borderWidth: 2,
            fill: true,
            tension: 0.3,
            pointBackgroundColor: '#0d6efd',
            pointRadius: 5
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'MPM'
                }
            }
        }
    }
});

