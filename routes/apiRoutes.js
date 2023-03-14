// const notes = require('express').Router();

// notes.get('/', (req, res)=> {
    
// })


// module.exports = notes;
const noteTaking = require('../db/store');
const fs = require(`fs`);

module.exports = (app) => {
    app.get('/api/notes', (req, res) => {
        noteTaking
            .getAll()
            .then((data) => {
                console.log(data);
                res.json(data);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).end();
            })
    })

    app.get('/api/notes/:id', (req, res) => {
        const noteId = req.params.id;

        noteTaking
            .getAll()
            .then((data) => {
                console.log(data[noteId]);
                res.json(data[noteId]);
            })
            .catch((err) => {
                // console.log(err);
                // return res.status(500).end();
                res.error(err);
            })
    })

    app.post('/api/notes', (req, res) => {
        const newNote = req.body;

        newNote.id = Math.floor((Math.random() * 1000000) + 1);

        noteTaking
            .push(newNote)
            .then((data) => {
                res.json(data);
            })
            .catch((err) => {
                // console.log(err);
                // return res.status(500).end();
                res.error(err);
            })
    })

    app.delete('/api/notes/:id', (req, res) => {
        const noteId = req.params.id;
        console.log('deleting:' + req.params.id);
        noteTaking.getAll()
        .then((data) => {
            for(let i = 0; i < data.length; i++){
                if(parseInt(noteId) === parseInt(data[i].id)){
                    data.splice(i, 1);
                    console.log(`i m in loop`);
                    fs.writeFile('./db/db.json', JSON.stringify(data), (err) => { 
                        if (err) {
                            console.log(err);
                            res.status(500).send(`Error for fs.writeFile, please check error message`)
                        } else {
                            console.log(`DB file gets updated`);
                            res.json(data)
                        }})
                }
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send(`Can't get notes from DB`);
        })
    })
}