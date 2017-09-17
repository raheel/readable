import React, { Component } from "react";
import { connect } from "react-redux";
import {
  loadPostsRequest,
  deletePostRequest,
  votePostRequest
} from "../actions";
import { Post } from "./ReadableComponents";
import { Link } from "react-router-dom";

class CategoryView extends Component {
  componentDidMount() {
    const category = this.props.match.params.name;
    this.props.loadPosts(category);
  }

  render() {
    const category = this.props.match.params.name;
    let posts = this.props.posts;

    if (!Array.isArray(posts) || posts.length == 0) {
      return (
        <div>
          <b>No Posts</b><br />
          <Link to={`/create/post`}>Create Post</Link>
        </div>
      );
    }

    posts = posts.filter(post => post.category === category);

    return (
      <div>
        {posts != null && posts instanceof Array
          ? <div>
              <b>Posts</b><br />
              <Link to={`/create/post`}>Create Post</Link>

              <ul>
                {posts.map(post =>
                  <li key={post.id}>
                    <Post post={post} vote={this.props.votePost} delete={this.props.deletePost} />
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
    loadPosts: category => dispatch(loadPostsRequest(category)),
    votePost: (id, mode) => dispatch(votePostRequest(id, mode)),
    deletePost: id => dispatch(deletePostRequest(id))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryView);
