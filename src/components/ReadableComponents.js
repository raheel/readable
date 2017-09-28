import React, { Component } from "react";
import { Link, Route } from "react-router-dom";

export const Category = props => {
  const name = props.name;
  if (name == null) return <div />;
  return (
    <div>
      <Link to={`/category/${name}`}>  {name} </Link>
    </div>
  );
};

export const Post = props => {
  const { post, comments, detailed, hist } = props;

  if (post == null || post.deleted != false) return <div />;

  if (comments != null) {
    comments.sort(
      (comment1, comment2) => comment2.voteScore - comment1.voteScore
    );
  }

  let filteredComments = null;
  if (comments != null) {
    filteredComments = comments.filter(
      comment => comment.deleted !== "true" && comment.deleted !== true
    );
  }
  let hasComments = filteredComments == null
    ? false
    : filteredComments.length > 0;

  return (
    <div className="post">
      <Link to={`/post/${post.id}`}><b>{post.title}</b></Link><br />
      {post.body}<br />
      Author: {post.author}<br />
      Timestamp: {new Date(post.timestamp).toUTCString()}<br />
      Vote Score: {post.voteScore}<br />

      {detailed
        ? <div>
            Category:
            <Link to={`/category/${post.category}`}>{post.category}</Link><br />

            Owner: {post.owner}<br />
          </div>
        : <div />}

      <Route
        render={({ history }) =>
          <button
            type="button"
            onClick={() => {
              history.push("/create/post/" + post.category);
            }}
          >
            New

          </button>}
      />

      <Route
        render={({ history }) =>
          <button
            type="button"
            onClick={() => {
              history.push("/edit/post/" + post.id);
            }}
          >
            Edit
          </button>}
      />

      <button onClick={() => props.deletePost(hist, post)}>Delete</button>

      <br />

      <button onClick={() => props.votePost(post.id, "upVote")}>Upvote</button>
      <button onClick={() => props.votePost(post.id, "downVote")}>
        Downvote
      </button>

      {filteredComments != null
        ? <div>
            <br /><br /><br /><br />
            <b> {!hasComments ? "No" : ""} Comments</b><br />
            <Route
              render={({ history }) =>
                <button
                  type="button"
                  onClick={() => {
                    history.push("/create/comment/" + post.id);
                  }}
                >
                  New
                </button>}
            />

            <ul>

              {filteredComments.length != 0 &&
                filteredComments.map(comment =>
                  <li className="comment" key={comment.id}>
                    <Comment
                      comment={comment}
                      voteComment={props.voteComment}
                      deleteComment={props.deleteComment}
                    />
                  </li>
                )}
            </ul>
          </div>
        : <div />}
    </div>
  );
};

export const Comment = props => {
  const comment = props.comment;
  if (comment == null || comment.deleted != false) return <div />;
  return (
    <div>
      <b>{comment.title}</b><br />
      {comment.body}<br />
      Author: {comment.author}<br />
      Timestamp: {comment.author}<br />
      Vote Score: {comment.voteScore}<br />

      <Route
        render={({ history }) =>
          <button
            type="button"
            onClick={() => {
              history.push("/create/comment/" + comment.parentId);
            }}
          >
            New
          </button>}
      />

      <Route
        render={({ history }) =>
          <button
            type="button"
            onClick={() => {
              history.push("/edit/comment/" + comment.id);
            }}
          >
            Edit
          </button>}
      />

      <button onClick={() => props.deleteComment(comment)}>Delete</button>
      <br />

      <button
        onClick={() =>
          props.voteComment(comment.parentId, comment.id, "upVote")}
      >
        Upvote
      </button>
      <button
        onClick={() =>
          props.voteComment(comment.parentId, comment.id, "downVote")}
      >
        Downvote
      </button>

    </div>
  );
};

