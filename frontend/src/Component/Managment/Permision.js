// import React, { useState } from "react";
// import BtnDark from "../Common/Buttons/BtnDark"
// import CheckboxList from "./CheckBoxList";
// import { useEffect } from "react";
// import "./CheckboxList.css";
// import { useNavigate } from "react-router-dom";
// export default function Permision() {

//   const [selectedItems, setSelectedItems] = useState([]);
//   const [selectAll, setSelectAll] = useState(false);
//   const navigate =useNavigate()
//   const handleToggleAll = () => {
//     if (!selectAll) {
//       setSelectedItems([...riderManagementItems, ...driverManagementItems, ...BookingManagement, ...Notifications, ...Vehicletypemanagement, ...Faremanagement, ...Vehiclemanagement, ...RentalfareManagement, ...CourierManagement, ...StateManagement, ...TollsManagement]);
//     } else {
//       setSelectedItems([]);
//     }
//     setSelectAll(!selectAll);
//   };

//   useEffect(() => {
//     const allChecked = [ ...riderManagementItems, ...driverManagementItems, ...BookingManagement, ...Notifications, ...Vehicletypemanagement, ...Faremanagement, ...Vehiclemanagement, ...RentalfareManagement, ...CourierManagement, ...StateManagement, ...TollsManagement].every((item) => selectedItems.includes(item));
//     setSelectAll(allChecked);
//   }, [selectedItems]);

//   const makeManagement = [
//    "/makeManagement",
//    "addMake",
//    "viewTable"
//   ]
//   const ModelMenagement = [
//     "/modelManagement"
//    ]
//    const countryManagement = [
//     "/countryManagement"
//    ]
   
//   const riderManagementItems = [
//     "Manage Rider",
//     "Delete Rider",
//     "View Riders Wallet History",
// "Riders List",
// "Block rider",
// "Recharge rider's Wallet",
// "Add Rider",
// "View Rider",
// "Edit Rider",
// "Change Rider Password"
//   ];

//   const driverManagementItems = [
//    " Manage Driver",
// "Add Driver Vehicle",
//  "Delete Driver Vehicl",
//     "Recharge Drivers Wallet",
// " List Driver",
//    " Add Driver",
//     "View Driver",
//    " List Driver Vehicle",
//    " Change Status of Drivers Vehicle",
//    " Active Driver List",
//     "Edit Driver",
//   "Driver Change passwod",
//     "edit Driver Vehicle",
//   "  View License Expired",
//    " Inactive Driver list",
//   " delete Driver",
// " driver review Documents",
//    " View Driver Vehicle",
//     "View Driver Wallet History"
//   ];

//   const BookingManagement = [
//     "Manage Booking ",
//     "View Booking",
//     "List View ",
//     "Booking details"
//   ];

//   const Notifications = [
//   "Send Notification" ,
//  ];

//  const  Vehicletypemanagement =[
//  " Manage vehicle type",
// "Change Vehicle Type Status",
// "List Vehicle Type ",
// "Add Vehicle Type",
// " Edit Vehicle Type",
//  ]
//    const Vehiclemanagement =[
//     "Manage vehicle makes",
//   "   Manage vehicle models",
//    ]

//    const Faremanagement =[
// "   Manage fare",
// "Edit Fare",
// "View Fare",
// "Delete Fare",
// "Add Fare",
// "Change fare Status",
// "Rental Free History"
//    ]


//    const RentalfareManagement =[
//    " Manage rental fare",
// "Edit Rental Fare",
// "View Rental fare",
// "Delete Rental Fare",
// "Add Rental Fare",
// "Change Rental Fare Status",
// "Rental Fare History"
//        ]
    
//        const CourierManagement =[
//         "Manage couriers",
//        " Delete Couriers",
//         "Delete Courier List",
//        " Change Country Status",
//         "Add countries Edit Countries"
//        ]
//     const StateManagement =[
//      "/stateManagement",
//      " Manage State",
//      " Edit State",
//      " View State List",
//     "  Delete state",
//      " Add State Change State Status"

//     ]
//     const TollsManagement =[
//     "  Manage Tolls",
// "Delete Tolls",
// "Edit Tolls",
//  "Add Tolls ",
// " Change Toll Status"
//     ]
    
//   // Define other lists of items

//   function handelPermision() {
//     navigate('/SignUp', { state: { permissions: selectedItems } }); // Pass selectedItems as a state
//   }

//   return (
//     <div>                
//     <div>
//       <div className="checkbox-container">     
//     <input
//         type="checkbox"
//         id="selectAll"
//         checked={selectAll}
//         onChange={handleToggleAll}
//       />
//       <label htmlFor="selectAll">Select All</label>
//       </div>
//       <CheckboxList items={makeManagement} title="makeManagement" selectedItems={selectedItems} setSelectedItems={setSelectedItems}  selectAll={selectAll} setSelectAll={setSelectAll}  />
//       <CheckboxList items={countryManagement} title="countryManagement" selectedItems={selectedItems} setSelectedItems={setSelectedItems}  selectAll={selectAll} setSelectAll={setSelectAll}  />
//       <CheckboxList items={ModelMenagement} title="ModelMenagement" selectedItems={selectedItems} setSelectedItems={setSelectedItems}  selectAll={selectAll} setSelectAll={setSelectAll}  />
//     <CheckboxList items={riderManagementItems} selectedItems={selectedItems} setSelectedItems={setSelectedItems} title="Rider Management" selectAll={selectAll} setSelectAll={setSelectAll} />


//       {/* Add more CheckboxList components for other sections */}
//     </div>
//     <BtnDark handleClick={handelPermision} title={"ADD"} />
//     </div>
//   );
// }

