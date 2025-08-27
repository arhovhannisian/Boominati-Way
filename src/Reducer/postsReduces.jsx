export const initialState={
    posts: [],
    loading: false,
    error: null,
}


export function postsReducer(state, action) {
    switch (action.type) {
        case "FETCH_POSTS_REQUEST":
            return {...state, loading: true, error: null}
        case "FETCH_POSTS_SUCCESS":
            return {...state, loading:false, posts: action.payload}
        case "FETCH_POSTS_FAILURE":
            return {...state, error: action.payload}
        case "ADD_POST":
            return {...state,posts: [...state.posts, action.payload]}
        case "DELETE_POST":
            return {...state,posts: state.posts.filter(post => post.id !== action.payload)}
        default:
            return state
    }
}