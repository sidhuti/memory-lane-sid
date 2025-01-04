const express = require('express')
const sqlite3 = require('sqlite3')

const app = express()
const port = 4001
const db = new sqlite3.Database('memories.db')

app.use(express.json())
app.use((req, res, next) => {
  const allowedOrigin = 'http://127.0.0.1:5173'; // The specific frontend origin you want to allow

  if (req.headers.origin === allowedOrigin) {
    res.setHeader('Access-Control-Allow-Origin', allowedOrigin); // Allow the specific origin
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allow specific HTTP methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allow specific headers
    res.setHeader('Access-Control-Allow-Credentials', 'true'); // Optional: Allow credentials (if needed)
  }

  if (req.method === 'OPTIONS') {
    // Respond to preflight requests
    return res.sendStatus(204);
  }

  next();
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS memories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      description TEXT,
      timestamp DATE,
      image VARCHAR
    )
  `)
})

app.get('/memories', (req, res) => {
  const { sort = 'ASC'} = req.query;

  const sortOrder = sort === 'ASC' ? 'ASC' : 'DESC';

  db.all(`SELECT * FROM memories ORDER BY timestamp ${sortOrder}`, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    res.json({ memories: rows })
  })
})

app.get('/user', (req, res) => {
  const { email } = req.query;

  console.log(email);

  db.get('SELECT * FROM user WHERE email = ?', [email], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    if (!row) {
      res.status(404).json({ error: 'User not found' })
      return
    }
    res.json({ user: row })
  })
});

app.post('/memories', (req, res) => {
  const { name, description, timestamp, image } = req.body

  if (!name || !description || !timestamp || !image) {
    res.status(400).json({
      error: 'Please provide all fields: name, description, timestamp, image',
    })
    return
  }

  const stmt = db.prepare(
    'INSERT INTO memories (name, description, timestamp, image) VALUES (?, ?, ?, ?)'
  )
  stmt.run(name, description, timestamp, image, (err) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    res.status(201).json({ message: 'Memory created successfully' })
  })
})

app.get('/memories/:id', (req, res) => {
  const { id } = req.params
  db.get('SELECT * FROM memories WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    if (!row) {
      res.status(404).json({ error: 'Memory not found' })
      return
    }
    res.json({ memory: row })
  })
})

app.put('/memories/:id', (req, res) => {
  const { id } = req.params
  const { name, description, timestamp, image } = req.body

  if (!name || !description || !timestamp || image) {
    res.status(400).json({
      error: 'Please provide all fields: name, description, timestamp, image',
    })
    return
  }

  const stmt = db.prepare(
    'UPDATE memories SET name = ?, description = ?, timestamp = ?, image = ? WHERE id = ?'
  )
  stmt.run(name, description, timestamp, id, (err) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    res.json({ message: 'Memory updated successfully' })
  })
})

app.put('/user/description', (req, res) => {

  const { description, email } = req.body;

  if (!description | !email) {
    res.status(400).json({
      error: 'Please provide description and email',
    })
    return
  }

  const stmt = db.prepare(
    'UPDATE user SET description = ? WHERE email = ?'
  )

  stmt.run(description, email, (err) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    res.json({ message: 'User description updated successfully' })
  })
})

app.delete('/memories/:id', (req, res) => {
  const { id } = req.params
  db.run('DELETE FROM memories WHERE id = ?', [id], (err) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    res.json({ message: 'Memory deleted successfully' })
  })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
