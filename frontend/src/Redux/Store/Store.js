import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "../features/adminReducer";
import ManufacturerReducer from "../features/ManufacturerReducer";
import authReducer from "../features/authReducer";
import countryReducer from "../features/countryReducer";
import stateReducer from "../features/stateReducer";
import cityReducer from "../features/cityReducer";
import ModelReducer from "../features/ModelReducer";
import vehicleCategoryReducer from "../features/vehicleCategoryReducer";
import fareReducer from "../features/individualFareReducer";
import deleteModalReducer from "../features/deleteModalReducer";
import vehicleTypeReducer from "../features/vehicleTypeReducer";
import packageReducer from "../features/packageReducer";
import tollReducer from "../features/tollReducer";

export default configureStore({
  reducer: {
    admins: adminReducer,
    auth: authReducer,
    manufacturer: ManufacturerReducer,
    countries: countryReducer,
    states: stateReducer,
    cities: cityReducer,
    model: ModelReducer,
    vehicleCategory: vehicleCategoryReducer,
    fare: fareReducer,
    delete: deleteModalReducer,
    vehicleType: vehicleTypeReducer,
    package: packageReducer,
    toll: tollReducer,
  },
});
