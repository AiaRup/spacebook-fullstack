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
eventsHandler.registerToggleUpdatePost();
eventsHandler.registerToggleUpdateComment();
eventsHandler.registerCancelUpdates();
eventsHandler.registerUpdatePostText();
eventsHandler.registerUpdateCommentText();


// Get all posts as soon as the page loads
postsRepository.getAllPosts().then(() => {
  // render all posts and comments on the page
  postsRenderer.renderPosts(postsRepository.posts);
});

