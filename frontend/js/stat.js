document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !user.email) {
        window.location.href = "../docs/login.html";
        return;
    }

    const key = `stats_${user.email}`;
    const allStats = JSON.parse(localStorage.getItem(key)) || [];

    const lessonsCompleted = allStats.length;
    const totalSpeed = allStats.reduce((acc, s) => acc + s.speed, 0);
    const totalAccuracy = allStats.reduce((acc, s) => acc + s.accuracy, 0);
    const averageSpeed = lessonsCompleted ? Math.round(totalSpeed / lessonsCompleted) : 0;
    const averageAccuracy = lessonsCompleted ? Math.round(totalAccuracy / lessonsCompleted) : 0;

    // Fonction pour additionner les temps (au format MM:SS)
    function addTime(t1, t2) {
        const [m1, s1] = t1.split(":").map(Number);
        const [m2, s2] = t2.split(":").map(Number);
        const totalSeconds = m1 * 60 + s1 + m2 * 60 + s2;
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }

    const totalTime = allStats.reduce((acc, s) => addTime(acc, s.time), "00:00");

    // Mise à jour de l'affichage
    document.getElementById("stat-lessons").textContent = lessonsCompleted;
    document.getElementById("stat-accuracy").textContent = `${averageAccuracy}%`;
    document.getElementById("stat-speed").textContent = `${averageSpeed} MPM`;
    document.getElementById("stat-time").textContent = totalTime;

    // Graphique de progression
    const speedHistory = allStats.map(s => s.speed);
    const ctx = document.getElementById("speedChart").getContext("2d");

    new Chart(ctx, {
        type: "line",
        data: {
            labels: speedHistory.map((_, i) => `Leçon ${i + 1}`),
            datasets: [{
                label: "Vitesse (MPM)",
                data: speedHistory,
                backgroundColor: "rgba(13, 110, 253, 0.2)",
                borderColor: "#0d6efd",
                borderWidth: 2,
                fill: true,
                tension: 0.3,
                pointBackgroundColor: "#0d6efd",
                pointRadius: 5
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: "MPM"
                    }
                }
            }
        }
    });
});
