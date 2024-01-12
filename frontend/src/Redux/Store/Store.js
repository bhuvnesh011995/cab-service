import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "../features/adminReducer";
import authReducer from "../features/authReducer";
export default configureStore({
  reducer: {
    admins: adminReducer,
    auth: authReducer,
  },
});
