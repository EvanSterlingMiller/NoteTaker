const express = require("express")
const fs = require("fs")
const path = require("path")

const app = express()

const PORT = process.env.PORT || 3001

const notes = require("./Develop/db/db.json")

app.use(express.urlencoded({ extend : true}))
app.use(express.json())

app.use(expess.static("public")) // uses the public directory

app.get("/", (req, res) => {
    res.readFile(path.join(__dirname, "./Develop/public/index.html"))
})
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname,"./Develop/public/notes.html"))
})
app.get("api/notes", (req, res) => {
    res.json(allNotes.slice(1))
})
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./Develop/pubic/index.html"))
})

function newNote(body, newNoteItem) {
    const noteSection = body
    if(!Array.isArray(newNoteItem)) newNoteItem = []
    if(newNoteItem.length === 0) newNoteItem.push(0)
    body.id = newNoteItem[0]
    newNoteItem[0] = newNoteItem[0] + 1

    newNoteItem.push(noteSection)
    fs.writeFileSync(
        path.join(__dirname, "./Develop/db/db.json"),
        JSON.stringify(newNoteItem, null, 2)
    )
    return noteSection
}
app.post("api/notes", (req, res) => {
    const noteSection = newNote(req.body, notes)
    res.json(noteSection)
})

app.listen(PORT, () => {
    console.log(`see port ${PORT}`)
})