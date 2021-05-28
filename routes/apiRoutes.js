const path = require('path');
const fs = require('fs');
const notes = require('../db/db.json');
const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');;

router.get('/api/notes', (req, res) => {
    res.json(notes)
});

router.delete('/api/notes/:id', (req, res) => {
    const idDelete = req.params.id;

    const notesKeep = notes.filter(note => note.id !== idDelete)

    fs.writeFile("db/db.json", JSON.stringify(notesKeep), (err) => {
        if (err)
            console.log(err);
    })

    res.json(notes)
})


router.post('/api/notes', (req, res) => {

    const newNote = {
        "title": req.body.title,
        "text": req.body.text,
        "id": uuidv4()
    }




    notes.push(newNote)

    fs.writeFile("db/db.json", JSON.stringify(notes), (err) => {
        if (err) {
            console.log(err);
        }
    })
    res.json(notes)
})




module.exports = router