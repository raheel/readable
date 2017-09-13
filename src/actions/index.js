export const LOAD_CATEGORIES = 'LOAD_CATEGORIES'

export const LOAD_POSTS = 'LOAD_POSTS'
export const LOAD_POST = 'LOAD_POST'
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

const HEADER =  {
                    headers: { 
                        'Authorization': 'whatever-you-want' 
                    }
                };

//Network Requests
export function loadCategoriesRequest(){
    return (dispatch, getState) => {
        if (getState().categories!=null){
            fetch(BASE_URL+'categories', 
                
                    HEADER
                
            )
            .then((response) => response.json())        
            .then(data => dispatch(loadCategories(data.categories)));
        }
    }
}

export function loadPostsRequest(category){
    let url = 'posts'; 
    
    if ('all'!==category){
        url = category + '/posts';
    }

    console.log('loadPostsRequest---url', url);
    return (dispatch, getState) => {
            fetch(BASE_URL+url, 
                 
                    HEADER
            
            )
            .then((response) => response.json())        
            .then(posts => dispatch(loadPosts(category, posts)));
    }
}

export function loadPostRequest(id){
    let url = 'posts/'+ id; 
    

    console.log('loadPostsRequest---url', url);
    return (dispatch, getState) => {
            fetch(BASE_URL+url, 
                 
                    HEADER
            
            )
            .then((response) => response.json())        
            .then(post => dispatch(loadPost(post)));
    }
}

export function loadCommentsRequest(id){
    let url = 'posts/'+ id + '/comments'; 
    

    console.log('loadCommentstRequest---url', url);
    return (dispatch, getState) => {
            fetch(BASE_URL+url, 
                 
                    HEADER
            
            )
            .then((response) => response.json())        
            .then(comments => dispatch(loadComments({id, comments})));
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

export function loadCategories(categories){
    console.log('---categories, ', categories)
    return {
        type: LOAD_CATEGORIES,
        categories
    }
}

export function loadPosts(category, posts){
    console.log('loadPosts action ', category, posts);
    return {
        type: LOAD_POSTS,
        category: category,
        posts: posts
    }
}

export function loadPost(post){
    console.log('loadPost action ', post);
    return {
        type: LOAD_POST,
        post: post
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

export function loadComments({id, comments}){
    return {
        type: LOAD_COMMENTS,
        id,
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

