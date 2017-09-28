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
    case LOAD_POSTS: {
      let newState = Object.assign({}, state);
      action.posts.map(post => {
        newState[post.id] = post;
      });

      return newState;
    }
    case LOAD_POST: {
      let newState = Object.assign({}, state);

      newState[action.post.id] = action.post;

      return newState;
    }
    case EDIT_POST:
      let newState = Object.assign({}, state);

      newState[action.post.id] = Object.assign(
        newState[action.post.id],
        action.post
      );

      return newState;
    case ADD_NEW_POST: {
      let newState = Object.assign({}, state);

      newState[action.post.id] = action.post;

      return newState;
    }
    case DELETE_POST: {
      let newState = Object.assign({}, state);
      

      if (Object.keys(state).length !== 0) {
        Object.keys(newState).forEach((id, index) => {
          if (id == action.id) {
            newState[id].deleted = true;
          }
        });
      }

      console.log('DELETE_POST newState: ', newState);
      return newState;
    }
    case VOTE_POST: {
      let newState = Object.assign({}, state);

      if (Object.keys(newState).length != 0) {
        newState = Object.keys(newState).map(id => {
          let post = newState[id];
          if (post.id == action.id) {
            action.option == "upVote"
              ? (post.voteScore = post.voteScore + 1)
              : (post.voteScore = post.voteScore - 1);
          }
          return post;
        });
      }

      return newState;
    }
    default:
      return state;
  }
}

function comments(state = {}, action) {
  switch (action.type) {
    case LOAD_COMMENTS:
      let comments = action.comments;

      return {
        ...state,
        [action.id]: comments
      };
    case LOAD_COMMENT:
      let postId = action.comment.parentId;
      let st = Object.assign({}, state);
      let found = false;
      if (!(postId in st)) {
        st[postId] = [action.comment];

        return st;
      }

      st[postId] = st[postId].map(comment => {
        comment = Object.assign({}, comment, action.comment);
        found = true;

        return comment;
      });

      if (!found) {
        st[postId].push(action.comment);
      }
      return st;
    case EDIT_COMMENT: {
      let newState = Object.assign({}, state);
      if (action.comment.parentId in newState) {
        newState[action.comment.parentId] = newState[
          action.comment.parentId
        ].map(comment => {
          if (comment.id == action.comment.id) {
            comment = Object.assign(comment, action.comment);
          }
          return comment;
        });
      } else {
        newState[action.comment.parentId] = [action.comment];
      }

      return newState;
    }
    case ADD_NEW_COMMENT: {
      let newState = Object.assign({}, state);
      if (action.comment.parentId in newState) {
        newState[action.comment.parentId].push(action.comment);
      } else {
        newState[action.comment.parentId] = [action.comment];
      }

      return newState;
    }
    case DELETE_COMMENT: {
      let newState = Object.assign({}, state);
      if (action.comment.parentId in newState) {
        newState[action.comment.parentId] = newState[
          action.comment.parentId
        ].map(comment => {
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
      if (newState != null) {
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
        (comment1, comment2) => comment2.voteScore - comment2.voteScore
      );

      return newState;
    }
    default:
      return state;
  }
}

export default combineReducers({ categories, posts, comments });
