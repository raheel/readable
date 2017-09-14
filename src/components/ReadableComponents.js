import React, { Component } from "react";
import { Link } from "react-router-dom";


export const Category = props => {
  const name = props.name;
  if (name==null) return <div/>;
  return (
    <div>
      <Link to={`/category/${name}`}>  {name} </Link>
    </div>
  );
};

export const Post = props => {
  const post = props.post;
  if (post==null) return <div/>;

  return (
    <div>
      <Link to={`/post/${post.id}`}><b>{post.title}</b></Link>
      <br />
      {post.body}<br />
    </div>
  );
};

export const PostDetails = props => {
  const post = props.post;
  if (post==null) return <div/>;

  return (
    <div>
      <b>{post.title}</b><br />
      {post.body}<br />
      Author: {post.author}<br />
      Timestamp: {post.author}<br />
      Vote Score: {post.voteScore}<br />
    </div>
  );
};

export const Comment = props => {
  const comment = props.comment;
  if (comment==null) return <div/>;    
  return (
    <div>
      <b>{comment.title}</b><br />
      {comment.body}<br />
      Author: {comment.author}<br />
      Timestamp: {comment.author}<br />
      Vote Score: {comment.voteScore}<br />

    </div>
  );
};


export const EditPost = props => {
  const post = props.post;
  console.log('- - - - - - post ', post);
  if (post==null) return <div/>;

  return (
    <div>
      <b>Post Title </b> 
            <input
        type='text'
        placeholder={post.title}
        ref={(postTitleInput) => this.postTitleInput = postTitleInput}
    />
      <br />
      <b>Post Body </b> 
            <input
        type='text'
        placeholder={post.body}
        ref={(postBodyInput) => this.postBodyInput = postBodyInput}
    />      
    <br />

    <button
        onClick={editPostSubmit} value={props.editPost}>
        Submit
    </button>
    </div>
  );
};

  const editPostSubmit = (e) => {
      console.log('title:', this.postTitleInput.value);
      console.log('body:', this.postBodyInput.value);

      const title = this.postTitleInput.value;
      const body = this.postBodyInput.value;


    if (!this.postTitleInput.value || !this.postBodyInput.value) {
      return
    }

    e.preventDefault()

    e.target.editPost({title, body});

  }