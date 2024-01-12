import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "../features/adminReducer";
import ManufacturerReducer from "../features/ManufacturerReducer"
export default configureStore({
  reducer: {
    admins: adminReducer,
    manufacturer: ManufacturerReducer
  },
});
    