export const LOAD_CATEGORIES = 'LOAD_CATEGORIES'

export const LOAD_POSTS = 'LOAD_POSTS'
export const SORT_POSTS_BY = 'SORT_POSTS_BY'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'
export const ADD_NEW_POST = 'ADD_NEW_POST'

export const LOAD_COMMENTS = 'LOAD_COMMENTS'
export const SORT_COMMENTS_BY = 'SORT_COMMENTS_BY'
export const ADD_NEW_COMMENT= 'ADD_NEW_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT '

const BASE_URL = "http://localhost:5001/"

//Network Requests
export function loadCategoriesRequest(){
    return (dispatch, getState) => {
        if (getState().categories!=null){
            let categories = [];    
            console.log(BASE_URL+'categories');
            fetch(BASE_URL+'categories', 
            { 
                headers: { 
                    'Authorization': 'whatever-you-want' 
                }})        
            .then(categories => dispatch(loadCategories(categories)));
        }
    }
}

export function loadPostsRequest({category}){
    return (dispatch, getState) => {
        if (getState().posts[category]!=null){
            let posts = [];
            dispatch(loadPosts(posts));
        }
    }
}

export function addPostRequest({post}){
    return (dispatch, getState) => {
            dispatch(addPost(post));
    }
}

export function editPostRequest({post}){
    return (dispatch, getState) => {
            dispatch(editPost(post));
    }
}

export function deletePostRequest({id}){
    return (dispatch, getState) => {
            dispatch(deletePost(id));
    }
}

export function loadCommentsRequest({post}){
    return (dispatch, getState) => {
        if (getState().comments[post]!=null){
            let comments = [];
            dispatch(loadComments(comments));
        }
    }
}

export function addCommentRequest({comment}){
    return (dispatch, getState) => {
            dispatch(addComment(comment));
    }
}

export function editCommentRequest({comment}){
    return (dispatch, getState) => {
            dispatch(addComment(comment));
    }
}

export function deleteCommentRequest({id}){
    return (dispatch, getState) => {
        
    }
}

export function loadCategories({categories}){
    return {
        type: LOAD_CATEGORIES,
        categories
    }
}

export function loadPosts({posts}){
    return {
        type: LOAD_POSTS,
        posts
    }
}

export function sortPosts({sortBy}){
    return {
        type: SORT_POSTS_BY,
        sortBy
    }
}

export function editPost({post}){
    return {
        type: EDIT_POST,
        post
    }
}

export function deletePost({id}){
    return {
        type: DELETE_POST,
        id
    }
}

export function addPost({post}){
    return {
        type: ADD_NEW_POST,
        id: post.id
    }
}

export function loadComments({comments}){
    return {
        type: LOAD_COMMENTS,
        comments
    }
}

export function sortComments({sortBy}){
    return {
        type: SORT_COMMENTS_BY,
        sortBy
    }
}

export function editComment({comment}){
    return {
        type: EDIT_COMMENT,
        comment
    }
}

export function deleteComment({id}){
    return {
        type: DELETE_COMMENT,
        id
    }
}

export function addComment({comment}){
    return {
        type: ADD_NEW_COMMENT,
        id: comment.id
    }
}

