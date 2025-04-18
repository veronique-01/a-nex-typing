const express = require('express');
const xlsx = require('xlsx');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Charger les données depuis le fichier Excel
function getUsersFromExcel() {
    const workbook = xlsx.readFile('./data.xlsx');
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet);
    return data;
}


function saveUsersToExcel(data) {
    const worksheet = xlsx.utils.json_to_sheet(data);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Utilisateurs');
    xlsx.writeFile(workbook, './data.xlsx');
}

app.get('/users', (req, res) => {
    const users = getUsersFromExcel();
    res.json(users);
});

app.post('/users', (req, res) => {
    const users = getUsersFromExcel();
    users.push(req.body);
    saveUsersToExcel(users);
    res.json({ message: 'Utilisateur ajouté avec succès' });
});

app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
