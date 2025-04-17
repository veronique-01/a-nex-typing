
window.addEventListener('DOMContentLoaded', () => {
  const lessons = [
    "f j f j f j", "d k d k d k", "s l s l s l", "a ; a ; a ;",
    "asdf jkl;", "fj dk sl a;", "as df jk l;", "fd sa ;l kj",
    "aslk djfa ;lkj", "fj dk sl a; as df jk l;"
  ];

  let currentLesson = 0;
  let completedLessons = 0;
  let correctStrokes = 0;
  let totalStrokes = 0;
  let startTime;
  let currentIndex = 0;
  let isActive = true;

  const display = document.getElementById('exercise-display');
  const completedCount = document.getElementById('completed-count');
  const accuracySpan = document.getElementById('accuracy');
  const wpmSpan = document.getElementById('wpm');
  const errorMsg = document.getElementById('error-msg');

  function loadLesson(index) {
    display.innerHTML = '';
    const text = lessons[index];
    text.split('').forEach((char, i) => {
      const span = document.createElement('span');
      span.textContent = char;
      span.className = 'char px-1';
      if (i === 0) span.classList.add('active');
      display.appendChild(span);
    });
    currentIndex = 0;
    startTime = new Date();
  }

  function highlightNext(i) {
    const spans = display.querySelectorAll('span');
    spans.forEach(span => span.classList.remove('active'));
    if (spans[i]) spans[i].classList.add('active');
  }

  function updateStats() {
    const progress = (completedLessons / lessons.length) * 100;
    document.getElementById('progress-text').textContent = `${Math.round(progress)}%`;
    document.getElementById('progress-ring').setAttribute('stroke-dashoffset', 100 - progress);
    completedCount.textContent = completedLessons;

    const accuracy = totalStrokes ? Math.round((correctStrokes / totalStrokes) * 100) : 0;
    accuracySpan.textContent = `${accuracy}%`;

    const elapsedMinutes = (new Date() - startTime) / 60000;
    const wpm = elapsedMinutes > 0 ? Math.round((correctStrokes / 5) / elapsedMinutes) : 0;
    wpmSpan.textContent = `${wpm} MPM`;
  }

  function startLesson() {
    isActive = true;
    loadLesson(currentLesson);
    errorMsg.textContent = '';
  }

  function resetLesson() {
    isActive = true;
    loadLesson(currentLesson);
    correctStrokes = 0;
    totalStrokes = 0;
    errorMsg.textContent = '';
    updateStats();
  }

  function previousLesson() {
    if (currentLesson > 0) {
      currentLesson--;
      correctStrokes = 0;
      totalStrokes = 0;
      isActive = true;
      loadLesson(currentLesson);
      updateStats();
    }
  }

  function nextLesson() {
    if (currentLesson < lessons.length - 1) {
      currentLesson++;
      correctStrokes = 0;
      totalStrokes = 0;
      isActive = true;
      loadLesson(currentLesson);
      updateStats();
    }
  }

  function restartAll() {
    currentLesson = 0;
    completedLessons = 0;
    correctStrokes = 0;
    totalStrokes = 0;
    isActive = true;
    errorMsg.textContent = '';
    loadLesson(currentLesson);
    updateStats();
  }

  function handleKey(e) {
    if (!isActive) return;

    const spans = display.querySelectorAll('span');
    const expected = spans[currentIndex]?.textContent;
    if (!expected) return;

    if (e.key === expected) {
      spans[currentIndex].classList.remove('active');
      spans[currentIndex].classList.add('correct');
      currentIndex++;
      correctStrokes++;
      highlightNext(currentIndex);

      if (currentIndex === spans.length) {
        completedLessons++;
        currentLesson++;
        if (currentLesson < lessons.length) {
          setTimeout(() => {
            loadLesson(currentLesson);
          }, 800);
        } else {
          isActive = false;
          alert('Toutes les leçons sont terminées !');
        }
      }
    } else {
      spans[currentIndex].classList.add('incorrect');
      errorMsg.textContent = `Erreur : attendu "${expected}" mais reçu "${e.key}"`;
    }
    totalStrokes++;
    updateStats();
  }

  document.addEventListener('keydown', handleKey);

  document.getElementById('btn-start').addEventListener('click', startLesson);
  document.getElementById('btn-reset').addEventListener('click', resetLesson);
  document.getElementById('btn-prev').addEventListener('click', previousLesson);
  document.getElementById('btn-next').addEventListener('click', nextLesson);
  document.getElementById('btn-restart').addEventListener('click', restartAll);

  loadLesson(currentLesson);
});

