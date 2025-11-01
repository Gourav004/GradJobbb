import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "./userSlice";
import jobsReducer from "./JobsSlice";

const appStore = configureStore({
  reducer: {
    student: studentReducer,
    jobs: jobsReducer,
  },
});
export default appStore;
