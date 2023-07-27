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
import VehicleManagement from './Component/Managment/VehicleManagement.js/VehicleManagement';
import AddVehicleType from './Component/Managment/VehicleManagement.js/AddVehicleType';
import IndividualFareManagement from './Component/Managment/IndividualFareManagement/IndividualFareManagement';
import AddIndividualFare from './Component/Managment/IndividualFareManagement/AddIndividualFare';
import RentalFareManagement from './Component/Managment/RentalPackageManagement/RentalPackageManagement';
import RentalPackageManagement from './Component/Managment/RentalFareManagement/RentalFareManagement';
import AddRentalPackage from './Component/Managment/RentalPackageManagement/AddRentalPackage';

const router = createBrowserRouter([
  {
    element:<App />,
    // errorElement:<ErrorPage/>,
    children:[
    {path:"/",element:<Home/>,},
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
    {path:"vehicleManagement",element:< VehicleManagement/>},
    {path:"addVehicleType",element:<AddVehicleType />},
    {path:"individualFareManagement",element:< IndividualFareManagement/>},
    {path:"addIndividualFare",element:< AddIndividualFare/>},
    {path:"rentalFareManagement",element:< RentalFareManagement/>},
    {path:"addRentalFare",element:<div>rental fare management</div>},
    {path:"rentalPackage",element:<RentalPackageManagement />},
    {path:"addPackage",element:<AddRentalPackage />},
    ]
  },
    
    
    
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <RouterProvider router={router} />

  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
