var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// connect to DB and check the connection
mongoose.connect('mongodb://localhost/spacebookDB')
  .then(() => {console.log('Successfully connected to mongoDB');})
  .catch((error) => console.error(error));

var Post = require('./models/postModel');

var app = express();
app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// You will need to create 5 server routes
// These will define your API:

// 1) to handle getting all posts and their comments
// 2) to handle adding a post
// 3) to handle deleting a post
// 4) to handle adding a comment to a post
// 5) to handle deleting a comment from a post



//PORT
const SERVER_PORT = process.env.PORT || 8080;
app.listen(SERVER_PORT, () => console.log(`Server up and running on port ${SERVER_PORT}...`));
