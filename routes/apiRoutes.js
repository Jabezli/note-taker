//connect the methods wrote in store.js for getting data from db.json.
const noteTaking = require('../db/store');
const fs = require(`fs`);

module.exports = (app) => {
    //this get routes is to get all the notes. The data will be sent back then in the frontend index.js, there is a function to fetch the "data" and render to the user.
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
    //this route is just adding a router if by any chance a user wants to access a specific note even though it was not a required feature.
    app.get('/api/notes/:id', (req, res) => {
        const noteId = req.params.id;

        noteTaking
            .getAll()
            .then((data) => {
                console.log(data[noteId]);
                res.json(data[noteId]);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).end();
            })
    })
    //this route is to add new notes.
    app.post('/api/notes', (req, res) => {
        const newNote = req.body;
        // newNote is equal to the req.body object which will have two keys => title and text. Below I am adding a new key "id", so each note will have an id.
        //math.random will generate a random number between 0 and 1, which will be multiplied by "1000000" (note it can be any number). The answer will be between 0 and 1000000.
        //since it is possible to have 0, and I don't want to have 0. The answer will always + 1 so answers can be between 1 to 1000001. 
        //math.floor rounds the answers down to the nearest integer.
        newNote.id = Math.floor((Math.random() * 1000000) + 1);

        noteTaking
            .push(newNote)
            .then((data) => {
                res.json(data);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).end();
            })
    })

    app.delete('/api/notes/:id', (req, res) => {
        //since we added an id to each note, we are obtaining that id and store in noteId here.
        const noteId = req.params.id;
        console.log('deleting:' + req.params.id);
        noteTaking.getAll()
        //after getting all notes, we will run a loop to delete a specific note from database when id matches.
        .then((data) => {
            for(let i = 0; i < data.length; i++){
                if(parseInt(noteId) === parseInt(data[i].id)){
                    //when noteID === date[i].id, delete i, and only i by stated 1 as the 2nd argument. then overwrite the db.json file.
                    data.splice(i, 1);
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