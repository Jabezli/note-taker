const express = require('express');
// const path = require ('path') //what is this?
// const api = require ('./routes/index.js');

// const usingApp = require('./routes/htmlRoutes');

const PORT = 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//app.use(express.static('public'));

// app.use('/api', api);

// usingApp(app);
require('./routes/htmlRoutes')(app);
require('./routes/apiRoutes')(app);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);