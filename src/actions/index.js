export const LOAD_CATEGORIES = "LOAD_CATEGORIES";

export const LOAD_POSTS = "LOAD_POSTS";
export const LOAD_POST = "LOAD_POST";
export const SORT_POSTS_BY = "SORT_POSTS_BY";
export const EDIT_POST = "EDIT_POST";
export const DELETE_POST = "DELETE_POST";
export const ADD_NEW_POST = "ADD_NEW_POST";
export const VOTE_POST = "VOTE_POST";

export const LOAD_COMMENTS = "LOAD_COMMENTS";
export const SORT_COMMENTS_BY = "SORT_COMMENTS_BY";
export const ADD_NEW_COMMENT = "ADD_NEW_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT ";

const BASE_URL = "http://localhost:5001/";

const GET_HEADER = {
  method: "GET",
  headers: {
    'Authorization': 'whatever-you-want'
  }
};

const POST_HEADER = {
  method: "POST",
  headers: {
    'Authorization': 'whatever-you-want',
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
  }
};

const PUT_HEADER = {
  method: "PUT",
  headers: {
    'Authorization': 'whatever-you-want',
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'    
  }
};

const DELETE_HEADER = {
  method: "DELETE",
  headers: {
    'Authorization': 'whatever-you-want'
  }
};
//Network Requests
export function loadCategoriesRequest() {
  return (dispatch, getState) => {
    if (getState().categories != null) {
      fetch(BASE_URL + "categories", GET_HEADER)
        .then(response => response.json())
        .then(data => dispatch(loadCategories(data.categories)));
    }
  };
}

export function loadPostsRequest(category) {
  let url = "posts";

  if ("all" !== category) {
    url = category + "/posts";
  }

  return (dispatch, getState) => {
    fetch(BASE_URL + url, GET_HEADER)
      .then(response => response.json())
      .then(posts => dispatch(loadPosts(category, posts)));
  };
}

export function loadPostRequest(id) {
  let url = "posts/" + id;

  return (dispatch, getState) => {
    fetch(BASE_URL + url, GET_HEADER)
      .then(response => response.json())
      .then(post => dispatch(loadPost(post)));
  };
}

export function loadCommentsRequest(id) {
  let url = "posts/" + id + "/comments";

  return (dispatch, getState) => {
    fetch(BASE_URL + url, GET_HEADER)
      .then(response => response.json())
      .then(comments => dispatch(loadComments({ id, comments })));
  };
}

export function addPostRequest(post) {
    console.log('addPostRequest', post);
  let {id, title, body, owner, category, timestamp} = post;
  let url = 'posts';
  let postBody = {body: JSON.stringify({ id, title, body, owner, category, timestamp })};
  console.log('postBody: ', postBody);
  return (dispatch, getState) => {
    fetch(BASE_URL + url, Object.assign({}, postBody, POST_HEADER))
      .then(dispatch(addPost(post)));
  };
}

export function editPostRequest(post) {
  let url = "posts/" + post.id ;
  let postBody = {body: post};

  return (dispatch, getState) => {
    fetch(BASE_URL + url, Object.assign({}, postBody, PUT_HEADER))
      .then(dispatch(editPost(post.id)));
  };
}

export function deletePostRequest(id) {
  let url = "posts/" + id ;

  return (dispatch, getState) => {
    fetch(BASE_URL + url, DELETE_HEADER)
      .then(dispatch(deletePost(id)));
  };
}

export function votePostRequest(id, option) {
  let url = "posts/" + id ;
  let postBody = {body: JSON.stringify({option})};

  return (dispatch, getState) => {
    fetch(BASE_URL + url, Object.assign({}, postBody, POST_HEADER))
      .then(dispatch(votePost({id, option})));
  };
}


export function addCommentRequest({ comment }) {
  return (dispatch, getState) => {
    dispatch(addComment(comment));
  };
}

export function editCommentRequest({ comment }) {
  return (dispatch, getState) => {
    dispatch(addComment(comment));
  };
}

export function deleteCommentRequest({ id }) {
  return (dispatch, getState) => {};
}

export function loadCategories(categories) {
  return {
    type: LOAD_CATEGORIES,
    categories
  };
}

export function loadPosts(category, posts) {
  return {
    type: LOAD_POSTS,
    category: category,
    posts: posts
  };
}

export function loadPost(post) {
  return {
    type: LOAD_POST,
    post: post
  };
}

export function sortPosts({ sortBy }) {
  return {
    type: SORT_POSTS_BY,
    sortBy
  };
}

export function editPost({ post }) {
  return {
    type: EDIT_POST,
    post
  };
}

export function deletePost(id) {
  return {
    type: DELETE_POST,
    id
  };
}

export function addPost(post) {
  return {
    type: ADD_NEW_POST,
    post
  };
}

export function votePost({id, option}) {
    console.log('___________________________-votePost', id, option)
  return {
    type: VOTE_POST,
    id,
    option
  };
}


export function loadComments({ id, comments }) {
  return {
    type: LOAD_COMMENTS,
    id,
    comments
  };
}

export function sortComments({ sortBy }) {
  return {
    type: SORT_COMMENTS_BY,
    sortBy
  };
}

export function editComment({ comment }) {
  return {
    type: EDIT_COMMENT,
    comment
  };
}

export function deleteComment({ id }) {
  return {
    type: DELETE_COMMENT,
    id
  };
}

export function addComment({ comment }) {
  return {
    type: ADD_NEW_COMMENT,
    id: comment.id
  };
}
