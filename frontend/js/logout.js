
document.addEventListener('DOMContentLoaded', () => {
    const logoutLink = document.querySelector('a[href="login.html"]');
    if (logoutLink) {
      logoutLink.addEventListener('click', () => {
        localStorage.removeItem("user");
      });
    }
  });
  