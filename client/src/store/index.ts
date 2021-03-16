import { configureStore, ThunkAction, Action, getDefaultMiddleware } from '@reduxjs/toolkit';

import { combineReducers } from "redux";
import GetUrlReducer from '../modules/get_url/GetUrlReducer';
import PostUrlReducer from '../modules/post_url/PostUrlReducer';

const reducers = combineReducers({
    post_url: PostUrlReducer,
    get_url: GetUrlReducer,
});


export const store = configureStore({
    reducer: reducers,
    middleware: getDefaultMiddleware({
        serializableCheck: false,
    }),
});


export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
