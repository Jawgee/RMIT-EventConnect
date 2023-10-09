import { configureStore } from '@reduxjs/toolkit';
import profileReducer from './data/profileReducer';
import eventReducer from './data/eventReducer';

const store = configureStore({
    reducer: {
        profile: profileReducer,
        event: eventReducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
