import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "./userSlice";
import jobsReducer from "./JobsSlice";
import profileReducer from "./StudentProfileSlice";

const appStore = configureStore({
  reducer: {
    student: studentReducer,
    jobs: jobsReducer,
    profile: profileReducer,
  },
});
export default appStore;
