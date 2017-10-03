import React, { Component } from "react";
import { connect } from "react-redux";
import {
  loadPostsRequest,
  loadCommentsRequest,
  editPostRequest,
  deletePostRequest,
  votePostRequest
} from "../actions";
import { Post } from "./ReadableComponents";
import { Link, Route, withRouter } from "react-router-dom";

let newPostButton = null;

class CategoryView extends Component {
  constructor(props) {
    super(props);
    this.state = { sortBy: "voteScore" };

    this.sortPosts = this.sortPosts.bind(this);
  }

  componentDidMount() {
    const category = this.props.match.params.category;

    this.props.loadPosts(category);

    newPostButton = (
      <Route
        render={({ history }) =>
          <button
            type="button"
            onClick={() => {
              history.push("/create/post/" + category);
            }}
          >
            New
          </button>}
      />
    );
  }

  render() {
    const category = this.props.match.params.category;
    let posts = this.props.posts;
    let comments = this.props.comments;

    if (Object.keys(posts).length == 0) {
      return (
        <div>
          <h1 style={{ display: "flex", justifyContent: "center" }}>
            No Posts
          </h1>

          {newPostButton}
        </div>
      );
    }

    posts = Object.keys(posts).map(id => posts[id]).filter(post => {
      return post.category === category;
    });

    if (
      posts != null &&
      Object.keys(posts).length != 0 &&
      Object.keys(comments).length == 0
    ) {
      Object.keys(posts).forEach((id, index) => {
        let post = posts[id];

        if (!post.deleted) {
          this.props.loadComments(post.id);
        }
      });
    }

    posts = this.sortPosts(this.state.sortBy, posts);

    return (
      <div>

        {this.displayPosts(posts)}
      </div>
    );
  }

  displayPosts(posts) {
    let items = null;
    if (posts != null) {
      items = posts.map(post =>
        <li key={post.id}>
          <Post
            detailed={false}
            post={post}
            comments={this.props.comments ? this.props.comments[post.id] : null}
            hist={this.props.history}
            votePost={this.props.votePost}
            editPost={this.props.editPost}
            deletePost={this.props.deletePost}
          />
        </li>
      );
    }

    return posts != null
      ? <div>
          <h1 style={{ display: "flex", justifyContent: "center" }}>Posts</h1>
          <div style={{ margin: "0 auto", width: "50%" }}>
            {newPostButton}
            <br />
            Sort By{" "}
            <select
              value={this.state.sortBy}
              onChange={event => {
                let sortBy = event.target.value;

                this.setState({ sortBy });
                this.sortPosts(sortBy, posts);
              }}
            >
              <option value="voteScore">Vote Score</option>
              <option value="timestamp">Date</option>
            </select>
          </div>
          <ul>
            {items}
          </ul>
        </div>
      : <div />;
  }

  sortPosts(sortBy, posts) {
    posts.sort((post1, post2) => {
      if (sortBy === "voteScore") {
        return post2.voteScore - post1.voteScore;
      } else if (sortBy === "timestamp") {
        return post1.timestamp - post2.timestamp;
      }
    });

    return posts;
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
    loadPosts: id => dispatch(loadPostsRequest(id)),
    editPost: (hist, post) => dispatch(editPostRequest(hist, post)),
    deletePost: (displayFunction, id) =>
      dispatch(deletePostRequest(displayFunction, id)),
    votePost: (id, mode) => dispatch(votePostRequest(id, mode)),
    loadComments: id => dispatch(loadCommentsRequest(id))
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CategoryView)
);
