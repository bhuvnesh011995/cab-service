import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./errorPage/ErrorPage";
import Home from "./Component/Home/Home";
import AdminManagement from "./Component/Managment/AdminManagement/Admin.management.js";
import MakeManagement from "./Component/Managment/MakeManagement/Makemanagement";
import ModelManagement from "./Component/Managment/ModelManagement/ModelManagement";
import CountryManagement from "./Component/Managment/CountryManagement/CountryManagement";
import Addcountry from "./Component/Managment/CountryManagement/AddCountry";
import StateManagement from "./Component/Managment/StateManagement/StateManagement";
import AddState from "./Component/Managment/StateManagement/AddState";
import CityManagement from "./Component/Managment/CityManagement/CityManageMent";
import IndividualFareManagement from "./Component/Managment/IndividualFareManagement/IndividualFareManagement";
import AddIndividualFare from "./Component/Managment/IndividualFareManagement/AddIndividualFare";
import RentalPackageManagement from "./Component/Managment/RentalPackageManagement/RentalPackageManagement";
import RentalFareManagement from "./Component/Managment/RentalFareManagement/RentalFareManagement";
import AddRentalPackage from "./Component/Managment/RentalPackageManagement/AddRentalPackage";
import AddRentalFare from "./Component/Managment/RentalFareManagement/AddRentalFare";
import Practice from "./practice";
import Setting, { Settings } from "./Component/Setting/Setting";
import AddPage from "./Component/Managment/PageManagement/AddPage";
import PageManagement from "./Component/Managment/PageManagement/PageManagement";
import RiderManagement from "./Component/Managment/RiderManagement/RiderManagement";
import AddRider from "./Component/Managment/RiderManagement/AddRider";
import SignIn from "./Component/Auth/SignIn/SignIn";
import AuthProvider from "./Context/AuthContext";
import ResetPass from "./Component/Auth/ResetPass/ResetPass";
import DriverManagement from "./Component/Managment/DriverManagement/DriverManagement";
import AddDriver from "./Component/Managment/DriverManagement/AddDriver";
import AddVehicle from "./Component/Managment/VehicleManagement/AddVehicle";
import VehicleManagement from "./Component/Managment/VehicleManagement/VehicleManagement";
import VehicleTypeManagement from "./Component/Managment/VehicleTypeManagement/VehicleTypeManagement";
import AddVehicleType from "./Component/Managment/VehicleTypeManagement/AddVehicleType";
import VehicleDetails from "./Component/Managment/VehicleManagement/VehicleDetails";
import BookingManagement from "./Component/Managment/BookingManagement/BookingManagement";
import BookingDetail from "./Component/Managment/BookingManagement/BooingDetails.js";
import BookingService from "./Component/Managment/BookingManagement/BookingService";
import BookingDetails from "./Component/Managment/BookingManagement/BookingDetails";
import EmailTemplateManagement from "./Component/Managment/TemplateManagement.js/Email.TemplateManagement";
import AddEmailTemplate from "./Component/Managment/TemplateManagement.js/AddEmailTemplate";
import SmsTemplateManagement from "./Component/Managment/TemplateManagement.js/Sms.TemplateManagement";
import AddSmsTemplate from "./Component/Managment/TemplateManagement.js/AddSmsTemplate";
import PromotionManagement from "./Component/Managment/PromotionManagement.js/PromotionManagement";
import PromoCodeManagement from "./Component/Managment/PromoCodeManagement/PromoCodeManagement.js";
import AddPromotion from "./Component/Managment/PromotionManagement.js/AddPromotion";
import ReferralManagement from "./Component/Managment/ReferralManagement/ReferralManagement";
import AddReferral from "./Component/Managment/ReferralManagement/AddReferral";
import TaxManagement from "./Component/Managment/TaxManagement/TaxManagement";
import TollManagement from "./Component/Managment/TollManagement/TollManagement";
import AddToll from "./Component/Managment/TollManagement/AddToll";
import SOSManagement from "./Component/Managment/SOSManagement/SOSManagement";
import AddSos from "./Component/Managment/SOSManagement/AddSos";
import AdminDataUpdate from "./Component/Auth/SignUp/AdminDataUpdate";
import Permision from "./Component/Managment/Permision";
import AddAdmin from "./Component/Auth/SignUp/AddAdmin";
import AvaialibilityManagement from "./Component/Managment/AvaialibilityManagement/AvaialibilityManagement.js";
import AddAvaialibilityManagement from "./Component/Managment/AvaialibilityManagement/AddNew.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VehicleCategoryManagement from "./Component/Managment/VehicleCategoryMangement/VehicleCategoryMangement.js";
// import MakeUpdateManagement from "./Component/Managment/MakeManagement/MakeUpdateManagement.js";
import ModelUpdate from "./Component/Managment/ModelManagement/ModelUpdate.js";
import UpdateVehicleType from "./Component/Managment/VehicleTypeManagement/UpdateVehicleType.js";
import UpdateCountry from "./Component/Managment/CountryManagement/UpdateCountry.js";
import UpdateState from "./Component/Managment/StateManagement/UpdateState.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import Store from "./Redux/Store/Store.js";
import RiderNotification from "./Component/Managment/Notifications.js/Rider/Rider.js";
import RentalPromotionManagement from "./Component/Managment/RentalPromotionManagement/RentalPromotionManagement.js";
import TransactionManagement from "./Component/Managment/transactionManagement/transactionManagement.js";