export const CreatePost = props => {
  const category = props.category;

  //
  //
  if (category == null) return <div />;

  return (
    <div className="post">
      <b>Post Title </b>
      <input
        type="text"
        ref={postTitleInput => (this.postTitleInput = postTitleInput)}
      />
      <br />
      <b>Post Body </b>
      <input
        type="text"
        ref={postBodyInput => (this.postBodyInput = postBodyInput)}
      />
      <br />
      <b>Post Category </b>
      <input
        type="text"
        defaultValue={category}
        ref={postCategoryInput => (this.postCategoryInput = postCategoryInput)}
      />

      <br />

      <button
        onClick={() => {
          addPostSubmit(props.hist, props.addPost);
        }}
      >

        Submit
      </button>
    </div>
  );
};

export const EditPost = props => {
  const { post, hist } = props;

  if (post == null) return <div />;

  return (
    <div className="post">
      <b>Post Title </b>
      <input
        type="text"
        defaultValue={post.title}
        ref={postTitleInput => (this.postTitleInput = postTitleInput)}
      />
      <br />
      <b>Post Body </b>
      <input
        type="text"
        defaultValue={post.body}
        ref={postBodyInput => (this.postBodyInput = postBodyInput)}
      />
      <br />

      <button
        onClick={() => {
          editPostSubmit(hist, post.id, props.editPost);
        }}
      >
        Submit
      </button>
    </div>
  );
};

export const CreateComment = props => {
  const postId = props.postId;

  //
  //
  if (props.postId == null) return <div />;

  return (
    <div className="post">
      <b>Comment</b>
      <input
        type="text"
        ref={commentBodyInput => (this.commentBodyInput = commentBodyInput)}
      />
      <br />
      <b>Author </b>
      <input
        type="text"
        ref={commentAuthorInput =>
          (this.commentAuthorInput = commentAuthorInput)}
      />
      <br />

      <button
        onClick={() => {
          addCommentSubmit(props.hist, props.postId, props.addComment);
        }}
      >

        Submit
      </button>
    </div>
  );
};

export const EditComment = props => {
  const comment = props.comment;

  //
  //
  if (comment == null) return <div />;

  return (
    <div className="post">
      <b>Comment</b>
      <input
        type="text"
        defaultValue={comment.body}
        ref={commentBodyInput => (this.commentBodyInput = commentBodyInput)}
      />
      <br />

      <button
        onClick={() => {
          editCommentSubmit(props.hist, props.comment, props.editComment);
        }}
      >

        Submit
      </button>
    </div>
  );
};

const addPostSubmit = (hist, addPost) => {
  //
  //
  //
  //
  //

  const title = this.postTitleInput.value;
  const body = this.postBodyInput.value;
  const category = this.postCategoryInput.value;
  const owner = category;
  const timestamp = Date.now();
  const id = timestamp;

  if (
    !this.postTitleInput.value ||
    !this.postBodyInput.value ||
    !this.postCategoryInput.value
  ) {
    return;
  }

  window.event.preventDefault();

  addPost(hist, { id, title, body, category, owner, timestamp });

  //
};

const editPostSubmit = (hist, id, editPost) => {
  //
  //
  //
  const title = this.postTitleInput.value;
  const body = this.postBodyInput.value;

  if (!this.postTitleInput.value || !this.postBodyInput.value) {
    return;
  }

  window.event.preventDefault();

  editPost(hist, { id, title, body });
};

const addCommentSubmit = (hist, postId, addComment) => {
  //
  //

  //

  const body = this.commentBodyInput.value;
  const author = this.commentAuthorInput.value;
  const parentId = postId;
  const timestamp = Date.now();
  const id = timestamp;

  if (!this.commentBodyInput.value || !this.commentAuthorInput.value) {
    return;
  }

  window.event.preventDefault();

  addComment(hist, { id, body, author, parentId, timestamp });

  //
};

const editCommentSubmit = (hist, comment, editComment) => {
  //
  //

  //

  const body = this.commentBodyInput.value;
  const timestamp = Date.now();

  if (!this.commentBodyInput.value) {
    return;
  }

  window.event.preventDefault();
  let parentId = comment.parentId;
  let id = comment.id;

  editComment(hist, { id, parentId, body, timestamp });

  //
};
