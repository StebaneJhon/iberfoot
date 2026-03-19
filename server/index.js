import express from 'express';
import cors from 'cors';
import pool from './config/db.js';
import multer from 'multer';
import path from "path";
import fs from "fs";
import 'dotenv/config';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = './uploads';
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });
app.use('/uploads', express.static('uploads'));


app.get('/api/players', async (req, res) => {
  console.log("Getting players")
  try {
    const result = await pool.query("SELECT * FROM players;");
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post('/api/players', upload.single('image'), async (req, res) => {
  console.log(req.body)
  const {name, position, age, team} = req.body
  const image = req.file ? `http://localhost:3000/uploads/${req.file.filename}` : null;
  console.log("Image uploaded")
  try {
    const result = await pool.query(
      "INSERT INTO players (name, position, age, team, image) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, position, age, team, image]
    );
    console.log(result.rows)
    res.status(201).json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.delete('/api/players/:id', async (req, res) => {
  try {
    await pool.query("DELETE FROM players WHERE id = $1", [req.params.id]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get('/api/coaches', async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM coaches");
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post("/api/coaches", async (req, res) => {
  const {name, age, team, image} = req.body
  try {
    const result = await pool.query(
      "INSERT INTO coaches (name, age, team, image) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, age, team, image]
    );
    res.status(201).json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.delete("/api/coaches/:id", async (req, res) => {
  try {
    await pool.query("DELETE FROM coaches WHERE id = $1", [req.params.id]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
