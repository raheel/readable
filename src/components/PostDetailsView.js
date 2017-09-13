import React, { Component } from "react";
import { connect } from "react-redux";
import { loadPostRequest, loadCommentsRequest } from "../actions";
import {PostDetails, Comment} from "./ReadableComponents";

class PostDetailsView extends Component {

  componentDidMount() {
    console.log("-----------componentDidMount 1 ", );
    const id = this.props.match.params.id;
   this.props.loadPost(id);
   this.props.loadComments(id);
  }

  render(){
        const id = this.props.match.params.id;
  const post = this.props.posts['currentPost'];
  const comments = this.props.comments ? this.props.comments[id] : null;
 
    return (
     ( 
       <div>
      <PostDetails post={post}/>
    
            {comments != null && comments instanceof Array
          ?
          <div>
            <br/><br/><br/><br/>
              <b> {comments.length==0 ? "No" : ""} Comments</b>
               <ul>
              {comments.map(comment =>
                <li key={comment.id}>
                  <Comment comment={comment}/>                  
                </li>
              )}
            </ul>
            </div>
          : <div />}
     </div>
     )
     
    )
  }
}

function mapStateToProps({ posts, comments}) {
  console.log("$$$$$$$$$$$$$mapStateToProps ", posts, '________-test__-----')
  return {
    posts,
    comments
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadPost: (id) => dispatch(loadPostRequest(id)),
    loadComments: (id) => dispatch(loadCommentsRequest(id))        
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetailsView);