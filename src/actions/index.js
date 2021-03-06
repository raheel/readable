export const LOAD_CATEGORIES = "LOAD_CATEGORIES";

export const LOAD_POSTS = "LOAD_POSTS";
export const LOAD_POST = "LOAD_POST";
export const EDIT_POST = "EDIT_POST";
export const DELETE_POST = "DELETE_POST";
export const ADD_NEW_POST = "ADD_NEW_POST";
export const VOTE_POST = "VOTE_POST";
export const SORT_POSTS = "SORT_POSTS";

export const LOAD_COMMENTS = "LOAD_COMMENTS";
export const LOAD_COMMENT = "LOAD_COMMENT";
export const ADD_NEW_COMMENT = "ADD_NEW_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT ";
export const VOTE_COMMENT = "VOTE_COMMENT";

const BASE_URL = "http://localhost:5001/";

const GET_HEADER = {
  method: "GET",
  headers: {
    Authorization: "whatever-you-want"
  }
};

const POST_HEADER = {
  method: "POST",
  headers: {
    Authorization: "whatever-you-want",
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json"
  }
};

const PUT_HEADER = {
  method: "PUT",
  headers: {
    Authorization: "whatever-you-want",
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json"
  }
};

const DELETE_HEADER = {
  method: "DELETE",
  headers: {
    Authorization: "whatever-you-want"
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

export function loadCommentRequest(id) {
  let url = "comments/" + id;

  return (dispatch, getState) => {
    fetch(BASE_URL + url, GET_HEADER)
      .then(response => response.json())
      .then(comment => dispatch(loadComment(comment)));
  };
}

export function addPostRequest(history, post) {
  let { id, title, body, owner, category, timestamp } = post;
  let url = "posts";
  let postBody = {
    body: JSON.stringify({ id, title, body, owner, category, timestamp })
  };

  return (dispatch, getState) => {
    fetch(BASE_URL + url, Object.assign({}, postBody, POST_HEADER)).then(() => {
      dispatch(addPost(post));
      history.push("/" + category);
    });
  };
}

export function editPostRequest(history, post) {
  let url = "posts/" + post.id;

  let postBody = { body: JSON.stringify(post) };

  return (dispatch, getState) => {
    fetch(BASE_URL + url, Object.assign({}, postBody, PUT_HEADER)).then(() => {
      dispatch(editPost(post));
      history.goBack();
    });
  };
}

export function deletePostRequest(history, post) {
  let url = "posts/" + post.id;

  return (dispatch, getState) => {
    fetch(BASE_URL + url, DELETE_HEADER).then(() => {
      dispatch(deletePost(post.id));
      alert("Succesfully deleted post with title " + post.title);

      if (history) {
        let count = (history.location.pathname.match(/\//g) || []).length;

        if (count > 1) {
          history.push("/" + post.category);
        }
      }
    });
  };
}

export function votePostRequest(id, option) {
  let url = "posts/" + id;
  let postBody = { body: JSON.stringify({ option }) };

  return (dispatch, getState) => {
    fetch(BASE_URL + url, Object.assign({}, postBody, POST_HEADER)).then(
      dispatch(votePost({ id, option }))
    );
  };
}

export function addCommentRequest(history, comment) {
  let { id, author, body, parentId, timestamp, deleted} = comment;
  let url = "comments ";
  let postBody = {
    body: JSON.stringify({ id, author, body, parentId, deleted, timestamp })
  };

  return (dispatch, getState) => {
    fetch(BASE_URL + url, Object.assign({}, postBody, POST_HEADER)).then(() => {
      dispatch(addComment(comment));
      history.push("/comment/" + comment.parentId);
    });
  };
}

export function editCommentRequest(history, comment) {
  let url = "comments/" + comment.id;

  let postBody = { body: JSON.stringify(comment) };

  return (dispatch, getState) => {
    fetch(BASE_URL + url, Object.assign({}, postBody, PUT_HEADER)).then(() => {
      dispatch(editComment(comment));

      history.push("/post/" + comment.parentId);
    });
  };
}

export function deleteCommentRequest(comment) {
  let url = "comments/" + comment.id;

  return (dispatch, getState) => {
    fetch(BASE_URL + url, DELETE_HEADER).then(() => {
      dispatch(deleteComment(comment));
      alert(
        "Succesfully deleted comment starting with " +
          comment.body.substring(0, 10)
      );
    });
  };
}

export function voteCommentRequest(postId, commentId, option) {
  let url = "comments/" + commentId;
  let postBody = { body: JSON.stringify({ option }) };

  return (dispatch, getState) => {
    fetch(BASE_URL + url, Object.assign({}, postBody, POST_HEADER)).then(
      dispatch(voteComment({ postId, commentId, option }))
    );
  };
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
    type: SORT_POSTS,
    sortBy
  };
}

export function editPost(post) {
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

export function votePost({ id, option }) {
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

export function loadComment(comment) {
  return {
    type: LOAD_COMMENT,
    comment
  };
}

export function editComment(comment) {
  return {
    type: EDIT_COMMENT,
    comment
  };
}

export function deleteComment(comment) {
  return {
    type: DELETE_COMMENT,
    comment
  };
}

export function addComment(comment) {
  return {
    type: ADD_NEW_COMMENT,
    comment: comment
  };
}

export function voteComment({ postId, commentId, option }) {
  return {
    type: VOTE_COMMENT,
    postId,
    commentId,
    option
  };
}
