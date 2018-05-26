import PostsRepository from './posts-repository.js';
import PostsRenderer from './posts-renderer.js';
import EventsHandler from './events-handler.js';

let postsRepository = new PostsRepository();
let postsRenderer = new PostsRenderer();
let eventsHandler = new EventsHandler(postsRepository, postsRenderer);

eventsHandler.registerAddPost();
eventsHandler.registerRemovePost();
eventsHandler.registerToggleComments();
eventsHandler.registerAddComment();
eventsHandler.registerRemoveComment();


const SpacebookApp = function() {
  // request all the posts from the DB
  let getAllPosts = function() {
    $.ajax({
      method: 'Get',
      url: 'posts',
      success: function(posts) {
        postsRepository.posts = [];
        // add the posts and comments to the array
        for (var i = 0; i < posts.length; i++) {
          postsRepository.posts.push({ text: posts[i].text, comments: [], _id: posts[i]._id });
          for (const comment of posts[i].comments) {
            postsRepository.addComment(comment, i);
          }
        }
        // render all posts and comments on the page
        postsRenderer.renderPosts(postsRepository.posts);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(textStatus);
      }
    });
  };
  // Get all posts as soon as the page loads
  getAllPosts();

  return {
    getAllPosts
  };
};

let app = SpacebookApp();
