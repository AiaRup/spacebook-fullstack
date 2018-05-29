/**
     * @class Responsible for storing and manipulating Spacebook posts, in-memory
     */
class PostsRepository {
  constructor() {
    this.posts = [];
  }

  addPost(postText, postTitle, postUser) {
    let postTime = new Date();
    postTime = postTime.toLocaleTimeString().substring(0, 5) + ' on ' + postTime.toLocaleDateString().replace(/\./g, '/');
    return $.ajax({
      method: 'POST',
      url: 'posts',
      data: {
        title: postTitle,
        text: postText,
        username: postUser,
        time: postTime
      },
      dataType: 'json',
      success: (newPost) => {
        this.posts.push(newPost);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(textStatus);
      }
    });
  }

  removePost(index) {
    let postId = this.posts[index]._id;
    return $.ajax({
      method: 'DELETE',
      url: `posts/${postId}`,
      success: () => {
        this.posts.splice(index, 1);
        console.log('post deleted from local array');
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(textStatus);
      }
    });
  }

  updatePost(index, postText) {
    let postId = this.posts[index]._id;
    return $.ajax({
      method: 'PUT',
      url: `posts/${postId}`,
      data: {
        text: postText
      },
      success: (updatedPost) => {
        this.posts[index].text = postText;
        console.log('post in local array updated');
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(textStatus);
      }
    });
  }

  addComment(newComment, postIndex) {
    let postId = this.posts[postIndex]._id;
    return $.ajax({
      method: 'POST',
      url: `posts/${postId}/comments`,
      data: newComment,
      dataType: 'json',
      success: (updatedPost) => {
        this.posts[postIndex].comments.push(updatedPost.comments[updatedPost.comments.length-1]);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(textStatus);
      }
    });

  }

  deleteComment(postIndex, commentIndex) {
    let postId = this.posts[postIndex]._id;
    let commentId = this.posts[postIndex].comments[commentIndex]._id;
    return $.ajax({
      method: 'DELETE',
      url: `posts/${postId}/comments/${commentId}`,
      success: () => {
        this.posts[postIndex].comments.splice(commentIndex, 1);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(textStatus);
      }
    });
  }

  updateComment(postIndex, commentIndex, commentText) {
    let postId = this.posts[postIndex]._id;
    let commentId = this.posts[postIndex].comments[commentIndex]._id;
    return $.ajax({
      method: 'PUT',
      url: `posts/${postId}/comments/${commentId}`,
      data: {
        text: commentText
      },
      success: () => {
        this.posts[postIndex].comments[commentIndex].text = commentText;
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(textStatus);
      }
    });
  }
}

export default PostsRepository;