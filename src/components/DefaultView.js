import React, { Component } from "react";
import { connect } from "react-redux";
import {
  loadCategoriesRequest,
  loadPostsRequest,
  editPostRequest,
  deletePostRequest,
  votePostRequest
} from "../actions";
import { Link } from "react-router-dom";
import { Category, Post } from "./ReadableComponents";

class DefaultView extends Component {
  constructor(props) {
    super(props);
    this.state = { sortBy: "voteScore" };

    this.sortPosts = this.sortPosts.bind(this);
  }

  componentDidMount() {
    this.props.loadCategoriesRequest();
    this.props.loadAllPosts();
  }

  render() {
    console.log("-----------------render");

    const categories = this.props.categories.categories;
    const posts = this.props.posts;

    return (
      <div>
        {categories != null
          ? <div>
              <h1 style={{ display: "flex", justifyContent: "center" }}>
                Categories
              </h1>

              <div style={{ margin: "0 auto", width: "50%" }}>
                {categories.map(category =>
                  <div key={category.name}>
                    <Category name={category.name} />
                  </div>
                )}
              </div>
            </div>
          : <div />}
        <br />
        {this.sortAndDisplayPosts(posts)}
      </div>
    );
  }

  sortAndDisplayPosts(posts) {
    console.log('-----------posts', posts);
    this.sortPosts(posts);
    return this.displayPosts(posts);
  }

  displayPosts(posts) {
    console.log("posts", posts);
    console.log("------displayPosts", posts instanceof Array, posts != null);
    {
      return posts != null && posts instanceof Array
        ? <div>
            <h1 style={{ display: "flex", justifyContent: "center" }}>Posts</h1>
            <div style={{ margin: "0 auto", width: "50%" }}>

              Sort By{" "}
              <select value={this.state.sortBy} onChange={this.sortPosts}>
                <option value="voteScore">Vote Score</option>
                <option value="timestamp">Date</option>
              </select>
            </div>
            <ul>
              asdfafd
              {

                posts.map(id => {
                let post = posts[id];
                console.log('----post, id', post, id)
                return
                (<li key={id}>
                  <Post
                    detailed="false"
                    post={post}
                    hist={this.props.history}
                    votePost={this.props.votePost}
                    editPost={this.props.editPost}
                    deletePost={this.props.deletePost}
                  />
                </li>)
              })}
            </ul>
          </div>
        : <div />;
    }
  }

  sortPosts(event) {
    let posts = this.props.posts;
    if (posts == null || !(posts instanceof Array)) {
      return;
    }
    console.log("-------posts:", posts);
    let sortBy = this.state.sortBy;
    if (event.target) {
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
  }
}

function mapStateToProps({ categories, posts }) {
  return {
    categories,
    posts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadCategoriesRequest: () => dispatch(loadCategoriesRequest()),
    loadAllPosts: () => dispatch(loadPostsRequest("all")),
    editPost: (hist, post) => dispatch(editPostRequest(hist, post)),
    deletePost: id => dispatch(deletePostRequest(id)),
    votePost: (id, mode) => dispatch(votePostRequest(id, mode))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DefaultView);
