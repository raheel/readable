import React, { Component } from "react";
import { connect } from "react-redux";
import { loadCategoriesRequest, loadPostsRequest } from "../actions";
import { Link } from "react-router-dom";
import {Category, Post} from "./ReadableComponents";

class DefaultView extends Component {
  componentDidMount() {
    this.props.loadCategoriesRequest();
    this.props.loadAllPosts();
  }

  render() {
    const categories = this.props.categories.categories;
    const posts = this.props.posts ? this.props.posts['all'] : null;

    return (
      <div>
        {categories != null
          ?
          <div>
              <b>Categories</b>
               <ul>
              {categories.map(category =>


                <li key={category.name}>
                <Category name={category.name}/>
                </li>
              )}
            </ul>
            </div>
          : <div />}
<br/>
        {posts != null && posts instanceof Array
          ?
          <div>
              <b>Posts</b>
               <ul>
              {posts.map(post =>
                <li key={post.id}>
                  <Post post={post}/>
                  <br/>
                </li>
              )}
            </ul>
            </div>
          : <div />}
      </div>
    );
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
    loadAllPosts: () => dispatch(loadPostsRequest('all'))    
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DefaultView);
