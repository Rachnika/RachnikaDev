import { combineReducers, configureStore } from '@reduxjs/toolkit';
import localStorage from 'redux-persist/es/storage'; // defaults to localStorage for web
import persistReducer  from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
import authReducer from './reducer/authReducer';

// This file is used to configure the Redux store
// It combines reducers and sets up persistence for the store

const rootReducer = combineReducers({
    authStore: authReducer

});


const persistConfig = {
    key:'root',
    storage: localStorage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: false,
        }),

    });

export const persistor = persistStore(store);