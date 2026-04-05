import express from 'express';
import cors from 'cors';
import pool from './config/db.js';
import multer from 'multer';
import path from "path";
import fs from "fs";
import 'dotenv/config';
import console from 'console';
import nodemailer from "nodemailer"

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

const uploadFields = upload.fields([
  { name: 'image', maxCount: 1 },     
  { name: 'details', maxCount: 10 }      
]);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});


app.get('/api/players', async (req, res) => {
  try {
    //const result = await pool.query("SELECT * FROM players;");
    const query = `
      SELECT 
        p.*, 
        COALESCE(
          JSON_AGG(
            JSON_BUILD_OBJECT('id', dp.id, 'url', dp.url)
          ) FILTER (WHERE dp.id IS NOT NULL), 
          '[]'
        ) AS dynamic_photos
      FROM players p
      LEFT JOIN players_dynamic_photos dp ON p.id = dp.player_id
      GROUP BY p.id;
    `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post('/api/players', uploadFields, async (req, res) => {
  const {name, position, age, team, transfermarkt} = req.body

  const image = req.files['image'] 
    ? `http://localhost:3000/uploads/${req.files['image'][0].filename}` 
    : null;

  const details = req.files['details'] 
    ? req.files['details'].map(file => `http://localhost:3000/uploads/${file.filename}`) 
    : [];

  try {

    const player = await pool.query(
      "INSERT INTO players (name, position, age, team, image, transfermarkt) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [name, position, age, team, image, transfermarkt]
    );

    details.forEach( async (detail) => {
      await pool.query(
        "INSERT INTO players_dynamic_photos (player_id, url) VALUES ($1, $2) RETURNING *",
        [player.rows[0].id, detail]
      );
    });

    const result = await pool.query(`
      SELECT 
        p.*, 
        COALESCE(
          JSON_AGG(
            JSON_BUILD_OBJECT('id', dp.id, 'url', dp.url)
          ) FILTER (WHERE dp.id IS NOT NULL), 
          '[]'
        ) AS dynamic_photos
      FROM players p
      LEFT JOIN players_dynamic_photos dp ON p.id = dp.player_id
      WHERE p.id = $1
      GROUP BY p.id;
    `, [player.rows[0].id]);
    
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.put('/api/players/:id', uploadFields, async (req, res) => {

  const { id } = req.params;
  const { name, position, age, team, transfermarkt, keepIds } = req.body;
  let imageUrl = req.body.image;

  try {
    // --- 1. Handle Main Profile Image Update ---
    if (req.file?.['image']) {
      const oldPlayer = await pool.query("SELECT image FROM players WHERE id = $1", [id]);
      const oldImage = oldPlayer.rows[0]?.image;

      if (oldImage) {
        const oldFilename = oldImage.split('/').pop();
        fs.unlink(path.join('uploads', oldFilename), (err) => { if (err) console.log(err); });
      }

      imageUrl = `http://localhost:3000/uploads/${req.files['image'][0].filename}`;

    }

    await pool.query(
      "UPDATE players SET name=$1, position=$2, age=$3, team=$4, image=$5, transfermarkt=$6 WHERE id=$7 RETURNING *",
      [name, position, age, team, imageUrl, transfermarkt, id]
    );

    // --- 2. Handle Dynamic Photos (The "Sync" Logic) ---
    const idsToKeep = JSON.parse(keepIds || "[]").map(Number);
    const currentPhotos = await pool.query("SELECT * FROM players_dynamic_photos WHERE player_id = $1", [id]);
    const toDelete = currentPhotos.rows.filter(row => !idsToKeep.includes(row.id));

    for (const photo of toDelete) {
      const filename = photo.url.split('/').pop();
      fs.unlink(path.join('uploads', filename), (err) => { if (err) console.log(err); });
      await pool.query("DELETE FROM players_dynamic_photos WHERE id = $1", [photo.id]);
    }

    if (req.files?.['details']) {
      const newDetails = req.files['details'].map(file => `http://localhost:3000/uploads/${file.filename}`);
      for (const url of newDetails) {
        await pool.query(
          "INSERT INTO players_dynamic_photos (player_id, url) VALUES ($1, $2)",
          [id, url]
        );
      }
    }

    const result = await pool.query(`
      SELECT 
        p.*, 
        COALESCE(
          JSON_AGG(
            JSON_BUILD_OBJECT('id', dp.id, 'url', dp.url)
          ) FILTER (WHERE dp.id IS NOT NULL), 
          '[]'
        ) AS dynamic_photos
      FROM players p
      LEFT JOIN players_dynamic_photos dp ON p.id = dp.player_id
      WHERE p.id = $1
      GROUP BY p.id;
    `, [id]);

    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
  
});

app.delete('/api/players/:id', async (req, res) => {

  const { id } = req.params

  try {

    const playerResult = await pool.query("SELECT image FROM players WHERE id = $1", [id]);

    const playerDyanamicPhotosResult = await pool.query("SELECT * FROM players_dynamic_photos WHERE player_id = $1", [id])
    const playerDyanamicPhotos = playerDyanamicPhotosResult.rows

    console.log(playerResult.rows[0])

    if (playerResult.rows.length === 0) {
      return res.status(404).send("Player not found")
    }


    // Delete dynamic photos
    await pool.query("DELETE FROM players_dynamic_photos WHERE player_id = $1", [id])
    playerDyanamicPhotos.forEach(image => {
      const imagePath = image.url
      const filename = imagePath.split('/').pop();
      const filepath = path.join('uploads', filename)

      fs.unlink(filepath, (err) => {
        if (err) console.error("Failed to delete local file:", err);
        else console.log("File deleted successfully");
      });
    })

    // Delete player
    const imagePath = playerResult.rows[0].image;
    await pool.query("DELETE FROM players WHERE id = $1", [id]);

    if (imagePath) {
      const filename = imagePath.split('/').pop();
      const filePath = path.join('uploads', filename)

      fs.unlink(filePath, (err) => {
        if (err) console.error("Failed to delete local file:", err);
        else console.log("File deleted successfully");
      });
    }

    res.status(200).send("Player and image deleted successfully");
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

app.post("/api/contact", async (req, res) => {
  const { name, title, telephone, email, message } = req.body;

  try {
      const dbResult = await pool.query(
        "INSERT INTO contacts (name, title, telephone, email, message) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [name, title, telephone, email, message]
      );

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.RECEIVER_EMAIL,
        subject: `Iberfoot message from a ${title}`,
        html: `
          <h3>Iberfoot message from a ${title}</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Telephone:</strong> ${telephone}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
      };
      await transporter.sendMail(mailOptions);

      res.status(201).json({ success: true, message: "Message saved and email sent!" });
  } catch (err) {
    console.error("Contact Error:", err.message);
    res.status(500).json({ success: false, error: "Something went wrong on our end." });
  }

});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
