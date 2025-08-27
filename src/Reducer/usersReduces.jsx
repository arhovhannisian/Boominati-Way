// usersReducer.js
export const initialState = {
    users: [],
    loading: false,
    error: null,
};

export function usersReducer(state, action) {
    switch (action.type) {
        case "FETCH_USERS_REQUEST":
            return { ...state, loading: true, error: null };
        case "FETCH_USERS_SUCCESS":
            return { ...state, loading: false, users: action.payload };
        case "FETCH_USERS_FAILURE":
            return { ...state, loading: false, error: action.payload };
        case "UPDATE_USER":
            return {
                ...state,
                users: state.users.map((u) =>
                    u.id === action.payload.id ? action.payload : u
                ),
            };
        case "DELETE_USER":
            return {
                ...state,
                users: state.users.filter((u) => u.id !== action.payload),
            };
        case "BLOCK_USER":
            return {
                ...state,
                users: state.users.map((u) =>
                    u.id === action.payload ? { ...u, blocked: true } : u
                ),
            };
            case "UNBLOCK_USER":
            return {
                ...state,
                users: state.users.map((u) =>
                    u.id === action.payload ? { ...u, blocked: false } : u
                ),
            };
        default:
            return state;
    }
}
