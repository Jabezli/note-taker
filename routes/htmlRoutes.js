const path = require ('path')
//instead of writing a function then export the module at the end. This way saves some lines by passing app as a parameter so in the server.js when I use it, the const app = express() there, then I can invoke it in express directly.
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
    // if the above routers do not work, the "*" here will be the "wildcard" router to send the index html back to the client which brings the client back to main page.
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    })
}