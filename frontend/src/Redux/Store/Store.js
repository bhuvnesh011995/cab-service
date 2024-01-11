import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "../features/adminReducer";
export default configureStore({
  reducer: {
    admins: adminReducer,
  },
});
