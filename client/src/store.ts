import { configureStore } from '@reduxjs/toolkit'

import ticketsReducer from './store/tickets/ticketsSlice'
import usersReducer from './store/users/usersSlice';

export const store = configureStore({
  reducer: {
    tickets: ticketsReducer,
    users: usersReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
