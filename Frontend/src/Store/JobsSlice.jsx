import { createSlice } from "@reduxjs/toolkit";

const jobsSlice = createSlice({
  name: "jobs",
  initialState: null,
  reducers: {
    showJobs: (state, action) => action.payload,
  },
});

export const { showJobs } = jobsSlice.actions;

export default jobsSlice.reducer;
