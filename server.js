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

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./Develop/pubic/index.html"))
})

function newNote(body, )


