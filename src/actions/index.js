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


export function loadCategoriesRequest(){

}

export function loadCategories({categories}){
    return {
        type: LOAD_CATEGORIES,
        categories
    }
}

export function loadPostsRequest({category}){
    return (dispatch, getState) => {
        if (getState().categories!=null){
            dispatch(getState().categories);
        }
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
        id
    }
}

export function editComment({comment}){
    return {
        type: EDIT_COMMENT,
        comment
    }
}