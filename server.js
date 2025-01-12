const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Default username for XAMPP
  password: "", // Default password for XAMPP
  database: "notes_db",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err.message);
    return;
  }
  console.log("Connected to MySQL Database.");
});

// API Endpoints

// Get all notes
app.get("/api/notes", (req, res) => {
  db.query("SELECT * FROM notes", (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

// Add a new note
app.post("/api/notes", (req, res) => {
  const { title, content } = req.body;
  db.query("INSERT INTO notes (title, content) VALUES (?, ?)", [title, content], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ message: "Note added successfully!", noteId: results.insertId });
  });
});

// Delete a note
app.delete("/api/notes/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM notes WHERE id = ?", [id], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ message: "Note deleted successfully!" });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
