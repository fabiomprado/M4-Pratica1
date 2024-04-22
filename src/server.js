const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

const db = new sqlite3.Database('./dados.db');

// Rota para salvar um novo cliente
app.post('/api/clientes', (req, res) => {
  const { nome, endereco, contato, email, imagemUrl } = req.body;

  if (!nome || !endereco || !contato || !email) {
    return res.status(400).json({ error: 'Por favor, preencha todos os campos.' });
  }

  const stmt = db.prepare('INSERT INTO clientes (nome, endereco, contato, email, imagemUrl) VALUES (?, ?, ?, ?, ?)');
  stmt.run(nome, endereco, contato, email, imagemUrl, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao salvar cliente.' });
    }

    res.json({ id: this.lastID, nome, endereco, contato, email, imagemUrl });
  });
  stmt.finalize();
});

// Rota para obter todos os clientes
app.get('/api/clientes', (req, res) => {
  db.all('SELECT * FROM clientes', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao obter clientes.' });
    }

    res.json(rows);
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
