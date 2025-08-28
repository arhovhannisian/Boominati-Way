// Reducer/imagesReducer.jsx
export const initialImageState = {
    images: [],
    loading: false,
    error: null,
};

export const imagesReducer = (state, action) => {
    switch (action.type) {
        case "FETCH_IMAGES_REQUEST":
            return { ...state, loading: true, error: null };
        case "FETCH_IMAGES_SUCCESS":
            return { ...state, loading: false, images: action.payload };
        case "FETCH_IMAGES_FAILURE":
            return { ...state, loading: false, error: action.payload };

        case "DELETE_IMAGE":
            return {
                ...state,
                images: state.images.filter((img) => img.id !== action.payload),
            };

        case "UPDATE_IMAGE":
            return {
                ...state,
                images: state.images.map((img) =>
                    img.id === action.payload.id ? action.payload : img
                ),
            };

        default:
            return state;
    }
};
