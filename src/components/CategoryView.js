import React, { Component } from "react";
import { connect } from "react-redux";
import {
loadPostsRequest, editPostRequest,
  deletePostRequest,
  votePostRequest
} from "../actions";
import { Post } from "./ReadableComponents";
import { Link, Route, withRouter } from "react-router-dom";

let newPostButton = null;
      
class CategoryView extends Component {
  componentDidMount() {
    const category = this.props.match.params.name;
    this.props.loadPosts(category);

    newPostButton = 
      <Route
        render={({ history }) =>
          <button
            type="button"
             onClick={() => {
              history.push('/create/post/' + category);
            }}
          >
            New
          </button>}
      />;
  }

  render() {
    const category = this.props.match.params.name;
    let posts = this.props.posts;

    if (!Array.isArray(posts) || posts.length == 0) {
      return (
        <div>
          <b>No Posts</b><br />

{newPostButton}
        </div>
      );
    }

    posts = posts.filter(post => post.category === category);

    return (
      <div>
        {posts != null && posts instanceof Array
          ? <div>
              <b>Posts</b><br />
{newPostButton}

              <ul>
                {posts.map(post =>
                  <li key={post.id}>
                    <Post post={post} votePost={this.props.votePost} deletePost={this.props.deletePost} />
                  </li>
                )}
              </ul>
            </div>
          : <div />}
      </div>
    );
  }
}

function mapStateToProps({ posts }) {
  return {
    posts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadPosts: id => dispatch(loadPostsRequest(id)),
    editPost: (hist, post) => dispatch(editPostRequest(hist, post)),    
    deletePost: (displayFunction, id) => dispatch(deletePostRequest(displayFunction, id)),    
    votePost: (id, mode) => dispatch(votePostRequest(id, mode))
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CategoryView));
