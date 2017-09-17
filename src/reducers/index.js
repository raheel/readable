import {
  LOAD_CATEGORIES,
  LOAD_POSTS,
  LOAD_POST,
  ADD_NEW_POST,
  EDIT_POST,
  DELETE_POST,
  VOTE_POST,
  LOAD_COMMENTS
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
      //remove existing posts
      //refresh data
      return {
        ["currentPost"]: action.post
      };
    case ADD_NEW_POST:
      if (Array.isArray(state)) {
        state.push(action.post);
        return state;
      }
      return action.post;
    case DELETE_POST:
      if (Array.isArray(state)) {
        state = state.map(post => 
        {
          if (post.id==action.id){
            post.deleted='true';
          }
          return post; 
        }
        );
      }
      return state;
    case VOTE_POST:
      if (Array.isArray(state)) {
        state = state.map(post => 
        {
          console.log('VOTE_POST post, ', post);
          if (post.id==action.id){
            action.option=="upVote" ? post.voteScore = post.voteScore+1 : post.voteScore = post.voteScore-1;
          }
          return post; 
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
      return {
        ...state,
        [action.id]: action.comments
      };
    default:
      return state;
  }
}

export default combineReducers({ categories, posts, comments });
