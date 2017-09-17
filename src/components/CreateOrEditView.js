import React, { Component } from "react";
import { connect } from "react-redux";
import {
  loadPostRequest,
  loadCommentsRequest,
  editPostRequest,
  addPostRequest,
  addCommentRequest,
  editCommentRequest
} from "../actions";
import { EditPost, CreatePost } from "./ReadableComponents";

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

    console.log("props createoreditview", this.props);

    const isPost = "post" === this.props.match.params.type;
    const id = this.props.match.params.id ? this.props.match.params.id : '';
    const isCreate = "create" === this.props.mode;
    const addPost = this.props.addPost;
    const editPost = this.props.editPost;
    const post = this.props.posts!=null && Array.isArray(this.props.posts) 
    ? this.props.posts.find(post => post.id==id) : null;

    console.log("create and post", isCreate, isPost, this.props.posts, post);
    if (isCreate) {
      if (isPost) {
        return (
          <div>
            Create Post
            <CreatePost category={id} addPost={addPost} />
          </div>
        );
      } else {
      }
    } else {
      if (isPost && post!=null) {
        return (
          <div>
            Edit Post
            <EditPost post={post} editPost={editPost} />
          </div>
        );
      } else {
      }
    }

    return null;
  }
}

function mapStateToProps({ posts }) {
  return {
    posts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadPost: id => dispatch(loadPostRequest(id)),
    loadComments: id => dispatch(loadCommentsRequest(id)),
    editPost: post => dispatch(editPostRequest(post)),
    addPost: post => dispatch(addPostRequest(post)),
    editComment: post => dispatch(editCommentRequest(post)),
    addComment: post => dispatch(addCommentRequest(post))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateOrEditView);
