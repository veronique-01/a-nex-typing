const express = require('express');
const fs = require('fs');
const xlsx = require('xlsx');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;
const EXCEL_FILE = path.join(__dirname, 'users.xlsx');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../frontend')));

function initExcelFile() {
  if (!fs.existsSync(EXCEL_FILE)) {
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet([]);
    xlsx.utils.book_append_sheet(wb, ws, 'Users');
    xlsx.writeFile(wb, EXCEL_FILE);
  }
}

function readUsers() {
  const wb = xlsx.readFile(EXCEL_FILE);
  const ws = wb.Sheets['Users'];
  return xlsx.utils.sheet_to_json(ws);
}

function writeUsers(users) {
  const wb = xlsx.utils.book_new();
  const ws = xlsx.utils.json_to_sheet(users);
  xlsx.utils.book_append_sheet(wb, ws, 'Users');
  xlsx.writeFile(wb, EXCEL_FILE);
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.post('/api/register', (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Tous les champs sont requis.' });
  }

  const users = readUsers();
  if (users.some(user => user.email === email)) {
    return res.status(409).json({ message: 'Cet email est déjà utilisé.' });
  }

  users.push({ username, email, password, photo: '', lessons: 0, accuracy: 0, speed: 0 });
  writeUsers(users);

  res.status(201).json({ message: 'Inscription réussie.', user: { username, email, photo: '' } });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const users = readUsers();

  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Email ou mot de passe incorrect.' });
  }

  res.json({ message: 'Connexion réussie.', user });
});

app.post('/api/update-photo', (req, res) => {
  const { email, photo, username } = req.body;

  let users = readUsers();
  const index = users.findIndex(u => u.email === email);
  if (index === -1) return res.status(404).json({ message: 'Utilisateur non trouvé.' });

  users[index].photo = photo;
  if (username) users[index].username = username;

  writeUsers(users);
  res.json({ message: 'Profil mis à jour.', user: users[index] });
});

app.post('/api/save-stats', (req, res) => {
  const { email, lessons, accuracy, speed } = req.body;

  let users = readUsers();
  const index = users.findIndex(u => u.email === email);
  if (index === -1) return res.status(404).json({ message: 'Utilisateur non trouvé.' });

  users[index].lessons = (users[index].lessons || 0) + (lessons || 0);
  users[index].accuracy = accuracy;
  users[index].speed = speed;

  writeUsers(users);
  res.json({ message: 'Statistiques mises à jour.' });
});

app.get('/api/leaderboard', (req, res) => {
  const users = readUsers();
  const ranked = users
    .filter(u => u.lessons || u.accuracy || u.speed)
    .sort((a, b) => (b.speed || 0) - (a.speed || 0));
  res.json(ranked);
});

initExcelFile();
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
