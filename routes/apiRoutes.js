// const notes = require('express').Router();

// notes.get('/', (req, res)=> {
    
// })


// module.exports = notes;
const noteTaking = require('../db/store');

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

    })

    app.post('/api/notes', (req, res) => {

    })

    app.delete('/api/notes/:id', (req, res) => {

    })
}