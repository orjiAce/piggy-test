
import {configureStore} from "@reduxjs/toolkit";

import dataReducer from "./slices/dataSlice";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import {combineReducers} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

//the configuration object that we want redux persist to use

const rootReducer = combineReducers({
    appdata: dataReducer
});


const persistConfig = {
    key: 'piggy-test',
    version: 1,
    storage:AsyncStorage,
    whitelist: ['appdata']
}


const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store)


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch


