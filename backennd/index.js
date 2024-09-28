const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
app.use(express.json());
app.use(cors());

const { Pool } = require('pg');

const PORT = 3001;
// Connection URL
const pool = new Pool({
  connectionString: 'postgresql://postgres:ANIMAX@619@localhost:5432/postgres'
});

app.use(express.static(path.join(__dirname, 'frontend')));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await pool.query('INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *', [email, password]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

app.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    // Logic to validate user credentials
    const user = await pool.query('SELECT id FROM users WHERE email = $1 AND password = $2', [email, password]);
    
    if (user.rows.length > 0) {
        res.json({ id: user.rows[0].id });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
