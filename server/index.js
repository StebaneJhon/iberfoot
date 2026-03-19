import express from 'express';
import cors from 'cors';
import pool from './config/db.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/api/players", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM players;");
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post("/api/players", async (req, res) => {
  const {first_name, last_name, alias, position, age, team, image} = req.body
  try {
    const result = await pool.query(
      "INSERT INTO players (first_name, last_name, alias, position, age, team, image) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [first_name, last_name, alias, position, age, team, image]
    );
    res.status(201).json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.delete("api/players/:id", async (req, res) => {
  try {
    await pool.query("DELETE FROM players WHERE id = $1", [req.params.id]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get("/api/coaches", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM coaches");
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post("/api/coaches", async (req, res) => {
  const {first_name, last_name, alias, age, team, image} = req.body
  try {
    const result = await pool.query(
      "INSERT INTO coaches (first_name, last_name, alias, age, team, image) VALUES ($1, $2, $3, $4, $5, $6)",
      [first_name, last_name, alias, age, team, image]
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
