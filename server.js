var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// connect to DB and check the connection
mongoose.connect('mongodb://localhost/spacebookDB', { useMongoClient: true })
  .then(() => {console.log('Successfully connected to mongoDB');})
  .catch((error) => console.error(error));

var Post = require('./models/postModel');

var app = express();
app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// create some data to start with
// Post.create({
//   text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis, dolor, atque similique odit amet beatae consequuntur eius neque sunt non est, ea in laboriosam. Voluptatum dolore quia molestias incidunt voluptate?',
//   comments: [{
//     user: 'Joe',
//     text: 'beatae consequuntur eius neque sunt non est, ea in laboriosam.'
//   },
//   {
//     user: 'Hila',
//     text: 'neque sunt non est, ea in laboriosam. Voluptatum dolore quia molestias'
//   }]
// }, function(err, postData) {
//   if (err) {
//     return console.error(err);
//   }
//   console.log(postData);
// });


// Post.create({
//   text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto delectus cupiditate doloremque numquam ab quibusdam ullam quis ducimus aperiam soluta. Distinctio, architecto. Incidunt dolores illo temporibus fuga esse ea minus!Et veniam autem reiciendis. Atque officiis labore illo vitae totam',
//   comments: [{
//     user: 'Laly',
//     text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto delectus cupiditate'
//   },
//   {
//     user: 'Tina',
//     text: 'Distinctio, architecto. Incidunt dolores illo temporibus fuga esse ea minus!Et veniam autem reiciendis.'
//   },
//   {
//     user: 'zoe',
//     text: 'quam necessitatibus tempore aut sequi hic incidunt aliquid, numquam dolorem ex?'
//   }]
// }, function(err, postData) {
//   if (err) {
//     return console.error(err);
//   }
//   console.log(postData);
// });


// var aPost = new Post({ text: 'My first post!!!', comments: [] });

// aPost.comments.push({ user: 'Bob', text: 'Great Post!' });

// aPost.save(function(err, data) {
//   if (err) {
//     console.error(err);
//   } else {
//     console.error(data);
//   }
// });


// You will need to create 5 server routes
// These will define your API:

// 1) to handle getting all posts and their comments
app.get('/posts', (req, res) => {
  // Post.find({}).populate('comments').exec((err, postResult) => {
  //   if (err) throw err;
  //   console.log(postResult);
  // });
  Post.find({}, (err, postResult) => {
    if (err) throw err;
    console.log(postResult);
    res.send(postResult);
  });
});
// 2) to handle adding a post
// 3) to handle deleting a post
// 4) to handle adding a comment to a post
// 5) to handle deleting a comment from a post



//PORT
const SERVER_PORT = process.env.PORT || 8080;
app.listen(SERVER_PORT, () => console.log(`Server up and running on port ${SERVER_PORT}...`));
