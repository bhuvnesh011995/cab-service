import { BrowserRouter,Routes,Route, Link } from 'react-router-dom';
import SignIn from './Component/Auth/SignIn/SignIn';
import SignUp from './Component/Auth/SignUp/SignUp';
import Home from './Component/Home/Home';
import ResetPass from './Component/Auth/ResetPass.js/ResetPass';
import AdminManagement from './Component/Managment/Admin.management';
import AddMake from './Component/Managment/MakeManagement/AddMake';
import Header from './Component/Common/Header';
import Footer from './Component/Common/Footer';
import MakeManagement from './Component/Managment/MakeManagement/Makemanagement';
import ModelManagement from './Component/Managment/ModelManagement/ModelManagement';
import AddModel from './Component/Managment/ModelManagement/AddModel';
import CountryManagement from './Component/Managment/CountryManagement/CountryManagement';
import Addcountry from './Component/Managment/CountryManagement/AddCountry';
import AddState from './Component/Managment/StateManagement/AddState';
import StateManagement from './Component/Managment/StateManagement/StateManagement';
import AddCity from './Component/Managment/CityManagement/AddCity';
import CityManagement from './Component/Managment/CityManagement/CityManageMent';
import VehicleManagement from './Component/Managment/VehicleManagement.js/VehicleManagement';
import AddVehicleType from './Component/Managment/VehicleManagement.js/AddVehicleType';
import IndividualFareManagement from './Component/Managment/IndividualFareManagement/IndividualFareManagement';
import AddIndividualFare from './Component/Managment/IndividualFareManagement/AddIndividualFare';
import RentalFareManagement from './Component/Managment/RentalFareManagement/RentalFareManagement';
import AddRentalPackage from './Component/Managment/RentalPackageManagement/AddRentalPackage';
import RentalPackageManagement from './Component/Managment/RentalPackageManagement/RentalPackageManagement';

function App() {
  
  return (
    <BrowserRouter >
      <Header>
    {/* <Routes>
      <Route path="/" element={<Home/>} />
      <Route path='/signIn' element={<SignIn/>}/>
      <Route path='/signUp' element={<SignUp/>}/>
      <Route path='/resetPass' element={<ResetPass/>}/>
      <Route path='/adminManagement' element={<AdminManagement/>}/>
      <Route path='/makeManagement' element={<MakeManagement/>}/>
      <Route path='/addMake' element={<AddMake/>}/>
      <Route path='/modelManagement' element={<ModelManagement/>}/>
      <Route path='/addModel' element={<AddModel/>}/>
      <Route path='/countryManagement' element={<CountryManagement/>}/>
      <Route path='/addCountry' element={<Addcountry/>}/>
      <Route path='/stateManagement' element={<StateManagement/>}/>
      <Route path='/addState' element={<AddState/>}/>
      <Route path='/cityManagement' element={<CityManagement/>}/>
      <Route path='/addCity' element={<AddCity/>}/>
      <Route path='/vehicleManagement' element={<VehicleManagement/>}/>
      <Route path='/addVehicleType' element={<AddVehicleType/>}/>
      <Route path='/individualFareManagement' element={<IndividualFareManagement/>}/>
      <Route path='/addIndividualFare' element={<AddIndividualFare/>}/>
      <Route path='/rentalFareManagement' element={<RentalFareManagement/>}/>
      <Route path='/addRentalFare' element={<div>rental fare management</div>}/>
      <Route path='/rentalPackage' element={<RentalPackageManagement/>}/>
      <Route path='/addPackage' element={<AddRentalPackage />}/>


    </Routes> */}
    </Header>
    <Footer/>
    </BrowserRouter>
    
  );
}

export default App;
