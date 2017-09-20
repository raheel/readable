import React, { Component } from "react";
import { connect } from "react-redux";
import { loadPostRequest, editPostRequest, deletePostRequest, votePostRequest,
loadCommentsRequest, editCommentRequest, deleteCommentRequest, voteCommentRequest} from "../actions";
import { PostDetails, Comment } from "./ReadableComponents";
import { withRouter } from "react-router-dom";

class PostDetailsView extends Component {
  componentDidMount() {
    console.log("-----------componentDidMount 1 ");
    const id = this.props.match.params.id;
    this.props.loadPost(id);
    this.props.loadComments(id);
  }

  render() {
    const id = this.props.match.params.id;
    let posts = this.props.posts;
    let post = null;

    console.log('=====render ', this.props)
    if (posts==null || !Array.isArray(posts)){
      return null;
    }

    for (let p of posts) {
      if (p.id == id) {
        post = p;
      }
    }


    const comments = this.props.comments ? this.props.comments[id] : null;

    if (post != null) {
      return (
        <div>
          <h1 style={{display: 'flex', justifyContent: 'center'}}>Post Details</h1>
          <PostDetails post={post} comments={comments} hist={this.props.history}
          votePost={this.props.votePost} editPost={this.props.editPost} deletePost={this.props.deletePost}
          voteComment={this.props.voteComment} deleteComment={this.props.deleteComment}/>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

function mapStateToProps({ posts, comments }) {
  console.log("$$$$$$$$$$$$$mapStateToProps ", posts, "________-test__-----");
  return {
    posts,
    comments
  };
}


function mapDispatchToProps(dispatch) {
  return {
    loadPost: id => dispatch(loadPostRequest(id)),
    editPost: (hist, post) => dispatch(editPostRequest(hist, post)),    
    deletePost: (id) => dispatch(deletePostRequest(id)),    
    votePost: (id, mode) => dispatch(votePostRequest(id, mode)),
    loadComments: id => dispatch(loadCommentsRequest(id)),
    editComment: comment => dispatch(editCommentRequest(comment)),    
    deleteComment: (comment) => dispatch(deleteCommentRequest(comment)),    
    voteComment: (postId, categoryId, mode) => dispatch(voteCommentRequest(postId, categoryId, mode)),        
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetailsView));
