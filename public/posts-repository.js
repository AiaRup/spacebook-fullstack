/**
     * @class Responsible for storing and manipulating Spacebook posts, in-memory
     */

import PostsRenderer from './posts-renderer.js';
let postsRenderer = new PostsRenderer();

class PostsRepository {
  constructor() {
    this.posts = [];
  }

  addPost(postText) {
    $.ajax({
      method: 'POST',
      url: 'posts',
      data: {
        text: postText
      },
      dataType: 'json',
      success: (newPost) => {
        this.posts.push({ text: newPost.text, comments: [], _id: newPost._id });
        postsRenderer.renderPosts(this.posts);
        // console.log(newPost);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(textStatus);
      }
    });
  }

  removePost(index) {
    this.posts.splice(index, 1);
  }

  addComment(newComment, postIndex) {
    this.posts[postIndex].comments.push(newComment);
  }

  deleteComment(postIndex, commentIndex) {
    this.posts[postIndex].comments.splice(commentIndex, 1);
  }
}

export default PostsRepository;