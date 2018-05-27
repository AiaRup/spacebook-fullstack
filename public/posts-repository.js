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
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(textStatus);
      }
    });
  }

  removePost(index) {
    let postId = this.posts[index]._id;
    $.ajax({
      method: 'DELETE',
      url: `posts/${postId}`,
      success: () => {
        this.posts.splice(index, 1);
        console.log('post deleted from array');
        postsRenderer.renderPosts(this.posts);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(textStatus);
      }
    });
  }

  addComment(newComment, postIndex) {
    let postId = this.posts[postIndex]._id;
    $.ajax({
      method: 'POST',
      url: `posts/${postId}/comments`,
      data: newComment,
      dataType: 'json',
      success: (updatedPost) => {
        console.log(updatedPost);
        this.posts[postIndex].comments.push(updatedPost.comments[updatedPost.comments.length-1]);
        postsRenderer.renderComments(this.posts, postIndex);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(textStatus);
      }
    });

  }

  deleteComment(postIndex, commentIndex) {
    let postId = this.posts[postIndex]._id;
    let commentId = this.posts[postIndex].comments[commentIndex]._id;
    $.ajax({
      method: 'DELETE',
      url: `posts/${postId}/comments/${commentId}`,
      success: () => {
        this.posts[postIndex].comments.splice(commentIndex, 1);
        console.log('comment deleted from array');
        postsRenderer.renderComments(this.posts, postIndex);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(textStatus);
      }
    });
  }
}

export default PostsRepository;