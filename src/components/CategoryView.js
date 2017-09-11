import React, { Component } from "react";
import { loadPostsRequest } from "../actions";


export default class CategoryView extends Component {
  constructor(props){
    console.log("-----------constructor ", props);
    super(props)
  }

  componentDidMount() {
    console.log("-----------componentDidMount 1 ", this.props);
   // this.props.loadPosts(this.props.category);
  }

  render(){
        const posts = null; // this.props.posts ? this.props.posts[this.props.params.name] : null;
    console.log("-----------componentDidMount 2 ", this.props);

  return (
    <div>
        {posts != null && posts instanceof Array
          ?
          <div>
              <b>Posts</b>
               <ul>
              {posts.map(post =>
                <li key={post.id}>
                  <b>{post.title}</b><br/>
                  {post.body}
                  <br/><br/>
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

//export default connect(mapStateToProps, mapDispatchToProps)(CategoryView);