import {
    LOAD_CATEGORIES,
    LOAD_POSTS,
    LOAD_POST,
    ADD_NEW_POST,
    EDIT_POST,
    LOAD_COMMENTS
} from '../actions'
import { combineReducers } from 'redux'

function categories (state = {}, action) {
  console.log('_-----_ action', action);
  switch (action.type) {
    case LOAD_CATEGORIES :
      return {
        ...state,
        ['categories']: action.categories
      }
    default :
      return state
  }
}

function posts (state = {}, action) {
  console.log('_-----_ action', action);
  switch (action.type) {
    case LOAD_POSTS :
      return {
        ...state,
        [action.category]: action.posts
      }
    case LOAD_POST :
      return {
        ...state,
        ['currentPost']: action.post
      }  
    case EDIT_POST :
      //remove existing posts
      //refresh data
      return {
        ['currentPost']: action.post
      }    
    case ADD_NEW_POST :
      //remove existing posts
      //refresh data
      return {
        ...state,
        ['currentPost']: action.post
      }               
    default :
      return state
  }
}

function comments (state = {}, action) {
  console.log('_-----_ action', action);
  switch (action.type) {
    case LOAD_COMMENTS :
      return {
        ...state,
        [action.id]: action.comments
      }    
    default :
      return state
  }
}

export default combineReducers({categories, posts, comments});