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
  const {post, hist} = props;
  if (post == null || post.deleted!=false) return <div />;

  return (
    <div className='post'>
      <Link to={`/post/${post.id}`}><b>{post.title}</b></Link><br/>

      <br />
      {post.body}<br />
      Timestamp: {new Date(post.timestamp).toUTCString()}<br />
      Vote Score: {post.voteScore}<br />

          <Route
              render={({ history }) =>
          <button
            type="button"
             onClick={() => {
              history.push('/create/post/' + post.category);
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
              history.push('/edit/post/' + post.id);
            }}
          >
                Edit
            </button>}
        />

        <button onClick={() => props.deletePost(hist, post.id)}>Delete</button>

  <br/>

      <button onClick={() => props.votePost(post.id, "upVote")}>Upvote</button>
      <button onClick={() => props.votePost(post.id, "downVote")}>Downvote</button>
    </div>
  );
};

export const PostDetails = props => {
  const {post, hist} = props;
  const comments = props.comments;
  console.log('----------postdetails, ', props);
  if (post == null || post.deleted!=false) return <div />;

  return (
    <div className='post'>
      <b>{post.title}</b><br/>
      {post.body}<br />
      Author: {post.author}<br />
      Timestamp: {new Date(post.timestamp).toUTCString()}<br />
      Vote Score: {post.voteScore}<br />
      Category: {post.category}<br />
      Owner: {post.owner}<br />

      <Route
        render={({ history }) =>
          <button
            type="button"
             onClick={() => {
              history.push('/create/post/' + post.category);
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
              history.push('/edit/post/' + post.id);
            }}
          >
              Edit
            </button>}
        />

        <button onClick={() => props.deletePost(hist, post.id)}>Delete</button>

  <br/>

      <button onClick={() => props.votePost(post.id, "upVote")}>Upvote</button>
      <button onClick={() => props.votePost(post.id, "downVote")}>Downvote</button>
      

          {comments != null && comments instanceof Array
            ? <div>
                <br /><br /><br /><br />
                <b> {comments.length == 0 ? "No" : ""} Comments</b>
                <ul>
                  {comments.map(comment =>
                    <li  className='comment' key={comment.id}>
                      <Comment comment={comment} voteComment={props.voteComment} />
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
  if (comment == null || comment.deleted!=false ) return <div />;
  return (
    <div>
      <b>{comment.title}</b><br />
      {comment.body}<br />
      Author: {comment.author}<br />
      Timestamp: {comment.author}<br />
      Vote Score: {comment.voteScore}<br />

      <button onClick={() => props.voteComment(comment.parentId, comment.id, "upVote")}>Upvote</button>
      <button onClick={() => props.voteComment(comment.parentId, comment.id, "downVote")}>Downvote</button>

      <Route
        render={({ history }) =>
          <button
            type="button"
             onClick={() => {
              history.push('/edit/comment/' + comment.id);
            }}
          >
            Edit
          </button>}
      />

      <button onClick={() => props.delete(comment.id)}>Delete</button>
          </div>

  );
};

export const CreatePost = props => {
  const category = props.category;

  console.log("category", category);
  console.log("------------>addPost", props.addPost);
  if (category == null) return <div />;

  return (
    <div className='post'>
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
  const {post, hist} = props;

  console.log('editpost ', post);
  if (post == null) return <div />;

  return (
    <div className='post'>
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

const addPostSubmit = (hist, addPost) => {
  console.log("title:", this.postTitleInput.value);
  console.log("body:", this.postBodyInput.value);
  console.log("category:", this.postCategoryInput.value);
  console.log("addPost:", addPost);
  console.log("hist:", hist);

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

  console.log("addPost done");
};

const editPostSubmit = (hist, id, editPost) => {
  console.log("title:", this.postTitleInput.value);
  console.log("body:", this.postBodyInput.value);
  console.log("history:", hist);
  const title = this.postTitleInput.value;
  const body = this.postBodyInput.value;

  if (!this.postTitleInput.value || !this.postBodyInput.value) {
    return;
  }

  window.event.preventDefault();

  editPost(hist, { id, title, body });
};
