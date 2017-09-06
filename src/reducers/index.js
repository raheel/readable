import {
    LOAD_CATEGORIES,
} from '../actions'
import { combineReducers } from 'redux'

function categories (state = {}, action) {
  switch (action.type) {
    case LOAD_CATEGORIES :
      return {
        ...state,
        categories
      }
    default :
      return state
  }
}

export default combineReducers({categories});