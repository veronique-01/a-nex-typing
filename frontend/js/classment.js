document.addEventListener('DOMContentLoaded', async () => {
    const tableBody = document.getElementById('rankingTable');
    const searchInput = document.getElementById('searchInput');
    const currentUser = JSON.parse(localStorage.getItem("user"));
  
    function createRow(user, index, highlight = false) {
      const row = document.createElement('tr');
      if (highlight) row.classList.add('table-info', 'fw-bold');
  
      const rankTd = document.createElement('td');
      if (index === 0) rankTd.innerHTML = '<i class="fas fa-trophy trophy gold"></i>1';
      else if (index === 1) rankTd.innerHTML = '<i class="fas fa-trophy trophy silver"></i>2';
      else if (index === 2) rankTd.innerHTML = '<i class="fas fa-trophy trophy bronze"></i>3';
      else rankTd.textContent = index + 1;
  
      row.innerHTML = `
        <td>${rankTd.innerHTML}</td>
        <td>${user.username}</td>
        <td>${user.lessons || 0}</td>
        <td>${user.accuracy || 0}%</td>
        <td>${user.speed || 0} MPM</td>
      `;
  
      return row;
    }
  
    try {
      const res = await fetch('http://localhost:3000/api/leaderboard');
      const users = await res.json();
  
      tableBody.innerHTML = '';
  
      users.forEach((user, index) => {
        const highlight = currentUser && currentUser.email === user.email;
        const row = createRow(user, index, highlight);
        tableBody.appendChild(row);
      });
  
      // Recherche
      searchInput.addEventListener('input', () => {
        const term = searchInput.value.toLowerCase();
        const rows = tableBody.querySelectorAll('tr');
        rows.forEach(row => {
          const username = row.children[1].textContent.toLowerCase();
          row.style.display = username.includes(term) ? '' : 'none';
        });
      });
  
      // Tri
      const getCellValue = (row, index) => row.cells[index].innerText.replace(/[^\d.]/g, '') || row.cells[index].innerText;
      const comparer = (index, asc) => (a, b) => {
        const v1 = getCellValue(asc ? a : b, index);
        const v2 = getCellValue(asc ? b : a, index);
        return isNaN(v1) || isNaN(v2) ? v1.localeCompare(v2) : v1 - v2;
      };
  
      document.querySelectorAll('th.sortable').forEach(th => {
        th.addEventListener('click', () => {
          const table = th.closest('table');
          const tbody = table.querySelector('tbody');
          Array.from(tbody.querySelectorAll('tr'))
            .sort(comparer(Array.from(th.parentNode.children).indexOf(th), th.asc = !th.asc))
            .forEach(tr => tbody.appendChild(tr));
        });
      });
    } catch (err) {
      console.error("Erreur de chargement du classement :", err);
      tableBody.innerHTML = '<tr><td colspan="5">Erreur de chargement...</td></tr>';
    }
  });
  