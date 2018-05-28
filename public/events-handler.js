class EventsHandler {
  constructor(postsRepository, postsRenderer) {
    this.postsRepository = postsRepository;
    this.postsRenderer = postsRenderer;
    this.$posts = $('.posts');
  }

  registerAddPost() {
    $('#addpost').on('click', () => {
      let $inputText = $('#postText');
      let $inputTitle = $('#postTitle');
      let $inputUser = $('#postUser');
      if ($inputText.val() === '' || $inputTitle.val() === '' || $inputUser.val() === '') {
        alert('Please enter text, username and title!');
      } else {
        this.postsRepository.addPost($inputText.val(), $inputTitle.val(), $inputUser.val()).then(() => {
          this.postsRenderer.renderPosts(this.postsRepository.posts);
        }).catch(() => {console.log('catch- error in adding post function');});
        $inputText.val('');
        $inputTitle.val('');
        $inputUser.val('');
      }
    });
  }

  registerRemovePost() {
    this.$posts.on('click', '.remove-post', (event) => {
      let index = $(event.currentTarget).closest('.post').index();
      this.postsRepository.removePost(index).then(() => {
        this.postsRenderer.renderPosts(this.postsRepository.posts);
      }).catch(() => { console.log('catch- error in removing post function');});
    });

  }

  registerToggleComments() {
    this.$posts.on('click', '.toggle-comments', (event) => {
      let $clickedPost = $(event.currentTarget).closest('.post');
      $clickedPost.find('.comments-container').toggleClass('show');
      if ($('.comments-container').hasClass('show')) {
        $clickedPost.find('.edit-comment-form').removeClass('show');
      }
    });
  }

  registerAddComment() {
    this.$posts.on('click', '.add-comment', (event) => {
      let $comment = $(event.currentTarget).siblings('.comment');
      let $user = $(event.currentTarget).siblings('.name');

      if ($comment.val() === '' || $user.val() === '') {
        alert('Please enter your name and a comment!');
        return;
      }

      let postIndex = $(event.currentTarget).closest('.post').index();
      let newComment = {
        text: $comment.val(),
        user: $user.val()
      };

      this.postsRepository.addComment(newComment, postIndex).then(() => {
        this.postsRenderer.renderComments(this.postsRepository.posts, postIndex);
      }).catch(() => { console.log('catch- error in adding comment function');});

      $comment.val('');
      $user.val('');
    });
  }

  registerRemoveComment() {
    this.$posts.on('click', '.remove-comment', (event) => {
      // let $commentsList = $(event.currentTarget).closest('.post').find('.comments-list');
      let postIndex = $(event.currentTarget).closest('.post').index();
      let commentIndex = $(event.currentTarget).closest('.comment').index();
      this.postsRepository.deleteComment(postIndex, commentIndex).then(() => {
        this.postsRenderer.renderComments(this.postsRepository.posts, postIndex);
      }).catch(() => {console.log('catch- error in removing post function');});
    });
  }

  registerToggleUpdatePost() {
    this.$posts.on('click', '.edit-post-icon', (event) => {
      let $clickedPost = $(event.currentTarget).closest('.post');
      let textPost = $clickedPost.find('.post-text').text();
      $clickedPost.find('.comments-container').removeClass('show');
      $clickedPost.find('.edit-post-form').toggleClass('show');
      $clickedPost.find('#edit-post-input').val(textPost);
    });
  }

  registerToggleUpdateComment() {
    this.$posts.on('click', '.edit-comment-icon', (event) => {
      let $clickedComment = $(event.currentTarget).closest('.comment');
      $clickedComment.find('.edit-comment-form').toggleClass('show');
      $clickedComment.find('#edit-comment-input').val($clickedComment.find('.commentText').text());
    });
  }

  registerCancelUpdates() {
    this.$posts.on('click', '#cancelEditPost, #cancelEditComment', (event) => {
      let $clickedPost = $(event.currentTarget).closest('.post');
      // if update post was canceled
      if ($(event.currentTarget)[0].id == 'cancelEditPost') {
        $clickedPost.find('.edit-post-form').toggleClass('show');
      } else { // if update comment was canceled
        let $clickedComment = $(event.currentTarget).closest('.comment');
        $clickedComment.find('.edit-comment-form').toggleClass('show');
      }
    });
  }

  registerUpdatePostText() {
    this.$posts.on('click', '#editPostButton', (event) => {
      let postIndex = $(event.currentTarget).closest('.post').index();
      let $clickedPost = $(event.currentTarget).closest('.post');
      let inputText = $clickedPost.find('#edit-post-input').val();

      if (inputText === '') {
        alert('Please enter text for the post!');
        return;
      } else {
        this.postsRepository.updatePost(postIndex, inputText).then(() => {
          this.postsRenderer.renderPosts(this.postsRepository.posts);
        }).catch(() => { console.log('catch- error in update post-text function');});
      }
    });
  }

  registerUpdateCommentText() {
    this.$posts.on('click', '#editCommentButton', (event) => {
      let postIndex = $(event.currentTarget).closest('.post').index();
      let commentIndex = $(event.currentTarget).closest('.comment').index();
      let $inputText = $(event.currentTarget).siblings($('#edit-comment-input')).val();

      if ($inputText === '') {
        alert('Please enter text for the comment!');
        return;
      } else {
        this.postsRepository.updateComment(postIndex, commentIndex, $inputText).then(() => {
          this.postsRenderer.renderComments(this.postsRepository.posts, postIndex);
        }).catch(() => { console.log('catch- error in update post-text function');});
      }
    });
  }

}


export default EventsHandler;