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
import promotionReducer from "../features/promotionReducer";
import tollReducer from "../features/tollReducer";
import rentalFareReducer from "../features/rentalFareReducer";
import emailTemplateReducer from "../features/emailTemplateReducer";
import smsTemplateReducer from "../features/smsTemplateReducer";
import riderReducer from "../features/riderReducer";
import pageReducer from "../features/pageReducer";
import settingReducer from "../features/settingReducer";
import promoCodeReducer from "../features/promoCodeReducer";
import taxReducer from "../features/taxReducer";
import rentalPromotionReducer from "../features/rentalPromotionReducer";
import referralReducer from "../features/referralReducer";
import driverReducer from "../features/driverReducer";
import riderNotificationReducer from "../features/riderNotificationReducer";

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
    promotion: promotionReducer,
    rentalFare: rentalFareReducer,
    smsTemplate: smsTemplateReducer,
    emailTemplate: emailTemplateReducer,
    rider: riderReducer,
    pages: pageReducer,
    setting: settingReducer,
    tax: taxReducer,
    promoCode: promoCodeReducer,
    rentalPromotion: rentalPromotionReducer,
    referral: referralReducer,
    driver: driverReducer,
    riderNotifications: riderNotificationReducer,
  },
});
