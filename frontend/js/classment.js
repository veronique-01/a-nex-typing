
const searchInput = document.getElementById("searchInput");
const table = document.getElementById("rankingTable");

searchInput.addEventListener("keyup", function () {
    const filter = searchInput.value.toLowerCase();
    const rows = table.getElementsByTagName("tr");

    for (let row of rows) {
        const username = row.cells[1].textContent.toLowerCase();
        row.style.display = username.includes(filter) ? "" : "none";
    }
});

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
