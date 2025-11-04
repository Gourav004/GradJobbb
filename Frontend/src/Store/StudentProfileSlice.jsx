import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("profile")) || null;

const StudentProfileSlice = createSlice({
  name: "studentProfile",
  initialState,
  reducers: {
    addProfile: (state, action) => action.payload,
    dltProfile: (state) => null,
  },
});

export const { addProfile, dltProfile } = StudentProfileSlice.actions;
export default StudentProfileSlice.reducer;
