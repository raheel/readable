import React, { Component } from "react";
import { connect } from "react-redux";
import { loadPostRequest, loadCommentsRequest, deletePostRequest, votePostRequest } from "../actions";
import { PostDetails, Comment } from "./ReadableComponents";

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
          <PostDetails post={post} comments={comments} vote={this.props.votePost} delete={this.props.deletePost}/>
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
    votePost: (id, mode) => {
      let res = dispatch(votePostRequest(id, mode));
      console.log('-------res ', res);
    },
    deletePost: (id) => dispatch(deletePostRequest(id)),
    loadComments: id => dispatch(loadCommentsRequest(id)),    
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetailsView);
