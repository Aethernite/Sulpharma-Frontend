import { createSlice } from "@reduxjs/toolkit";
import * as api from "../../api/AxiosQueries";

const initialState = {
    promotions: [],
    isLoading: false,
    error: null,
    isCreating: false,
    creationError: null,
    cursor: 0,
    isMutating: false,
};

const { reducer: promotionsReducer, actions } = createSlice({
    name: 'promotions',
    initialState,
    reducers: {
        clearPromotions: (state) => {
            state = initialState;
        },
        fetchPromotionsStart: (state) => {
            state.isLoading = true;
        },
        fetchPromotionsSuccess: (state, action) => {
            state.isLoading = false;
            state.promotions.push(...action.payload.results.filter((x) => !state.promotions.some((promotion) => promotion.id === x.id)));
            state.error = null;
            state.cursor = action.payload.cursor;
        },
        fetchPromotionsFailure: (state, action) => {
            state.isLoading = false;
            state.promotions = [];
            state.error = action.payload;
        }
    }
});


export const fetchPromotions = () => {
    return async (dispatch, getState) => {
        const { cursor } = getState().promotions;
        try {
            dispatch(actions.fetchPromotionsStart());
            const {content} = await api.getPromotions({ cursor });
            dispatch(actions.fetchPromotionsSuccess({ results: content, cursor: 0 }));
        } catch (err) {
            dispatch(actions.fetchPromotionsFailure(err?.response?.data?.message));
        }
    }
}



export { promotionsReducer };