const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "adminManagement", element: <AdminManagement /> },
      { path: "manufacturer", element: <MakeManagement /> },
      { path: "modelManagement", element: <ModelManagement /> },
      { path: "countryManagement", element: <CountryManagement /> },
      { path: "addCountry", element: <Addcountry /> },
      { path: "stateManagement", element: <StateManagement /> },
      { path: "addState", element: <AddState /> },
      { path: "cityManagement", element: <CityManagement /> },
      { path: "vehicleTypeManagement", element: <VehicleTypeManagement /> },
      { path: "addVehicleType", element: <AddVehicleType /> },
      {
        path: "individualFareManagement",
        element: <IndividualFareManagement />,
      },
      { path: "addIndividualFare", element: <AddIndividualFare /> },
      { path: "rentalFareManagement", element: <RentalFareManagement /> },
      { path: "addRentalFare", element: <AddRentalFare /> },
      { path: "rentalPackage", element: <RentalPackageManagement /> },
      { path: "addPackage", element: <AddRentalPackage /> },
      { path: "practice", element: <Practice /> },
      { path: "setting", element: <Settings /> },
      { path: "pageManagement", element: <PageManagement /> },
      { path: "addPage", element: <AddPage /> },
      { path: "riderManagement", element: <RiderManagement /> },
      { path: "addRider", element: <AddRider /> },
      { path: "driverManagement", element: <DriverManagement /> },
      { path: "addDriver", element: <AddDriver /> },
      { path: "vehicleManagement", element: <VehicleManagement /> },
      { path: "addVehicle", element: <AddVehicle /> },
      { path: "vehicleDetails", element: <VehicleDetails /> },
      { path: "bookingManagement", element: <BookingManagement /> },
      { path: "bookingSummery", element: <BookingDetail /> },
      { path: "newBooking", element: <BookingService /> },
      { path: "bookingDetails", element: <BookingDetails /> },
      { path: "emailTemplate", element: <EmailTemplateManagement /> },
      { path: "addEmailTemplate", element: <AddEmailTemplate /> },
      { path: "smsTemplate", element: <SmsTemplateManagement /> },
      { path: "addSmsTemplate", element: <AddSmsTemplate /> },
      { path: "promotionManagement", element: <PromotionManagement /> },
      { path: "promoCodeManagement", element: <PromoCodeManagement /> },
      {
        path: "rentalPromotionManagement",
        element: <RentalPromotionManagement />,
      },

      { path: "addPromotion", element: <AddPromotion /> },
      { path: "referralManagement", element: <ReferralManagement /> },
      { path: "addReferral", element: <AddReferral /> },
      { path: "taxManagement", element: <TaxManagement /> },

      { path: "tollManagement", element: <TollManagement /> },
      { path: "addToll", element: <AddToll /> },
      { path: "sosService", element: <SOSManagement /> },
      { path: "addSos", element: <AddSos /> },
      { path: "AdminDataUpdate", element: <AdminDataUpdate /> },
      {
        path: "avaialibilityManagement",
        element: <AvaialibilityManagement />,
      },
      {
        path: "addAvaialibilityManagement",
        element: <AddAvaialibilityManagement />,
      },

      {
        path: "vehicleCategoryManagement",
        element: <VehicleCategoryManagement />,
      },
      // {
      //   path: "makeUpdateManagement",
      //   element: <MakeUpdateManagement />,
      // },
      {
        path: "modelUpdate",
        element: <ModelUpdate />,
      },
      {
        path: "updateVehicleType",
        element: <UpdateVehicleType />,
      },
      {
        path: "updateCountry",
        element: <UpdateCountry />,
      },
      {
        path: "updateState",
        element: <UpdateState />,
      },
      {
        path: "notificationToRider",
        element: <RiderNotification />,
      },
    ],
  },
  {
    path: "login",
    element: <SignIn />,
  },

  {
    path: "reset",
    element: <ResetPass />,
  },
  {
    path: "Permision",
    element: <Permision />,
  },
  { path: "AddAdmin", element: <AddAdmin /> },
  { path: "adminTransactionManagement", element: <TransactionManagement /> },
]);
let queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Provider store={Store}>
      <QueryClientProvider client={queryClient}>
        <ToastContainer />
        {/* <AuthProvider> */}
        <RouterProvider router={router} />
        {/* </AuthProvider> */}
      </QueryClientProvider>
    </Provider>
  </>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
