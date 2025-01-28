const express = require('express');
const path = require('path');

const app = express();

// Sert les fichiers statiques depuis le dossier "public"
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Le serveur fonctionne sur http://localhost:${PORT}`);
});
