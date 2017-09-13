import React, { Component } from "react";
import { connect } from "react-redux";
import { loadPostsRequest } from "../actions";
import {PostDetails} from "./ReadableComponents";


class CreateOrEditView extends Component {

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
    editPost: (post) => dispatch(editPostRequest(post)),    
    addPost: (post) => dispatch(addPostRequest(post)),    
    editComment: (post) => dispatch(editCommentRequest(post)),    
    addComment: (post) => dispatch(addCommentRequest(post)),      
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryView);