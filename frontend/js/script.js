document.addEventListener('DOMContentLoaded', function () {
    const modeButtons = document.querySelectorAll('.mode-selector .btn');
    const restartBtn = document.getElementById('restart-btn');
    const timerElement = document.getElementById('timer');
    const wpmElement = document.getElementById('wpm');
    const speedResult = document.getElementById('speed-result');
    const accuracyResult = document.getElementById('accuracy-result');
    const scoreResult = document.getElementById('score-result');
    const progressBar = document.getElementById('progress-bar');
    const wordDisplay = document.getElementById('word-display');

    let words = [];
    let currentWordIndex = 0;
    let startTime, timerInterval;
    let timeLeft = 60;
    let correctChars = 0;
    let totalChars = 0;
    let gameActive = false;
    let currentMode = 'easy';
    const wordsPerLine = 4;
    const totalWords = 20; 

    const wordBanks = {
        easy: ["apple", "banana", "grape", "orange", "cherry"],
        medium: ["keyboard", "monitor", "printer", "charger", "battery"],
        hard: ["synchronize", "complicated", "development", "extravagant", "misconception"]
    };

    function initGame() {
        currentWordIndex = 0;
        correctChars = 0;
        totalChars = 0;
        timeLeft = 60;
        gameActive = true;

        words = getRandomWords(wordBanks[currentMode], totalWords);

        displayWordsLine();

        clearInterval(timerInterval);
        timerElement.textContent = timeLeft;
        speedResult.textContent = '0';
        accuracyResult.textContent = '0';
        scoreResult.textContent = '0';
        wpmElement.textContent = '0';
        progressBar.style.width = '0%';

        startTime = new Date();
        timerInterval = setInterval(updateTimer, 1000);
    }

    function getRandomWords(wordBank, count) {
        let result = [];
        while (result.length < count) {
            result = result.concat([...wordBank].sort(() => 0.5 - Math.random()));
        }
        return result.slice(0, count);
    }

    function displayWordsLine() {
        let html = '';
        for (let i = currentWordIndex; i < Math.min(currentWordIndex + wordsPerLine, words.length); i++) {
            if (i === currentWordIndex) {
                html += `<span class="current-word">${words[i]}</span> `;
            } else {
                html += `${words[i]} `;
            }
        }
        wordDisplay.innerHTML = html;
    }

    function updateTimer() {
        timeLeft--;
        timerElement.textContent = timeLeft;
        progressBar.style.width = `${((60 - timeLeft) / 60) * 100}%`;

        if (timeLeft <= 0) {
            endGame();
        }
    }

    function calculateWPM() {
        const now = new Date();
        const timeElapsed = (now - startTime) / 60000;
        return Math.round(currentWordIndex / timeElapsed);
    }

    function calculateAccuracy() {
        return totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 0;
    }

    function calculateScore(wpm, accuracy) {
        return Math.round(wpm * (accuracy / 100));
    }

    function endGame() {
        gameActive = false;
        clearInterval(timerInterval);

        const wpm = calculateWPM();
        const accuracy = calculateAccuracy();
        const score = calculateScore(wpm, accuracy);

        speedResult.textContent = wpm;
        accuracyResult.textContent = accuracy;
        scoreResult.textContent = score;

        showNotification(`Test completed! Your score: ${score}`, 'success');
    }

    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `floating-notification alert alert-${type} alert-dismissible fade show`;
        notification.innerHTML = `
            <strong>${message}</strong>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }

    document.addEventListener('keydown', function (e) {
        if (!gameActive) return;

        const currentWord = words[currentWordIndex];
        const char = e.key;
        const currentSpan = document.querySelector('.current-word');

        if (!currentSpan.dataset.typed) currentSpan.dataset.typed = '';

        if (char === ' ') {
            const typed = currentSpan.dataset.typed;
            totalChars += typed.length;

            for (let i = 0; i < typed.length; i++) {
                if (typed[i] === currentWord[i]) correctChars++;
            }

            currentWordIndex++;

            if (currentWordIndex >= words.length) {
                endGame();
                return;
            }

            displayWordsLine();
        } else if (/^[a-zA-Z]$/.test(char)) {
            currentSpan.dataset.typed += char;

            let displayValue = '';
            for (let i = 0; i < currentWord.length; i++) {
                const typedChar = currentSpan.dataset.typed[i];
                const targetChar = currentWord[i];
                if (typedChar) {
                    if (typedChar === targetChar) {
                        displayValue += `<span class="correct">${targetChar}</span>`;
                    } else {
                        displayValue += `<span class="incorrect">${targetChar}</span>`;
                    }
                } else {
                    displayValue += targetChar;
                }
            }

            currentSpan.innerHTML = displayValue;
        }

        wpmElement.textContent = calculateWPM();
    });

    restartBtn.addEventListener('click', initGame);

    modeButtons.forEach(button => {
        button.addEventListener('click', function () {
            currentMode = this.value;
            modeButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            initGame();
        });
    });

    initGame();
});
