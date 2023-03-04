const path = require ('path')

// function usingApp(app) {
//     app.get('/notes', (req, res) => {
//         res.sendFile(path.join(__dirname, '../public/notes.html'));
//     })
    
//     app.get('/assets/css/styles.css', (req, res) => {
//         res.sendFile(path.join(__dirname, '../public/assets/css/styles.css'))
//     })
    
//     app.get('/assets/js/index.js', (req, res) => {
//         res.sendFile(path.join(__dirname, '../public/assets/js/index.js'))
//     })
    
//     app.get('*', (req, res) => {
//         res.sendFile(path.join(__dirname, '../public/index.html'));
//     })
// }

// module.exports = usingApp;

module.exports = (app) => {
    app.get('/notes', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/notes.html'));
    })
    
    app.get('/assets/css/styles.css', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/assets/css/styles.css'))
    })
    
    app.get('/assets/js/index.js', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/assets/js/index.js'))
    })
    
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    })
}