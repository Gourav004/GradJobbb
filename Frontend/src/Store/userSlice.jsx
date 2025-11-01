// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("user")) || null;

const userSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    addUser: (state, action) => action.payload,
    removeUser: (state) => null,
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
