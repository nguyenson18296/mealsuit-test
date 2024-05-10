import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface IUser {
  id: number;
  name: string;
}

export interface IUserState {
  users: IUser[];
}

const initialState: IUserState = {
  users: [],
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    getUsers(state, action: PayloadAction<IUser[]>) {
      state.users = action.payload;
    }
  }
})
export const { getUsers } = usersSlice.actions;

export default usersSlice.reducer;
