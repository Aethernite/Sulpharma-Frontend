import { createSlice } from '@reduxjs/toolkit';
import * as api from '../../api/AxiosQueries';

const initialState = {
    user: localStorage.getItem('user'),
    isLoading: false,
    error: null,
    isSessionChecked: false,
    success: false,
};

const { reducer: authReducer, actions } = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authStart: (state) => {
            state.isLoading = true;
        },
        authSuccess: (state) => {
            state.isLoading = false;
            state.user = localStorage.getItem('user');
            state.error = null;
        },
        authFailure: (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.error = action.payload;
        },
        registerStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        registerSuccess: (state, action) => {
            state.isLoading = false;
            state.error = null;
        },
        registerFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        clearErrors: (state) => {
            state.error = null;
            state.success = false;
        },
        logoutStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        logoutSuccess: (state, action) => {
            state.isLoading = false;
            localStorage.removeItem('user');
            state.user = localStorage.getItem('user');
            state.error = null;
        },
        logoutFailure: (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.error = action.payload;
        },
        creationSuccess: (state, action) => {
            state.success = true;
        },
        markSessionChecked: state => {
            state.isSessionChecked = true;
        }, 
        removeUser: state => {
            state.user = null;
        }
        
    },
});

//Actions

export const register = ({ email, password }) => {
    return async (dispatch, getState) => {
        const isLoading = getState().auth.isLoading;
        if (isLoading) {
            return
        }

        try {
            dispatch(actions.registerStart());
            const user = await api.register({ email, password });
            dispatch(actions.registerSuccess(user));
            dispatch(actions.creationSuccess());
        } catch (err) {
            dispatch(actions.registerFailure(err?.response?.status));
        }
    }

};

export const login = ({ email, password }) => {
    return async (dispatch, getState) => {
        const isLoading = getState().auth.isLoading;
        if (isLoading) {
            return
        }

        try {
            dispatch(actions.authStart());
            const {user, token, refreshToken} = await api.login({ email, password });
            localStorage.setItem('token', token);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('user', user);
            dispatch(actions.authSuccess());
        } catch (err) {
            dispatch(actions.authFailure(err?.response?.data?.message));
        }
    }

};

export const logout = () => {
    return async (dispatch, getState) => {
        const isLoading = getState().auth.isLoading;
        if (isLoading) {
            return
        }
        try {
            dispatch(actions.logoutStart());
            await api.logout();
            dispatch(actions.logoutSuccess());
        } catch (err) {
            dispatch(actions.logoutFailure(err?.response?.data?.message));
        }
    }

};

export const checkSession = () => {
    return async (dispatch) => {
        try {
            const user = await api.getMe();
            dispatch(actions.authSuccess(user));
        } catch (err) { 
            dispatch(actions.removeUser());
        }
        dispatch(actions.markSessionChecked())
    }
}

export const clearErrors = () => {
    return async (dispatch) => {
        dispatch(actions.clearErrors());
    }
}

export { authReducer };