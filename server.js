var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var ObjectID = require('mongodb').ObjectID;
mongoose.Promise = global.Promise;

// connect to DB and check the connection
let myConnection = process.env.CONNECTION_STRING || 'mongodb://localhost/spacebookDB'
mongoose.connect(myConnection, { useMongoClient: true })
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
app.get('/posts', (req, res) => {
  Post.find({}, (err, postResult) => {
    if (err) throw err;
    res.send(postResult);
  });
});

// 2) to handle adding a post
app.post('/posts', (req, res) => {
  Post.create({
    title: req.body.title,
    text: req.body.text,
    username: req.body.username,
    time: req.body.time,
    comments: []
  }, (err, postResult) => {
    if (err) throw err;
    res.send(postResult);
  });
});

// 3) to handle deleting a post
app.delete('/posts/:id', (req, res) => {
  var id = req.params.id;
  // Check if the ID is a valid mongoose id
  if (!ObjectID.isValid(id)) {
    return res.status(400).send('Id not in the correct format');
  }
  // delete the post from the DB collection
  Post.findByIdAndRemove(id, (err, deletedPost) => {
    if (err) throw err;
    res.json(deletedPost);
  });
});

// 4) to handle adding a comment to a post
app.post('/posts/:id/comments', (req, res) => {
  var id = req.params.id;
  // Check if the ID is a valid mongoose id
  if (!ObjectID.isValid(id)) {
    return res.status(400).send('Id not in the correct format');
  }
  // update the comments array in the DB
  Post.findByIdAndUpdate(id, { $push: { comments: req.body } }, { new: true }, (err, updatedPost) => {
    if (err) throw err;
    res.send(updatedPost);
  });
});

// 5) to handle deleting a comment from a post
app.delete('/posts/:postId/comments/:commentId', (req, res) => {
  let postId = req.params.postId;
  let commentId = req.params.commentId;
  // Check if the ID is a valid mongoose id
  if (!ObjectID.isValid(postId) && !ObjectID.isValid(commentId)) {
    return res.status(400).send('Id not in the correct format');
  }
  // delete the comment from the DB collection
  Post.findByIdAndUpdate(postId, { $pull: { comments: { _id: commentId } } }, { new: true }, (err, updatedPost) => {
    if (err) throw err;
    res.send(updatedPost);
  });
});

// 6) to handle updating a post
app.put('/posts/:postId', (req, res) => {
  var id = req.params.postId;
  // Check if the ID is a valid mongoose id
  if (!ObjectID.isValid(id)) {
    return res.status(400).send('Id not in the correct format');
  }
  // update the post in the DB collection
  Post.findByIdAndUpdate(id, { $set: { text: req.body.text } }, { new: true }, (err, updatedPost) => {
    if (err) throw err;
    console.log(updatedPost);
    res.json(updatedPost);
  });
});

// 7) to handle updating a comment
app.put('/posts/:postId/comments/:commentId', (req, res) => {
  let postId = req.params.postId;
  let commentId = req.params.commentId;
  // Check if the ID is a valid mongoose id
  if (!ObjectID.isValid(postId) && !ObjectID.isValid(commentId)) {
    return res.status(400).send('Id not in the correct format');
  }
  // updtae the comment from the DB collection
  Post.update({ _id: postId, 'comments._id': commentId }, { $set: { 'comments.$.text': req.body.text } }, { new: true }, (err, updatedPost) => {
    if (err) throw err;
    res.json(updatedPost);
  });
});

//PORT
const SERVER_PORT = process.env.PORT || 8080;
app.listen(SERVER_PORT, () => console.log(`Server up and running on port ${SERVER_PORT}...`));
