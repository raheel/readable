import {
  LOAD_CATEGORIES,
  LOAD_POSTS,
  LOAD_POST,
  ADD_NEW_POST,
  EDIT_POST,
  DELETE_POST,
  VOTE_POST,
  SORT_POSTS,
  LOAD_COMMENTS,
  LOAD_COMMENT,
  ADD_NEW_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  VOTE_COMMENT
} from "../actions";
import { combineReducers } from "redux";

function categories(state = {}, action) {
  switch (action.type) {
    case LOAD_CATEGORIES:
      return {
        ...state,
        ["categories"]: action.categories
      };
    default:
      return state;
  }
}

function posts(state = {}, action) {
  switch (action.type) {
    case LOAD_POSTS:
      return action.posts;
    case LOAD_POST:
      let found = false;
      if (!Array.isArray(state)) {
        return [action.post];
      }

      for (let post of state) {
        if (post.id === action.post.id) {
          found = true;
        }
      }
      if (!found) {
        state.push(action.post);
      }
      return state;
    case EDIT_POST:
      let newState = state;
           console.log("************EDIT_POST 1", newState, 'isarray', Array.isArray(newState));

      if (Array.isArray(newState)) {
        newState = newState.map(post => {
          console.log("************EDIT_POST post ids, ", post.id, action.post.id);
          if (post.id == action.post.id) {
              post = Object.assign({},action.post,post);
          }
          return post;
        });
      } else {
        newState = [action.post];
      }
      console.log('newState', newState);
      return newState;
    case ADD_NEW_POST:
      if (Array.isArray(state)) {
        state.push(action.post);
      }
      return state;
    case DELETE_POST:
      if (Array.isArray(state)) {
        state = state.map(post => {
          if (post.id == action.id) {
            post.deleted = "true";
          }
          return post;
        });
      }
      return state;
    case VOTE_POST:
      if (Array.isArray(state)) {
        state = state.map(post => {
          console.log("VOTE_POST post, ", post);
          if (post.id == action.id) {
            action.option == "upVote"
              ? (post.voteScore = post.voteScore + 1)
              : (post.voteScore = post.voteScore - 1);
          }
          return post;
        });
      }
      return state;
    case SORT_POSTS:
      if (Array.isArray(state)) {
        state.sort((post1, post2) => {
          if (action.sortBy === "voteScore") {
            return post1.voteScore - post2.score;
          } else if (action.sortBy === "timestamp") {
            return post1.timestamp.localeCompare(post2.timestamp);
          }
        });
      }
      return state;
    default:
      return state;
  }
}

function comments(state = {}, action) {
  switch (action.type) {
    case LOAD_COMMENTS:
      let comments = action.comments;

      comments.sort((comment1, comment2) => (
        comment2.voteScore - comment1.voteScore
      ));

      console.log('comments', comments);
      return {
        ...state,
        [action.id]: comments
      };
    case LOAD_COMMENT:
     console.log('^^^^^^^^^^LOAD_COMMENT');
      let postId = action.comment.parentId;
      let st = Object.assign({}, state);
      let found = false;
      if (!(postId in st)) {
        st[postId] = [action.comment];
                        console.log('^^^^^^^^^^st[postId] ', st, postId);

        return st;
      }

                console.log('^^^^^^^^^^st[postId] ', st, postId);


      st[postId] = st[postId].map(comment =>{
          comment = Object.assign({}, comment, action.comment);
          found = true;
          console.log('^^^^^^^^^^reducer comment', comment);
          return comment;
      })

          console.log('^^^^^^^^^^reducer st', st);


      if (!found) {
        st[postId].push(action.comment);
      }      
      return st;
    case EDIT_COMMENT:{
      console.log('----action.comment ', action.comment);
      let newState = Object.assign({}, state);
      if (action.comment.parentId in newState) {
        newState[action.comment.parentId] = newState[action.comment.parentId].map(comment =>{
          if (comment.id==action.comment.id){
            comment = Object.assign(comment, action.comment);
          }
          return comment;
        });
      } else {
        newState[action.comment.parentId] = [action.comment];
      }
   
      return newState;
       }
    case ADD_NEW_COMMENT:{
      let newState = Object.assign({}, state);
      if (action.comment.parentId in newState) {
        newState[action.comment.parentId].push(action.comment);
      } else {
        newState[action.comment.parentId] = [action.comment];
      }
   
      return newState; 
    }
    case DELETE_COMMENT:{
      let newState = Object.assign({}, state);
      if (action.comment.parentId in newState) {
        newState = newState[action.comment.parentId].map(comment => {
          if (comment.id == action.comment.id) {
            comment.deleted = "true";
          }
          return comment;
        });
      }
      return newState;
    }
    case VOTE_COMMENT: {
      let newState = Object.assign({}, state);
      if (state != null) {
        newState[action.postId] = newState[action.postId].map(comment => {
          if (comment.id == action.commentId) {
            action.option == "upVote"
              ? (comment.voteScore = comment.voteScore + 1)
              : (comment.voteScore = comment.voteScore - 1);
          }
          return comment;
        });
      }

      newState[action.postId].sort(
        (comment1, comment2) => (
          comment2.voteScore - comment2.voteScore
        )
      );

      console.log('comments', newState[action.postId]);

      return newState;
  }
    default:
      return state;
  }
}

export default combineReducers({ categories, posts, comments });
