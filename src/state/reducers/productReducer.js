import { createSlice } from "@reduxjs/toolkit";
import * as api from "../../api/AxiosQueries";

const initialState = {
    products: [],
    pageable: null,
    isLoading: false,
    error: null,
    isCreating: false,
    creationError: null,
    isMutating: false
};

const { reducer: productsReducer, actions } = createSlice({
    name: 'products',
    initialState,
    reducers: {
        clearProducts: (state) => {
            state = initialState;
        },
        fetchProductsStart: (state) => {
            state.isLoading = true;
        },
        fetchProductsSuccess: (state, action) => {
            state.isLoading = false;
            state.products = action.payload.products.content;
            state.pageable = action.payload.products;
            state.error = null;
        },
        fetchProductsFailure: (state, action) => {
            state.isLoading = false;
            state.products = [];
            state.error = action.payload;
        }
        // createPostStart: (state) => {
        //     state.isCreating = true;
        // },
        // createPostSuccess: (state, action) => {
        //     state.isCreating = false;
        //     state.products.unshift(action.payload);
        //     state.creationError = null;
        //     state.media = null;
        // },
        // createPostFailure: (state, action) => {
        //     state.isCreating = false;
        //     state.creationError = action.payload;
        // },
        // postLikeStart: (state) => {
        //     state.isLoading = true;
        //     state.error = null;
        // },
        // postLikeSuccess: (state, action) => {
        //     state.products.forEach(post => {
        //         if (post.id === action.payload) {
        //             if (post.disliked) {
        //                 post.dislikesCount--;
        //                 post.disliked = false;
        //             }

        //             if (post.liked) {
        //                 post.likesCount--;
        //                 post.liked = false;
        //             }
        //             else {
        //                 post.likesCount++;
        //                 post.liked = true;
        //             }
        //         }
        //     })
        //     state.isLoading = false;
        // },
        // postLikeFailure: (state, action) => {
        //     state.isLoading = false;
        //     state.error = action.payload;
        // },
        // postDislikeStart: (state) => {
        //     state.isLoading = true;
        //     state.error = null;
        // },
        // postDislikeSuccess: (state, action) => {
        //     state.products.forEach(post => {
        //         if (post.id === action.payload) {
        //             if (post.liked) {
        //                 post.likesCount--;
        //                 post.liked = false;
        //             }

        //             if (post.disliked) {
        //                 post.dislikesCount--;
        //                 post.disliked = false;
        //             }
        //             else {
        //                 post.dislikesCount++;
        //                 post.disliked = true;
        //             }
        //         }
        //     })
        //     state.isLoading = false;
        // },
        // postDislikeFailure: (state, action) => {
        //     state.isLoading = false;
        //     state.error = action.payload;
        // },
        // deletePostStart: (state) => {
        //     state.isMutating = true;
        // },
        // deletePostSuccess: (state, action) => {
        //     state.isMutating = false;
        //     state.products = state.products.filter((post) => post.id !== action.payload);
        //     state.mutationError = null;
        // },
        // deletePostFailure: (state, action) => {
        //     state.isMutating = false;
        //     state.mutationError = action.payload;
        // },

    }
});


export const fetchProducts = ({cursor, category, subcategory, query, sort, order}) => {
    return async (dispatch) => {
        try {
            dispatch(actions.fetchProductsStart());
            const products = await api.getProducts({cursor, category, subcategory, query, sort, order});
            dispatch(actions.fetchProductsSuccess({products}));
        } catch (err) {
            dispatch(actions.fetchProductsFailure(err?.response?.data?.message));
        }
    }
}


// export const createPost = ({ title, content, mediaId }) => {
//     return async (dispatch) => {
//         console.log(content);
//         try {
//             dispatch(actions.createPostStart());
//             const post = await api.createPost({ title, content, mediaId });
//             dispatch(actions.createPostSuccess(post));
//         } catch (err) {
//             dispatch(actions.createPostFailure(err?.response?.data?.message));
//         }
//     }
// }

// export const likePost = (id) => {
//     return async (dispatch) => {
//         try {
//             dispatch(actions.postLikeStart());
//             await api.likePost(id);
//             dispatch(actions.postLikeSuccess(id));
//         } catch (err) {
//             dispatch(actions.postLikeFailure(err?.response?.data?.message));
//         }
//     }
// }

// export const dislikePost = (id) => {
//     return async (dispatch) => {
//         try {
//             dispatch(actions.postDislikeStart());
//             await api.dislikePost(id);
//             dispatch(actions.postDislikeSuccess(id));
//         } catch (err) {
//             dispatch(actions.postDislikeFailure(err?.response?.data?.message));
//         }
//     }
// }

// export const deletePost = (id) => {
//     return async (dispatch) => {
//         try {
//             dispatch(actions.deletePostStart());
//             await api.deletePost(id);
//             dispatch(actions.deletePostSuccess(id));
//         } catch (err) {
//             dispatch(actions.deletePostFailure(err?.response?.data?.message));
//         }
//     }
// };



export const clearProducts = () => {
    return async (dispatch) => {
        dispatch(actions.clearProducts());
    }
}


export { productsReducer };