import React, { Component } from "react";
import { connect } from "react-redux";
import { loadPostRequest, loadCommentsRequest, editPostRequest  } from "../actions";
import {EditPost} from "./ReadableComponents";


class CreateOrEditView extends Component {

  componentDidMount() {
        const id = this.props.match.params.id;
   this.props.loadPost(id);
  //   console.log("-----------componentDidMount 1 ", );
  //   const category = this.props.match.params.name;
  //  this.props.loadPosts(category);
  }

  render(){
    // const category = this.props.match.params.name;
    // const posts = this.props.posts ? this.props.posts[category] : null;

    console.log('props createoreditview', this.props);
      const post = this.props.posts ? this.props.posts['currentPost'] : null;

console.log('(((((((((((( post', post, '----', this.props.posts['currentPost']);
  return (
    post ? 
    <div>
      Edit Post
    <EditPost post={post} />
    </div>
    : <div/>
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
        loadPost: (id) => dispatch(loadPostRequest(id)),
    loadComments: (id) => dispatch(loadCommentsRequest(id)) ,  
   
    editPost: (post) => dispatch(editPostRequest(post)),  
     /*  
    addPost: (post) => dispatch(addPostRequest(post)),    
    editComment: (post) => dispatch(editCommentRequest(post)),    
    addComment: (post) => dispatch(addCommentRequest(post)), 
    */     
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateOrEditView);