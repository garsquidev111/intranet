const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();

// Sert les fichiers statiques depuis le dossier "public"
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json()); // Middleware pour parser le JSON envoyé dans les requêtes

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Route pour la vérification de l'authentification
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Lire le fichier JSON contenant les utilisateurs
  fs.readFile(path.join(__dirname, 'users.json'), 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Erreur du serveur');
    }

    const users = JSON.parse(data);

    // Vérifier si un utilisateur avec le bon username et mot de passe existe
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
      res.send({ message: 'Connexion réussie' });
    } else {
      res.status(401).send({ message: 'Nom d\'utilisateur ou mot de passe incorrect' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Le serveur fonctionne sur http://localhost:${PORT}`);
});
