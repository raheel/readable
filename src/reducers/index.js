import {
    LOAD_CATEGORIES,
    LOAD_POSTS,
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
    default :
      return state
  }
}

export default combineReducers({categories, posts});