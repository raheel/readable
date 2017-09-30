import React, { Component } from "react";
import { connect } from "react-redux";
import {
  loadPostRequest,
  editPostRequest,
  addPostRequest,
  loadCommentsRequest,
  loadCommentRequest,
  addCommentRequest,
  editCommentRequest
} from "../actions";
import {
  EditPost,
  CreatePost,
  CreateComment,
  EditComment
} from "./ReadableComponents";
import { withRouter } from "react-router-dom";

class CreateOrEditView extends Component {
  componentDidMount() {
    const isPost = "post" === this.props.match.params.type;
    const id = this.props.match.params.id;
    const isCreate = "create" === this.props.mode;
    const addPost = this.props.addPost;

    if (!isCreate) {
      if (isPost) {
        this.props.loadPost(id);
      } else {
        this.props.loadComment(id);
      }
    }
  }

  render() {
    // const category = this.props.match.params.name;
    // const posts = this.props.posts ? this.props.posts[category] : null;

    const isPost = "post" === this.props.match.params.type;
    const id = this.props.match.params.id ? this.props.match.params.id : "";
    const isCreate = "create" === this.props.mode;
    const addPost = this.props.addPost;
    const editPost = this.props.editPost;
    const post = this.props.posts[id];

    let comment = null;

    if (this.props.comments != null) {
      for (let postId in this.props.comments) {
      }
    }

    Object.keys(this.props.comments).map(postId => {
      this.props.comments[postId].map(c => {
        if (c.id == id) {
          comment = c;
        }
      });
    });

    if (isCreate) {
      if (isPost) {
        return (
          <div>
            <h1 style={{ display: "flex", justifyContent: "center" }}>
              Create Post
            </h1>
            <CreatePost
              hist={this.props.history}
              category={id}
              addPost={addPost}
            />
          </div>
        );
      } else {
        return (
          <div>
            <h1 style={{ display: "flex", justifyContent: "center" }}>
              Create Comment
            </h1>
            <CreateComment
              hist={this.props.history}
              postId={id}
              addComment={this.props.addComment}
            />
          </div>
        );
      }
    } else {
      if (isPost) {
        if (post == null) {
          return null;
        }
        return (
          <div>
            <h1 style={{ display: "flex", justifyContent: "center" }}>
              Edit Post
            </h1>
            <EditPost
              hist={this.props.history}
              post={post}
              editPost={editPost}
            />
          </div>
        );
      } else {
        return (
          <div>
            <h1 style={{ display: "flex", justifyContent: "center" }}>
              Edit Comment
            </h1>
            <EditComment
              hist={this.props.history}
              comment={comment}
              editComment={this.props.editComment}
            />
          </div>
        );
      }
    }
  }
}

function mapStateToProps({ posts, comments }) {
  return {
    posts,
    comments
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadPost: id => dispatch(loadPostRequest(id)),
    editPost: (hist, post) => dispatch(editPostRequest(hist, post)),
    addPost: (hist, post) => dispatch(addPostRequest(hist, post)),
    loadComments: id => dispatch(loadCommentsRequest(id)),
    loadComment: id => dispatch(loadCommentRequest(id)),

    editComment: (hist, comment) => dispatch(editCommentRequest(hist, comment)),
    addComment: (hist, comment) => dispatch(addCommentRequest(hist, comment))
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CreateOrEditView)
);
