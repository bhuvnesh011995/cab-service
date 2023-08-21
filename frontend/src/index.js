import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ErrorPage from './errorPage/ErrorPage';
import Home from './Component/Home/Home';
import AdminManagement from './Component/Managment/Admin.management';
import MakeManagement from './Component/Managment/MakeManagement/Makemanagement';
import AddMake from './Component/Managment/MakeManagement/AddMake';
import ModelManagement from './Component/Managment/ModelManagement/ModelManagement';
import AddModel from './Component/Managment/ModelManagement/AddModel';
import CountryManagement from './Component/Managment/CountryManagement/CountryManagement';
import Addcountry from './Component/Managment/CountryManagement/AddCountry';
import StateManagement from './Component/Managment/StateManagement/StateManagement';
import AddState from './Component/Managment/StateManagement/AddState';
import CityManagement from './Component/Managment/CityManagement/CityManageMent';
import AddCity from './Component/Managment/CityManagement/AddCity';
import IndividualFareManagement from './Component/Managment/IndividualFareManagement/IndividualFareManagement';
import AddIndividualFare from './Component/Managment/IndividualFareManagement/AddIndividualFare';
import RentalPackageManagement from './Component/Managment/RentalPackageManagement/RentalPackageManagement';
import RentalFareManagement from './Component/Managment/RentalFareManagement/RentalFareManagement';
import AddRentalPackage from './Component/Managment/RentalPackageManagement/AddRentalPackage';
import AddRentalFare from './Component/Managment/RentalFareManagement/AddRentalFare';
import Practice from './practice';
import Setting from './Component/Setting/Setting';
import AddPage from './Component/Managment/PageManagement/AddPage';
import PageManagement from './Component/Managment/PageManagement/PageManagement';
import RiderManagement from './Component/Managment/RiderManagement/RiderManagement';
import AddRider from './Component/Managment/RiderManagement/AddRider';
import SignIn from './Component/Auth/SignIn/SignIn';
import AuthProvider from './Context/AuthContext';
import SignUp from './Component/Auth/SignUp/SignUp';
import ResetPass from './Component/Auth/ResetPass/ResetPass';
import DriverManagement from './Component/Managment/DriverManagement/DriverManagement';
import AddDriver from './Component/Managment/DriverManagement/AddDriver';
import AddVehicle from './Component/Managment/VehicleManagement/AddVehicle';
import VehicleManagement from './Component/Managment/VehicleManagement/VehicleManagement';
import VehicleTypeManagement from './Component/Managment/VehicleTypeManagement/VehicleTypeManagement';
import AddVehicleType from './Component/Managment/VehicleTypeManagement/AddVehicleType';
import VehicleDetails from './Component/Managment/VehicleManagement/VehicleDetails';
import BookingManagement from './Component/Managment/BookingManagement/BookingManagement';
import BookingDetail from "./Component/Managment/BookingManagement/BooingDetails.js"
import BookingService from './Component/Managment/BookingManagement/BookingService';
const router = createBrowserRouter([
  {
    element:<App />,
    // errorElement:<ErrorPage/>,
    children:[
    {path:"/",element:<Home/>},
    {path:"adminManagement",element:<AdminManagement />},
    {path:"makeManagement",element:< MakeManagement/>},
    {path:"addMake",element:<AddMake />},
    {path:"modelManagement",element:<ModelManagement />},
    {path:"addModel",element:< AddModel/>},
    {path:"countryManagement",element:< CountryManagement/>},
    {path:"addCountry",element:<Addcountry />},
    {path:"stateManagement",element:< StateManagement/>},
    {path:"addState",element:<AddState />},
    {path:"cityManagement",element:<CityManagement />},
    {path:"addCity",element:<AddCity />},
    {path:"vehicleTypeManagement",element:< VehicleTypeManagement/>},
    {path:"addVehicleType",element:<AddVehicleType />},
    {path:"individualFareManagement",element:< IndividualFareManagement/>},
    {path:"addIndividualFare",element:< AddIndividualFare/>},
    {path:"rentalFareManagement",element:< RentalFareManagement/>},
    {path:"addRentalFare",element:<AddRentalFare/>},
    {path:"rentalPackage",element:<RentalPackageManagement />},
    {path:"addPackage",element:<AddRentalPackage />},
    {path:"practice",element:<Practice/>},
    {path:"setting",element:<Setting/>},
    {path:"pageManagement", element:<PageManagement/>},
    {path:"addPage",element:<AddPage/>},
    {path:"riderManagement",element:<RiderManagement/>},
    {path:"addRider",element:<AddRider/>},
    {path:"driverManagement", element:<DriverManagement/>},
    {path:"addDriver",element:<AddDriver/>},
    {path:"vehicleManagement", element:<VehicleManagement/>},
    {path:"addVehicle",element:<AddVehicle/>},
    {path:"vehicleDetails",element:<VehicleDetails/>},
    {path:"bookingManagement", element:<BookingManagement />},
    {path:"bookingSummery", element:<BookingDetail/>},
    {path:"newBooking",element:<BookingService/>}
    ]
  },{
    path:"/login", element:<SignIn/>
  },
  {
    path:"/signUp", element:<SignUp/>
  },
  {
    path:"/reset",element:<ResetPass/>
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <AuthProvider>
      <RouterProvider router={router} />
  </AuthProvider>
  

  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
