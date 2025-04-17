const profileBtn = document.getElementById('profile-button');
    const profileMenu = document.getElementById('profile-menu');
    profileBtn.addEventListener('click', () => {
      profileMenu.classList.toggle('hidden');
    });
    window.addEventListener('click', (e) => {
      if (!profileBtn.contains(e.target) && !profileMenu.contains(e.target)) {
        profileMenu.classList.add('hidden');
      }
    });

document.querySelectorAll('[data-faq]').forEach(button => {
    button.addEventListener('click', () => {
      const answer = button.nextElementSibling;
      answer.classList.toggle('hidden');
      const icon = button.querySelector('span');
      icon.textContent = answer.classList.contains('hidden') ? '▼' : '▲';
    });
  });