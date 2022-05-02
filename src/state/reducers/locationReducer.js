import { createSlice } from "@reduxjs/toolkit";
import * as api from "../../api/AxiosQueries";

const initialState = {
    locations: [],
    isLoading: false,
    error: null,
};

const { reducer: locationsReducer, actions } = createSlice({
    name: 'locations',
    initialState,
    reducers: {
        clearLocations: (state) => {
            state = initialState;
        },
        fetchLocationsStart: (state) => {
            state.isLoading = true;
        },
        fetchLocationsSuccess: (state, action) => {
            state.isLoading = false;
            state.locations = action.payload.locations;
            state.error = null;
        },
        fetchLocationsFailure: (state, action) => {
            state.isLoading = false;
            state.locations = [];
            state.error = action.payload;
        }
    }
});


export const fetchlocations = () => {
    return async (dispatch) => {
        try {
            dispatch(actions.fetchLocationsStart());
            const locations = await api.getLocations();
            dispatch(actions.fetchLocationsSuccess({locations}));
        } catch (err) {
            dispatch(actions.fetchLocationsFailure(err?.response?.data?.message));
        }
    }
}

export const clearLocations = () => {
    return async (dispatch) => {
        dispatch(actions.clearLocations());
    }
}


export { locationsReducer };