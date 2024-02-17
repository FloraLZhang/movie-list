const express = require('express');
var db= require('./db');

// Middleware
var morgan = require('morgan');
var cors = require('cors');

const app = express();
const PORT = 3000 || process.env.PORT;



// Logging and parsing
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

//Connect controller methods to app
var controller = require('./controller');
app.get('/movies', controller.movies.get);
app.post('/movies', controller.movies.post);
app.put('/movies/:id',controller.movies.put);

//serve the client file
app.use(express.static('client/dist'));

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
})