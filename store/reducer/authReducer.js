import { createSlice } from "@reduxjs/toolkit";

// This file is used to manage the authentication state in the Redux store
// It includes actions for logging in and logging out users
const initialState = {
    auth:null
};

// The authReducer slice manages the authentication state
// It includes an initial state and two reducers: login and logout
export const authReducer = createSlice({
    name: "authStore",
    initialState,
    reducers: {
        login : (state, action) => {
            state.auth = action.payload;
        },
        logout: (state) => {
            state.auth = null;
        }

    }

});

// Export the actions for use in components
export const { login, logout } = authReducer.actions;
export default authReducer.reducer;