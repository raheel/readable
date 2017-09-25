import React, { Component } from "react";
import { connect } from "react-redux";
import {
  loadPostsRequest,
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
    const category = this.props.match.params.name;
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
    const category = this.props.match.params.name;
    let posts = this.props.posts;
                console.log('---posts', posts);

    if (Object.keys(posts).length== 0) {
      return (
        <div>
            <h1 style={{ display: "flex", justifyContent: "center" }}>No Posts</h1>

          {newPostButton}
        </div>
      );
    }

                    console.log('---*****posts', posts);

      console.log("printing id");

    posts = posts.filter(id => {
      console.log("id");
      return posts[id].category === category
    });
                console.log('--->>>>posts', posts);

    return (
      <div>

      {this.displayPosts(posts)}
      </div>
    );
  }

    displayPosts(posts) {
                console.log('posts', posts);

    {
      return posts != null && posts instanceof Array
        ? <div>
            <h1 style={{ display: "flex", justifyContent: "center" }}>Posts</h1>
            <div style={{ margin: "0 auto", width: "50%" }}>
                  {newPostButton}
<br/>
              Sort By{" "}
              <select value={this.state.sortBy} onChange={this.sortPosts}>
                <option value="voteScore">Vote Score</option>
                <option value="timestamp">Date</option>
              </select>
            </div>
            <ul>
              {
                posts.map(id =>
                <li key={id}>
                  <Post detailed="false" post={posts[id]} hist={this.props.history}
          votePost={this.props.votePost} editPost={this.props.editPost} deletePost={this.props.deletePost}
          />
                </li>
              )}
            </ul>
          </div>
        : <div />;
    }
  }

  sortPosts(event) {
    let posts = this.props.posts;
    let sortBy = this.getState('sortBy');
    if (event.target){
    let sortBy = event.target.value;

    this.setState({ sortBy });
    }
    posts.sort((post1, post2) => {
      if (sortBy === "voteScore") {
        return post1.voteScore - post2.voteScore;
      } else if (sortBy === "timestamp") {
        return post1.timestamp - post2.timestamp;
      }
    });

    this.displayPosts(posts);
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
    deletePost: (displayFunction, id) =>
      dispatch(deletePostRequest(displayFunction, id)),
    votePost: (id, mode) => dispatch(votePostRequest(id, mode))
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CategoryView)
);
