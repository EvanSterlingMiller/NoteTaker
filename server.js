const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const notes = require("./db/db.json");
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public")); // Serve the public directory

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  res.json(notes.slice(1));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

function newNote(body, newNoteItem) {
  const noteSection = body;
  if (!Array.isArray(newNoteItem)) newNoteItem = [];

  if (newNoteItem.length === 0) newNoteItem.push(0);

  body.id = newNoteItem[0];
  newNoteItem[0] = newNoteItem[0] + 1;

  newNoteItem.push(noteSection);
  fs.writeFileSync(
    path.join(__dirname, "./db/db.json"),
    JSON.stringify(newNoteItem, null, 2)
  );
  return noteSection;
}

app.post("/api/notes", (req, res) => {
  const noteSection = newNote(req.body, notes);
  res.json(noteSection);
});

function deleteNote(id, newNoteItem) {
  for (let i = 0; i < newNoteItem.length; i = i + 1) {
    let note = newNoteItem[i];

    if (note.id == id) {
      newNoteItem.splice(i, 1);
      fs.writeFileSync(
        path.join(__dirname, "./db/db.json"),
        JSON.stringify(newNoteItem, null, 2)
      );
      break;
    }
  }
}

app.delete("/api/notes/:id", (req, res) => {
  deleteNote(req.params.id, notes);
  res.json(true);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
