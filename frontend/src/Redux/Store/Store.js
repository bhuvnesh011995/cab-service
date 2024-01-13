import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "../features/adminReducer";
import ManufacturerReducer from "../features/ManufacturerReducer
import authReducer from "../features/authReducer";



export default configureStore({
  reducer: {
    admins: adminReducer,
    auth: authReducer,
    manufacturer: ManufacturerReducer
  },
});
    