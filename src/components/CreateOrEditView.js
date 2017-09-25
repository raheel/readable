import React, { Component } from "react";
import { connect } from "react-redux";
import {
  loadPostRequest,
  editPostRequest,
  addPostRequest,
    loadCommentsRequest,
  loadCommentRequest,
  addCommentRequest,
  editCommentRequest
} from "../actions";
import { EditPost, CreatePost, CreateComment, EditComment } from "./ReadableComponents";
import { withRouter } from "react-router-dom";

class CreateOrEditView extends Component {
  componentDidMount() {
    const isPost = "post" === this.props.match.params.type;
    const id = this.props.match.params.id;
    const isCreate = "create" === this.props.mode;
    const addPost = this.props.addPost;

    if (!isCreate) {
      if (isPost) {
        this.props.loadPost(id);
      } else {
        this.props.loadComment(id);
      }
    }
  }

  render() {
    // const category = this.props.match.params.name;
    // const posts = this.props.posts ? this.props.posts[category] : null;

    console.log("props createoreditview hist", this.props.history);

    const isPost = "post" === this.props.match.params.type;
    const id = this.props.match.params.id ? this.props.match.params.id : '';
    const isCreate = "create" === this.props.mode;
    const addPost = this.props.addPost;
    const editPost = this.props.editPost;
    console.log('this.props.posts:', this.props.posts);
    const post = this.props.posts!=null && Array.isArray(this.props.posts) ? this.props.posts[id] : null; 
    let comment = null;

        console.log('**************-----comments----> asdfafsd asfd ', this.props.comments);

    if (this.props.comments!=null){
      for (let postId in this.props.comments){
        console.log('___key', postId, this.props.comments);

      }
    }

    console.log('Object.keys(this.props.comments)', Object.keys(this.props.comments));


Object.keys(this.props.comments).map(postId =>  
{
  this.props.comments[postId].map(c =>
    {
      if (c.id==id){
          comment = c;
      }
    }
  )
}
);


    console.log('_______________________comment', comment);

    console.log("create and post", isCreate, isPost, this.props.posts, post, addPost);
    if (isCreate) {
      if (isPost) {
        return (
          <div>
            Create Post
            <CreatePost hist={this.props.history} category={id} addPost={addPost} />
          </div>
        );
      } else {
        console.log('***in create comment');
                return (

                  <div>
            Create Comment
            <CreateComment hist={this.props.history} postId={id} addComment={this.props.addComment}/>
          </div>
                );
      }
    } else {
      if (isPost) {
                console.log('***in edit post', post);
if (post==null){
  return null;
}
        return (
          <div>
            Edit Post
            <EditPost hist={this.props.history} post={post} editPost={editPost} />
          </div>
        );
      } else {
        console.log('***in edit comment', comment);
                return (

                  <div>
            Edit Comment
            <EditComment hist={this.props.history} comment={comment} editComment={this.props.editComment}/>
          </div>
                );
      }
    }

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
    loadPost: id => dispatch(loadPostRequest(id)),
    editPost: (hist, post) => dispatch(editPostRequest(hist, post)),
    addPost: (hist, post) => dispatch(addPostRequest(hist, post)),
        loadComments: id => dispatch(loadCommentsRequest(id)),
        loadComment: id => dispatch(loadCommentRequest(id)),

    editComment: (hist, comment)  => dispatch(editCommentRequest(hist, comment)) ,
    addComment: (hist, comment) => dispatch(addCommentRequest(hist, comment))
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateOrEditView));
