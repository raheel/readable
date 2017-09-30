import React, { Component } from "react";
import { connect } from "react-redux";
import {
  loadPostRequest,
  editPostRequest,
  deletePostRequest,
  votePostRequest,
  loadCommentsRequest,
  editCommentRequest,
  deleteCommentRequest,
  voteCommentRequest
} from "../actions";
import { Post, Comment } from "./ReadableComponents";
import { withRouter } from "react-router-dom";

class PostDetailsView extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.loadPost(id);
    this.props.loadComments(id);
  }

  render() {
    const id = this.props.match.params.id;
    let posts = this.props.posts;
    let post = null;

    if (posts == null || Object.keys(posts).length == 0) {
      return null;
    }

    post = posts[id];

    const comments = this.props.comments ? this.props.comments[id] : null;

    if (post != null) {
      return (
        <div>
          <h1 style={{ display: "flex", justifyContent: "center" }}>
            Post Details
          </h1>
          <Post
            detailed="true"
            post={post}
            comments={comments}
            hist={this.props.history}
            votePost={this.props.votePost}
            editPost={this.props.editPost}
            deletePost={this.props.deletePost}
            voteComment={this.props.voteComment}
            deleteComment={this.props.deleteComment}
          />
        </div>
      );
    } else {
      return <div />;
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
    deletePost: (hist, post) => dispatch(deletePostRequest(hist, post)),
    votePost: (id, mode) => dispatch(votePostRequest(id, mode)),
    loadComments: id => dispatch(loadCommentsRequest(id)),
    editComment: comment => dispatch(editCommentRequest(comment)),
    deleteComment: comment => dispatch(deleteCommentRequest(comment)),
    voteComment: (postId, categoryId, mode) =>
      dispatch(voteCommentRequest(postId, categoryId, mode))
  };
}

export default withRouter(
  connect(mapStateTßoProps, mapDispatchToProps)(PostDetailsView)
);
