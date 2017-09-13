import React, { Component } from "react";
import { connect } from "react-redux";
import { loadPostsRequest } from "../actions";
import {PostDetails} from "./ReadableComponents";


class CategoryView extends Component {

  componentDidMount() {
    console.log("-----------componentDidMount 1 ", );
    const category = this.props.match.params.name;
   this.props.loadPosts(category);
  }

  render(){
    const category = this.props.match.params.name;
    const posts = this.props.posts ? this.props.posts[category] : null;


    
  return (
    <div>
        {posts != null && posts instanceof Array
          ?
          <div>
              <b>Posts</b>
               <ul>
              {posts.map(post =>
                <li key={post.id}>
                  <PostDetails post={post}/>                  
                </li>
              )}
            </ul>
            </div>
          : <div />}
    </div>
  )
}

}

function mapStateToProps({ posts }) {
  return {
    posts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadPosts: (category) => dispatch(loadPostsRequest(category))    
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryView);