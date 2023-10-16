// import React, { useState } from "react";
// import BtnDark from "../Common/Buttons/BtnDark"
// import CheckboxList from "./CheckBoxList";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// export default function Dialog() {

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
    


//   function handelPermision() {
//     navigate('/SignUp', { state: { permissions: selectedItems } }); 
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
// <CheckboxList items={driverManagementItems} title="Driver Management" selectedItems={selectedItems} setSelectedItems={setSelectedItems}   selectAll={selectAll} setSelectAll={setSelectAll}  />
// <CheckboxList items={BookingManagement} title="Booking Management" selectedItems={selectedItems} setSelectedItems={setSelectedItems}  selectAll={selectAll} setSelectAll={setSelectAll}  />
// <CheckboxList items={Notifications} title="Notifications" selectedItems={selectedItems} setSelectedItems={setSelectedItems}  selectAll={selectAll} setSelectAll={setSelectAll}  />
// <CheckboxList items={Vehicletypemanagement} title="Vehicle type management" selectedItems={selectedItems} setSelectedItems={setSelectedItems}  selectAll={selectAll} setSelectAll={setSelectAll}  />
// <CheckboxList items={Faremanagement} title="Faremanagement" selectedItems={selectedItems} setSelectedItems={setSelectedItems}  selectAll={selectAll} setSelectAll={setSelectAll}  />
// <CheckboxList items={Vehiclemanagement} title="Vehiclemanagement" selectedItems={selectedItems} setSelectedItems={setSelectedItems}  selectAll={selectAll} setSelectAll={setSelectAll}  />
// <CheckboxList items={RentalfareManagement} title="RentalfareManagement" selectedItems={selectedItems} setSelectedItems={setSelectedItems}  selectAll={selectAll} setSelectAll={setSelectAll}  />
// <CheckboxList items={CourierManagement} title="CourierManagement" selectedItems={selectedItems} setSelectedItems={setSelectedItems}  selectAll={selectAll} setSelectAll={setSelectAll}  />
// <CheckboxList items={StateManagement} title="StateManagement" selectedItems={selectedItems} setSelectedItems={setSelectedItems}  selectAll={selectAll} setSelectAll={setSelectAll}  />
// <CheckboxList items={TollsManagement} title="TollsManagement" selectedItems={selectedItems} setSelectedItems={setSelectedItems}  selectAll={selectAll} setSelectAll={setSelectAll}  />

//       {/* Add more CheckboxList components for other sections */}
//     </div>
//     <BtnDark handleClick={handelPermision} title={"ADD"} />
//     </div>
//   );
// }


// import { useState } from "react";
// import Wraper from "../common/wrapper";
// import { useNavigate } from "react-router-dom";
// import BASE_URL from "../../../config/config";
// import logo from "../../../assets/image/logo-2.png"
// import Filter_Option from "../../Common/Filter_option";
// import { useLocation } from "react-router-dom";
// import Permision from "../../Managment/Permision";
// import { useEffect } from "react";
// let url = BASE_URL+"/auth/signUp";
// let initState = {
//   name: null,
//   username: null,
//   email: null,
//   password: null,
//   country:"",
//   state:"",
//   city:"",
//   status:"INACTIVE"
// };

// export default function SignUp() {
//   let [user, setUser] = useState(initState);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const permissions = location.state ? location.state.permissions : [];
//   console.log("bckd",permissions)
//   let [successMsg, setSuccessMsg] = useState();
//   const[status,setStatus]=useState(false) 

//   useEffect(() => {
//     if (permissions.length > 0) {
//       setUser((prevFields) => ({ ...prevFields, permissions }));
//     }
//   }, [permissions]);

//   function handleSubmit(e) {

//     e.preventDefault();
//     const userData = { ...user,permissions};
//     fetch(url, {
//       method: "POST",
//       body: JSON.stringify(userData),
//       headers: {
//         "Content-type": "application/json; charset=UTF-8",
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data);
//         if (data.success) {
//           setSuccessMsg(
//             <div
//               style={{
//                 backgroundColor: "lightgreen",
//                 textAlign: "center",
//                 marginTop: "5px",
//                 padding: "10px",
//               }}
//             >
//               SignUp Successfull
//             </div>
//           );
//           setTimeout(() => {
//             navigate("/SignUp");
//           }, 2000);
//         }else{
//             setSuccessMsg(
//                 <div
//                   style={{
//                     backgroundColor: "red",
//                     textAlign: "center",
//                     marginTop: "5px",
//                     padding: "10px",
//                   }}
//                 >
//                   {data.message}
//                 </div>
//               );
//         }
//       })
//       .catch((e) => console.log(e));
//     setUser(initState);
//   }

//   function handelPermision(){
//     setStatus(true)
//  }

//   return (
//     <Wraper loginpage={true}>
//       <div className="card-body m-3 pt-0">
//                 <img
//                   src={logo}
//                   alt="logo"
//                   height="34"
//                 />
//         <div className="p-2">
//           <form className="needs-validation" onSubmit={(e) => handleSubmit(e)}>
//             <div className="mb-3">
//               <label for="useremail" class="form-label">
//                 Name
//               </label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="name"
//                 placeholder="Enter Name"
//                 required
//                 value={user.name}

//                 onChange={(e) =>
//                   setUser((preVal) => ({ ...preVal, name: e.target.value }))
//                 }
//               />
//               <div className="invalid-feedback">Please Enter Name</div>
//             </div>

//             <div className="mb-3">
//               <label for="useremail" className="form-label">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 className="form-control"
//                 id="useremail"
//                 placeholder="Enter email"
//                 required
//                 value={user.email}
//                 onChange={(e) =>
//                   setUser((preVal) => ({ ...preVal, email: e.target.value }))
//                 }
//               />
//               <div className="invalid-feedback">Please Enter Email</div>
//             </div>

//             <div className="mb-3">
//               <label for="username" className="form-label">
//                 Username
//               </label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="username"
//                 placeholder="Enter username"
//                 required
//                 value={user.username}

//                 onChange={(e) =>
//                   setUser((preVal) => ({ ...preVal, username: e.target.value }))
//                 }
//               />
//               <div className="invalid-feedback">Please Enter Username</div>
//             </div>

//             <div className="mb-3">
//               <label for="userpassword" className="form-label">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 className="form-control"
//                 id="userpassword"
//                 placeholder="Enter password"
//                 required
//                 value={user.password}
//                 onChange={(e) =>
//                   setUser((preVal) => ({ ...preVal, password: e.target.value }))
//                 }
//               />
//               <div className="invalid-feedback">Please Enter Password</div>
//             </div>
//             <div className="col-md-7">
//   <Filter_Option 
//     input={user}
//     setInput={setUser}
//     initialInput={user}
//     options={["country", "state", "city"]}
    
//   />
// </div>

//             <lebel>Status: </lebel>
//             <select 
//             name="selectedStatus" 
//             defaultValue={user.status}
//             onChange={e=>{setUser(preVal=>({...preVal,status:e.target.value}))}}
//             >
//                 <option value="INACTIVE">Inactive</option>
//                 <option value="ACTIVE">Active</option>
//             </select>
//             <div className="mt-4 d-grid">
//               <button
//                 className="btn btn-primary waves-effect waves-light"
//                    onClick={handelPermision}
//               >
//              AdminPermision
//               </button>
      
//             </div>
//             <div className="mt-4 d-grid">
//               <button
//                 className="btn btn-primary waves-effect waves-light"
//                 type="submit"
//               >
//                Add Admin
//               </button>
//               {successMsg}
//             </div>
//           </form>
//         </div>
//         <Permision status={status} setStatus={setStatus}/>
//       </div>
//     </Wraper>
//   );
// }
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// import { useEffect, useState } from 'react'; 
// import BtnDark from '../Common/Buttons/BtnDark';
// import CheckboxList from '../Managment/CheckBoxList'
// import { useNavigate } from "react-router-dom";
// export default function Permision(props)

// {
//     const [selectedItems, setSelectedItems] = useState([]);
//     const [selectAll, setSelectAll] = useState(false);
//     const navigate =useNavigate()
//     const handleToggleAll = () => {
//       if (!selectAll) {
//         setSelectedItems([...riderManagementItems, ...driverManagementItems, ...BookingManagement, ...Notifications, ...Vehicletypemanagement, ...Faremanagement, ...Vehiclemanagement, ...RentalfareManagement, ...CourierManagement, ...StateManagement, ...TollsManagement]);
//       } else {
//         setSelectedItems([]);
//       }
//       setSelectAll(!selectAll);
//     };
  
//     useEffect(() => {
//       const allChecked = [ ...riderManagementItems, ...driverManagementItems, ...BookingManagement, ...Notifications, ...Vehicletypemanagement, ...Faremanagement, ...Vehiclemanagement, ...RentalfareManagement, ...CourierManagement, ...StateManagement, ...TollsManagement].every((item) => selectedItems.includes(item));
//       setSelectAll(allChecked);
//     }, [selectedItems]);
  
//     const makeManagement = [
//      "/makeManagement",
//      "addMake",
//      "viewTable"
//     ]
//     const ModelMenagement = [
//       "/modelManagement"
//      ]
//      const countryManagement = [
//       "/countryManagement"
//      ]
     
//     const riderManagementItems = [
//       "Manage Rider",
//       "Delete Rider",
//       "View Riders Wallet History",
//   "Riders List",
//   "Block rider",
//   "Recharge rider's Wallet",
//   "Add Rider",
//   "View Rider",
//   "Edit Rider",
//   "Change Rider Password"
//     ];
//     const driverManagementItems = [
//      " Manage Driver",
//   "Add Driver Vehicle",
//    "Delete Driver Vehicl",
//       "Recharge Drivers Wallet",
//   " List Driver",
//      " Add Driver",
//       "View Driver",
//      " List Driver Vehicle",
//      " Change Status of Drivers Vehicle",
//      " Active Driver List",
//       "Edit Driver",
//     "Driver Change passwod",
//       "edit Driver Vehicle",
//     "  View License Expired",
//      " Inactive Driver list",
//     " delete Driver",
//   " driver review Documents",
//      " View Driver Vehicle",
//       "View Driver Wallet History"
//     ];
//     const BookingManagement = [
//       "Manage Booking ",
//       "View Booking",
//       "List View ",
//       "Booking details"
//     ];
//     const Notifications = [
//     "Send Notification" ,
//    ];
//    const  Vehicletypemanagement =[
//    " Manage vehicle type",
//   "Change Vehicle Type Status",
//   "List Vehicle Type ",
//   "Add Vehicle Type",
//   " Edit Vehicle Type",
//    ]
//      const Vehiclemanagement =[
//       "Manage vehicle makes",
//     "   Manage vehicle models",
//      ]
//      const Faremanagement =[
//   "   Manage fare",
//   "Edit Fare",
//   "View Fare",
//   "Delete Fare",
//   "Add Fare",
//   "Change fare Status",
//   "Rental Free History"
//      ]
//      const RentalfareManagement =[
//      " Manage rental fare",
//   "Edit Rental Fare",
//   "View Rental fare",
//   "Delete Rental Fare",
//   "Add Rental Fare",
//   "Change Rental Fare Status",
//   "Rental Fare History"
//          ]
      
//          const CourierManagement =[
//           "Manage couriers",
//          " Delete Couriers",
//           "Delete Courier List",
//          " Change Country Status",
//           "Add countries Edit Countries"
//          ]
//       const StateManagement =[
//        "/stateManagement",
//        " Manage State",
//        " Edit State",
//        " View State List",
//       "  Delete state",
//        " Add State Change State Status"
  
//       ]
//       const TollsManagement =[
//       "  Manage Tolls",
//   "Delete Tolls",
//   "Edit Tolls",
//    "Add Tolls ",
//   " Change Toll Status"
//       ]
      
  
  
//     function handelPermision() {
//       navigate('/SignUp', { state: {permissions:selectedItems } }); 
//       props.setStatus(false)
//     }
  
//     const[open,setOpen]=useState(props.status)
   
//     useEffect(function(){
//         setOpen(props.status)
        
//       },[props])

//       const handleClose = () => {
//         props.setStatus(false)
//       }
    
      
//     const Content=()=>
//     {
//         return(
//             <div>                
//             <div>
//               <div className="checkbox-container">     
//             <input
//                 type="checkbox"
//                 id="selectAll"
//                 checked={selectAll}
//                 onChange={handleToggleAll}
//               />
//               <label htmlFor="selectAll">Select All</label>
//               </div>
//               <CheckboxList items={makeManagement} title="makeManagement" selectedItems={selectedItems} setSelectedItems={setSelectedItems}  selectAll={selectAll} setSelectAll={setSelectAll}  />
//               <CheckboxList items={countryManagement} title="countryManagement" selectedItems={selectedItems} setSelectedItems={setSelectedItems}  selectAll={selectAll} setSelectAll={setSelectAll}  />
//               <CheckboxList items={ModelMenagement} title="ModelMenagement" selectedItems={selectedItems} setSelectedItems={setSelectedItems}  selectAll={selectAll} setSelectAll={setSelectAll}  />
//             <CheckboxList items={riderManagementItems} selectedItems={selectedItems} setSelectedItems={setSelectedItems} title="Rider Management" selectAll={selectAll} setSelectAll={setSelectAll} />
//         <CheckboxList items={driverManagementItems} title="Driver Management" selectedItems={selectedItems} setSelectedItems={setSelectedItems}   selectAll={selectAll} setSelectAll={setSelectAll}  />
//         <CheckboxList items={BookingManagement} title="Booking Management" selectedItems={selectedItems} setSelectedItems={setSelectedItems}  selectAll={selectAll} setSelectAll={setSelectAll}  />
//         <CheckboxList items={Notifications} title="Notifications" selectedItems={selectedItems} setSelectedItems={setSelectedItems}  selectAll={selectAll} setSelectAll={setSelectAll}  />
//         <CheckboxList items={Vehicletypemanagement} title="Vehicle type management" selectedItems={selectedItems} setSelectedItems={setSelectedItems}  selectAll={selectAll} setSelectAll={setSelectAll}  />
//         <CheckboxList items={Faremanagement} title="Faremanagement" selectedItems={selectedItems} setSelectedItems={setSelectedItems}  selectAll={selectAll} setSelectAll={setSelectAll}  />
//         <CheckboxList items={Vehiclemanagement} title="Vehiclemanagement" selectedItems={selectedItems} setSelectedItems={setSelectedItems}  selectAll={selectAll} setSelectAll={setSelectAll}  />
//         <CheckboxList items={RentalfareManagement} title="RentalfareManagement" selectedItems={selectedItems} setSelectedItems={setSelectedItems}  selectAll={selectAll} setSelectAll={setSelectAll}  />
//         <CheckboxList items={CourierManagement} title="CourierManagement" selectedItems={selectedItems} setSelectedItems={setSelectedItems}  selectAll={selectAll} setSelectAll={setSelectAll}  />
//         <CheckboxList items={StateManagement} title="StateManagement" selectedItems={selectedItems} setSelectedItems={setSelectedItems}  selectAll={selectAll} setSelectAll={setSelectAll}  />
//         <CheckboxList items={TollsManagement} title="TollsManagement" selectedItems={selectedItems} setSelectedItems={setSelectedItems}  selectAll={selectAll} setSelectAll={setSelectAll}  />
        
//               {/* Add more CheckboxList components for other sections */}
//             </div>
//             <BtnDark handleClick={handelPermision} title={"ADD"} />
//             </div>
//         )
//     }

//     return(<div>
//          <Dialog fullWidth style={{borderRadius:20}}
//         open={open}
//         onClose={handleClose}
//         >
                
//             <DialogTitle >
                
//                 <div style={{fontFamily:'poppins',display:'flex',justifyContent:'center',}}>
//              Permissions Admins
//                 </div>
//                 <div onClick={handleClose} style={{fontFamily:'poppins',fontSize:16,fontWeight:'bold',marginRight:100}}>back</div>   
//             </DialogTitle>
                
//             <DialogContent>
//                 {Content()}
//             </DialogContent>
           
//       </Dialog>
//     </div>)
//     }
// const selectedItems=(selectedItems)=>
// {
//   console.log("aaaaaaaaaaaaaaaaaaaaaa:",selectedItems)
// }
// console.log("llll",selectedItems)
//       props.devesh(selectedItems)

// import { useState } from "react";
// import Selection_Input from "../../Common/Inputs/Selection_input";
// import Text_Input from "../../Common/Inputs/Text_Input";
// import Wraper from "../common/wrapper";
// import { useNavigate } from "react-router-dom";
// import BASE_URL from "../../../config/config";
// import logo from "../../../assets/image/logo-2.png"
// import Filter_Option from "../../Common/Filter_option";
// import { useLocation } from "react-router-dom";
// import Permision from "../../Managment/Permision";
// import { useEffect } from "react";
// let url = BASE_URL+"/auth/signUp";
// let initState = {
//   name: null,
//   username: null,
//   email: null,
//   password: null,
//   country:"",
//   state:"",
//   city:"",
//   status:"INACTIVE"
// };

// export default function SignUp() {
//   let [user, setUser] = useState(initState);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const[status,setStatus]=useState(false) 
//   // const permissions = location.state ? location.state.permissions : [];
//   const [selectedItems, setSelectedItems] = useState([]);
//   // console.log("PERMISSIONS",permissions)
//   let [successMsg, setSuccessMsg] = useState();
//   console.log("PERMISSSIONSSS",selectedItems)  

//   useEffect(() => {
//     if (selectedItems.length > 0) {
//       setUser((prevFields) => ({ ...prevFields, selectedItems }));
//     }
//   }, []);

//   function handleSubmit(e) {

//     e.preventDefault();
//     const userData = { ...user, selectedItems };
//     fetch(url, {
//       method: "POST",
//       body: JSON.stringify(userData),
//       headers: {
//         "Content-type": "application/json; charset=UTF-8",
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data);
//         if (data.success) {
//           setSuccessMsg(
//             <div
//               style={{
//                 backgroundColor: "lightgreen",
//                 textAlign: "center",
//                 marginTop: "5px",
//                 padding: "10px",
//               }}
//             >
//               SignUp Successfull
//             </div>
//           );
//           setTimeout(() => {
//             navigate("/login");
//           }, 2000);
//         }else{
//             setSuccessMsg(
//                 <div
//                   style={{
//                     backgroundColor: "red",
//                     textAlign: "center",
//                     marginTop: "5px",
//                     padding: "10px",
//                   }}
//                 >
//                   {data.message}
//                 </div>
//               );
//         }
//       })
//       .catch((e) => console.log(e));
//     setUser(initState);
//   }

//   function handelPermision(){
//     setStatus(true)
//  }

//  function updateSelectedItems(newSelectedItems) {
//   setSelectedItems(newSelectedItems);
// }

//   return (
//     <>                        
//     <Wraper loginpage={true}>
//       <div className="card-body m-3 pt-0">
//                 <img
//                   src={logo}
//                   alt="logo"
//                   height="34"
//                 />
//         <div className="p-2">
//           <form className="needs-validation" onSubmit={(e) => handleSubmit(e)}>
//             <div className="mb-3">
//               <label for="useremail" class="form-label">
//                 Name
//               </label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="name"
//                 placeholder="Enter Name"
//                 required
//                 value={user.name}

//                 onChange={(e) =>
//                   setUser((preVal) => ({ ...preVal, name: e.target.value }))
//                 }
//               />
//               <div className="invalid-feedback">Please Enter Name</div>
//             </div>

//             <div className="mb-3">
//               <label for="useremail" className="form-label">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 className="form-control"
//                 id="useremail"
//                 placeholder="Enter email"
//                 required
//                 value={user.email}
//                 onChange={(e) =>
//                   setUser((preVal) => ({ ...preVal, email: e.target.value }))
//                 }
//               />
//               <div className="invalid-feedback">Please Enter Email</div>
//             </div>

//             <div className="mb-3">
//               <label for="username" className="form-label">
//                 Username
//               </label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="username"
//                 placeholder="Enter username"
//                 required
//                 value={user.username}

//                 onChange={(e) =>
//                   setUser((preVal) => ({ ...preVal, username: e.target.value }))
//                 }
//               />
//               <div className="invalid-feedback">Please Enter Username</div>
//             </div>

//             <div className="mb-3">
//               <label for="userpassword" className="form-label">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 className="form-control"
//                 id="userpassword"
//                 placeholder="Enter password"
//                 required
//                 value={user.password}
//                 onChange={(e) =>
//                   setUser((preVal) => ({ ...preVal, password: e.target.value }))
//                 }
//               />
//               <div className="invalid-feedback">Please Enter Password</div>
//             </div>
//             <div className="col-md-7">
//   <Filter_Option 
//     input={user}
//     setInput={setUser}
//     initialInput={user}
//     options={["country", "state", "city"]}
    
//   />
// </div>

//             <lebel>Status: </lebel>
//             <select 
//             name="selectedStatus" 
//             defaultValue={user.status}
//             onChange={e=>{setUser(preVal=>({...preVal,status:e.target.value}))}}
//             >
//                 <option value="INACTIVE">Inactive</option>
//                 <option value="ACTIVE">Active</option>
//             </select>
//             <div className="mt-4 d-grid">
//               <button
//                 className="btn btn-primary waves-effect waves-light"
//                    onClick={handelPermision}
//               >
//              AdminPermision
//               </button>
      
//             </div>
//             <div className="mt-4 d-grid">
//               <button
//                 className="btn btn-primary waves-effect waves-light"
//                 type="submit"
//               >
//                Add Admin
//               </button>
//               {successMsg}
//             </div>
//           </form>
        
//         </div>
//       </div>
//     </Wraper>
//     <Permision status={status} setStatus={setStatus}  selectedItems={selectedItems}  setSelectedItems={setSelectedItems}/>
//     </>  
//   );
// }
import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// import { useEffect, useState } from 'react'; 
// import BtnDark from '../Common/Buttons/BtnDark';
// import CheckboxList from '../Managment/CheckBoxList'
// import { useNavigate } from "react-router-dom";
// export default function Permision(props)
// {
//     const [selectedItems, setSelectedItems] = useState(props.selectedItems,);
//     const [selectAll, setSelectAll] = useState(false);
//     const navigate =useNavigate()
//     const handleToggleAll = () => {
//       if (!selectAll) {   
//         setSelectedItems([...riderManagementItems, ...driverManagementItems, ...BookingManagement, ...Notifications, ...Vehicletypemanagement, ...Faremanagement, ...Vehiclemanagement, ...RentalfareManagement, ...CourierManagement, ...StateManagement, ...TollsManagement,...makeManagement,...ModelMenagement,...countryManagement]);
//       } else {
//         setSelectedItems([]);
//       }
//       setSelectAll(!selectAll);
//     };
  
//     useEffect(() => {
//       const allChecked = [...makeManagement,...ModelMenagement,...riderManagementItems,...countryManagement,...driverManagementItems, ...BookingManagement, ...Notifications, ...Vehicletypemanagement, ...Faremanagement, ...Vehiclemanagement, ...RentalfareManagement, ...CourierManagement, ...StateManagement, ...TollsManagement].every((item) => selectedItems.includes(item));
//       setSelectAll(allChecked);
//     }, [selectedItems]);
  
//     const makeManagement = [
//      "/makeManagement",
//      "addMake",
//      "viewTable"
//     ]
//     const ModelMenagement = [
//       "/modelManagement"
//      ]
//      const countryManagement = [
//       "/countryManagement"
//      ]
     
//     const riderManagementItems = [
//       "Manage Rider",
//       "Delete Rider",
//       "View Riders Wallet History",
//   "Riders List",
//   "Block rider",
//   "Recharge rider's Wallet",
//   "Add Rider",
//   "View Rider",
//   "Edit Rider",
//   "Change Rider Password"
//     ];
//     const driverManagementItems = [
//      " Manage Driver",
//   "Add Driver Vehicle",
//    "Delete Driver Vehicl",
//       "Recharge Drivers Wallet",
//   " List Driver",
//      " Add Driver",
//       "View Driver",
//      " List Driver Vehicle",
//      " Change Status of Drivers Vehicle",
//      " Active Driver List",
//       "Edit Driver",
//     "Driver Change passwod",
//       "edit Driver Vehicle",
//     "  View License Expired",
//      " Inactive Driver list",
//     " delete Driver",
//   " driver review Documents",
//      " View Driver Vehicle",
//       "View Driver Wallet History"
//     ];
//     const BookingManagement = [
//       "Manage Booking ",
//       "View Booking",
//       "List View ",
//       "Booking details"
//     ];
//     const Notifications = [
//     "Send Notification" ,
//    ];
//    const  Vehicletypemanagement =[
//    " Manage vehicle type",
//   "Change Vehicle Type Status",
//   "List Vehicle Type ",
//   "Add Vehicle Type",
//   " Edit Vehicle Type",
//    ]
//      const Vehiclemanagement =[
//       "Manage vehicle makes",
//     "   Manage vehicle models",
//      ]
//      const Faremanagement =[
//   "   Manage fare",
//   "Edit Fare",
//   "View Fare",
//   "Delete Fare",
//   "Add Fare",
//   "Change fare Status",
//   "Rental Free History"
//      ]
//      const RentalfareManagement =[
//      " Manage rental fare",
//   "Edit Rental Fare",
//   "View Rental fare",
//   "Delete Rental Fare",
//   "Add Rental Fare",
//   "Change Rental Fare Status",
//   "Rental Fare History"
//          ]
      
//          const CourierManagement =[
//           "Manage couriers",
//          " Delete Couriers",
//           "Delete Courier List",
//          " Change Country Status",
//           "Add countries Edit Countries"
//          ]
//       const StateManagement =[
//        "/stateManagement",
//        " Manage State",
//        " Edit State",
//        " View State List",
//       "  Delete state",
//        " Add State Change State Status"
  
//       ]
//       const TollsManagement =[
//       "  Manage Tolls",
//   "Delete Tolls",
//   "Edit Tolls",
//    "Add Tolls ",
//   " Change Toll Status"
//       ]
      
  
  
//     function handelPermision() {
//       // navigate('/SignUp', { state: {permissions:selectedItems } }); 
//       props.setStatus(false)
//     }
  
//     const[open,setOpen]=useState(props.status)
   
//     useEffect(function(){
//         setOpen(props.status)
        
//       },[props])

//       const handleClose = () => {
//         props.setStatus(false)
//       }
    
      
//     const Content=()=>
//     {
//         return(
//             <div>                
//             <div>
//               <div className="checkbox-container">     
//             <input
//                 type="checkbox"
//                 id="selectAll"
//                 // checked={selectAll}
//                 // onChange={handleToggleAll}
//               />
//               <label htmlFor="selectAll">Select All</label>
//               </div>
//               <CheckboxList items={makeManagement} title="makeManagement" selectedItems={selectedItems} setSelectedItems={setSelectedItems}   />
//               <CheckboxList items={countryManagement} title="countryManagement" selectedItems={selectedItems} setSelectedItems={setSelectedItems}  />
//               {/* <CheckboxList items={ModelMenagement} title="ModelMenagement" selectedItems={selectedItems} setSelectedItems={setSelectedItems}  selectAll={selectAll} setSelectAll={setSelectAll}  />
//             <CheckboxList items={riderManagementItems} selectedItems={selectedItems} setSelectedItems={setSelectedItems} title="Rider Management" selectAll={selectAll} setSelectAll={setSelectAll} />
//         <CheckboxList items={driverManagementItems} title="Driver Management" selectedItems={selectedItems} setSelectedItems={setSelectedItems}   selectAll={selectAll} setSelectAll={setSelectAll}  />
//         <CheckboxList items={BookingManagement} title="Booking Management" selectedItems={selectedItems} setSelectedItems={setSelectedItems}  selectAll={selectAll} setSelectAll={setSelectAll}  />
//         <CheckboxList items={Notifications} title="Notifications" selectedItems={selectedItems} setSelectedItems={setSelectedItems}  selectAll={selectAll} setSelectAll={setSelectAll}  />
//         <CheckboxList items={Vehicletypemanagement} title="Vehicle type management" selectedItems={selectedItems} setSelectedItems={setSelectedItems}  selectAll={selectAll} setSelectAll={setSelectAll}  />
//         <CheckboxList items={Faremanagement} title="Faremanagement" selectedItems={selectedItems} setSelectedItems={setSelectedItems}  selectAll={selectAll} setSelectAll={setSelectAll}  />
//         <CheckboxList items={Vehiclemanagement} title="Vehiclemanagement" selectedItems={selectedItems} setSelectedItems={setSelectedItems}  selectAll={selectAll} setSelectAll={setSelectAll}  />
//         <CheckboxList items={RentalfareManagement} title="RentalfareManagement" selectedItems={selectedItems} setSelectedItems={setSelectedItems}  selectAll={selectAll} setSelectAll={setSelectAll}  />
//         <CheckboxList items={CourierManagement} title="CourierManagement" selectedItems={selectedItems} setSelectedItems={setSelectedItems}  selectAll={selectAll} setSelectAll={setSelectAll}  />
//         <CheckboxList items={StateManagement} title="StateManagement" selectedItems={selectedItems} setSelectedItems={setSelectedItems}  selectAll={selectAll} setSelectAll={setSelectAll}  />
//         <CheckboxList items={TollsManagement} title="TollsManagement" selectedItems={selectedItems} setSelectedItems={setSelectedItems}  selectAll={selectAll} setSelectAll={setSelectAll}  /> */}
        
//               {/* Add more CheckboxList components for other sections */}
//             </div>
//             <BtnDark handleClick={handelPermision} title={"ADD"} />
//             </div>
//         )
//     }

//     return(<div>
//          <Dialog fullWidth style={{borderRadius:20}}
//         open={open}
//         onClose={handleClose}
//         >
                
//             <DialogTitle >
                
//                 <div style={{fontFamily:'poppins',display:'flex',justifyContent:'center',}}>
//              Permissions Admins
//                 </div>
//                 <div onClick={handleClose} style={{fontFamily:'poppins',fontSize:16,fontWeight:'bold',marginRight:100}}>back</div>   
//             </DialogTitle>
                
//             <DialogContent>
//                 {Content()}
//             </DialogContent>
           
//       </Dialog>
//     </div>)
//     }
{/* <div className="col-md-7">
<Filter_Option
  input={user}
  setInput={setUser}
  initialInput={user}
  options={["country", "state", "city"]}
/>
</div> */}     {/* <div className="col-md-6">
          <Filter_Option
            input={user}
            setInput={setUser}
            initialInput={user}
            options={["country", "state", "city"]}
          />
        </div> */}
        // import { useState } from "react";
        // import Wraper from "../common/wrapper";
        // import { useNavigate } from "react-router-dom";
        // import BASE_URL from "../../../config/config";
        // import logo from "../../../assets/image/logo-2.png"
        // import Filter_Option from "../../Common/Filter_option";
        // import { useEffect } from "react";
        // import CheckboxList from "../../Managment/CheckBoxList";
        // import BtnDark from "../../Common/Buttons/BtnDark";
        // let url = BASE_URL+"/auth/signUp";
        // let initState = {
        //   name: null,
        //   username: null,
        //   email: null,
        //   password: null,
        //   country:"",
        //   state:"",
        //   city:"",
        //   status:"INACTIVE"
        // };
        
        // export default function SignUp() {
        //   let [user, setUser] = useState(initState);
        //   const navigate = useNavigate();
        //   const [selectedItems, setSelectedItems] = useState([]);
        //   const [selected, setSelected] = useState([]);
        //   let [successMsg, setSuccessMsg] = useState();
        //   const [showDiv, setShowDiv] = useState(false);
        
        //   function handleButtonClick() {
        //     setShowDiv(!showDiv); // Toggle the state between true and false
        //   }
        //   const makeManagement = [
        //     "/makeManagement",
        //     "addMake",
        //     "viewTable"
        //    ]
        //     const countryManagement = [
        //      "/countryManagement"
        //     ]
           
        
        //   useEffect(() => {
        //     if (selected.length > 0) {
        //       setUser((prevFields) => ({ ...prevFields, selected}));
        //     }
        //   }, []);
        
        //   function handelPermision(selectedItems) {
        //     // setShowDiv(false)
        //     setSelected(selectedItems)
        //   }
          
        
        //   function handleSubmit(e) {
        
        //     e.preventDefault();
        //     const userData = { ...user, selected};
        //     fetch(url, {
        //       method: "POST",
        //       body: JSON.stringify(userData),
        //       headers: {
        //         "Content-type": "application/json; charset=UTF-8",
        //       },
        //     })
        //       .then((res) => res.json())
        //       .then((data) => {
        //         console.log(data);
        //         if (data.success) {
        //           setSuccessMsg(
        //             <div
        //               style={{
        //                 backgroundColor: "lightgreen",
        //                 textAlign: "center",
        //                 marginTop: "5px",
        //                 padding: "10px",
        //               }}
        //             >
        //               SignUp Successfull
        //             </div>
        //           );
        //           setTimeout(() => {
        //             navigate("/login");
        //           }, 2000);
        //         }else{
        //             setSuccessMsg(
        //                 <div
        //                   style={{
        //                     backgroundColor: "red",
        //                     textAlign: "center",
        //                     marginTop: "5px",
        //                     padding: "10px",
        //                   }}
        //                 >
        //                   {data.message}
        //                 </div>
        //               );
        //         }
        //       })
        //       .catch((e) => console.log(e));
        //     setUser(initState);
        //     setSelected([]);
        //   }
        //  return (                      
        // <div className="card-body m-6 pt-0"  class="container" style={{border:'2px solid  grey'}}>
        //   <img src={logo} alt="logo" height="34" />
        //   <div className="p-2 text-center">
        //     <form className="needs-validation" onSubmit={(e) => handleSubmit(e)}>
        //       <div className="row justify-content-center">
        //         {/* Grid 1: Name and Email */}
        //         <div className="mb-4 col-md-4">
        //           <label htmlFor="name" className="form-label">
        //             Name
        //           </label>
        //           <input
        //             type="text"
        //             className="form-control border"
        //             id="name"
        //             placeholder="Enter Name"
        //             required
        //             value={user.name}
        //             onChange={(e) =>
        //               setUser((preVal) => ({ ...preVal, name: e.target.value }))
        //             }
        //           />
        //           <div className="invalid-feedback">Please Enter Name</div>
        //         </div>
        
        //         <div className="mb-4 col-md-4">
        //           <label htmlFor="useremail" className="form-label">
        //             Email
        //           </label>
        //           <input
        //             type="email"
        //             className="form-control border"
        //             id="useremail"
        //             placeholder="Enter email"
        //             required
        //             value={user.email}
        //             onChange={(e) =>
        //               setUser((preVal) => ({ ...preVal, email: e.target.value }))
        //             }
        //           />
        //           <div className="invalid-feedback">Please Enter Email</div>
        //         </div>
        //       </div>
        
        //       <div className="row justify-content-center">
        //         {/* Grid 2: Username and Password */}
        //         <div className="mb-4 col-md-4">
        //           <label htmlFor="username" className="form-label">
        //             Username
        //           </label>
        //           <input
        //             type="text"
        //             className="form-control border"
        //             id="username"
        //             placeholder="Enter username"
        //             required
        //             value={user.username}
        //             onChange={(e) =>
        //               setUser((preVal) => ({ ...preVal, username: e.target.value }))
        //             }
        //           />
        //           <div className="invalid-feedback">Please Enter Username</div>
        //         </div>
        
        //         <div className="mb-4 col-md-4">
        //           <label htmlFor="userpassword" className="form-label form-label-sm">
        //             Password
        //           </label>
        //           <input
        //             type="password"
        //             className="form-control border"
        //             id="userpassword"
        //             placeholder="Enter password"
        //             required
        //             value={user.password}
        //             onChange={(e) =>
        //               setUser((preVal) => ({ ...preVal, password: e.target.value }))
        //             }
        //           />
        //           <div className="invalid-feedback">Please Enter Password</div>
        //         </div>
        //       </div>
        
        //       {/* Rest of your form code here */}
        //     </form>
        //   </div>
        // </div>
        
        
        //   );
        // }
//         import { useState } from "react";
// import Wraper from "../common/wrapper";
// import { useNavigate } from "react-router-dom";
// import BASE_URL from "../../../config/config";
// import logo from "../../../assets/image/logo-2.png"
// import Filter_Option from "../../Common/Filter_option";
// import { useEffect } from "react";
// import CheckboxList from "../../Managment/CheckBoxList";
// import BtnDark from "../../Common/Buttons/BtnDark";
// let url = BASE_URL+"/auth/signUp";
// let initState = {
//   name: null,
//   username: null,
//   email: null,
//   password: null,
//   country:"",
//   state:"",
//   city:"",
//   status:"INACTIVE"
// };

// export default function AddAdmin() {
//   let [user, setUser] = useState(initState);
//   const navigate = useNavigate();
//   const [selectedItems, setSelectedItems] = useState([]);
//   const [selected, setSelected] = useState([]);
//   let [successMsg, setSuccessMsg] = useState();
//   const [showDiv, setShowDiv] = useState(false);

//   function handleButtonClick() {
//     setShowDiv(!showDiv); 
//   }
//   const [selectAll, setSelectAll] = useState(false);
//   const makeManagement = [
//     "/makeManagement",
//     "addMake",
//     "viewTable"
//    ]
//       const ModelMenagement = [
//       "/modelManagement"
//      ]
//      const countryManagement = [
//       "/countryManagement"
//      ]
     
//     const riderManagementItems = [
//       "Manage Rider",
//       "Delete Rider",
//       "View Riders Wallet History",
//   "Riders List",
//   "Block rider",
//   "Recharge rider's Wallet",
//   "Add Rider",
//   "View Rider",
//   "Edit Rider",
//   "Change Rider Password"
//     ];
//     const driverManagementItems = [
//      " Manage Driver",
//   "Add Driver Vehicle",
//    "Delete Driver Vehicl",
//       "Recharge Drivers Wallet",
//   " List Driver",
//      " Add Driver",
//       "View Driver",
//      " List Driver Vehicle",
//      " Change Status of Drivers Vehicle",
//      " Active Driver List",
//       "Edit Driver",
//     "Driver Change passwod",
//       "edit Driver Vehicle",
//     "  View License Expired",
//      " Inactive Driver list",
//     " delete Driver",
//   " driver review Documents",
//      " View Driver Vehicle",
//       "View Driver Wallet History"
//     ];
//     const BookingManagement = [
//       "Manage Booking ",
//       "View Booking",
//       "List View ",
//       "Booking details"
//     ];
//     const Notifications = [
//     "Send Notification" ,
//    ];
//    const  Vehicletypemanagement =[
//    " Manage vehicle type",
//   "Change Vehicle Type Status",
//   "List Vehicle Type ",
//   "Add Vehicle Type",
//   " Edit Vehicle Type",
//    ]
//      const Vehiclemanagement =[
//       "Manage vehicle makes",
//     "   Manage vehicle models",
//      ]
//      const Faremanagement =[
//   "   Manage fare",
//   "Edit Fare",
//   "View Fare",
//   "Delete Fare",
//   "Add Fare",
//   "Change fare Status",
//   "Rental Free History"
//      ]
//      const RentalfareManagement =[
//      " Manage rental fare",
//   "Edit Rental Fare",
//   "View Rental fare",
//   "Delete Rental Fare",
//   "Add Rental Fare",
//   "Change Rental Fare Status",
//   "Rental Fare History"
//          ]
      
//          const CourierManagement =[
//           "Manage couriers",
//          " Delete Couriers",
//           "Delete Courier List",
//          " Change Country Status",
//           "Add countries Edit Countries"
//          ]
//       const StateManagement =[
//        "/stateManagement",
//        " Manage State",
//        " Edit State",
//        " View State List",
//       "  Delete state",
//        " Add State Change State Status"
  
//       ]
//       const TollsManagement =[
//       "  Manage Tolls",
//   "Delete Tolls",
//   "Edit Tolls",
//    "Add Tolls ",
//   " Change Toll Status"
//       ]
   
//       const handleToggleAll = () => {
//               if (!selectAll) {   
//                 setSelectedItems([...riderManagementItems, ...driverManagementItems, ...BookingManagement, ...Notifications, ...Vehicletypemanagement, ...Faremanagement, ...Vehiclemanagement, ...RentalfareManagement, ...CourierManagement, ...StateManagement, ...TollsManagement,...makeManagement,...ModelMenagement,...countryManagement]);
//               } else {
//                 setSelectedItems([]);
//               }
//               setSelectAll(!selectAll);
//             };
          
//             useEffect(() => {
//               const allChecked = [...makeManagement,...ModelMenagement,...riderManagementItems,...countryManagement,...driverManagementItems, ...BookingManagement, ...Notifications, ...Vehicletypemanagement, ...Faremanagement, ...Vehiclemanagement, ...RentalfareManagement, ...CourierManagement, ...StateManagement, ...TollsManagement].every((item) => selectedItems.includes(item));
//               setSelectAll(allChecked);
//             }, [selectedItems]);


//   useEffect(() => {
//     if (selected.length > 0) {
//       setUser((prevFields) => ({ ...prevFields, selected}));
//     }
//   }, []);

//   function handelPermision(selectedItems) {
//     // setShowDiv(false)
//     setSelected(selectedItems)
//   }
  

//   function handleSubmit(e) {

//     e.preventDefault();
//     const userData = { ...user, selected};
//     fetch(url, {
//       method: "POST",
//       body: JSON.stringify(userData),
//       headers: {
//         "Content-type": "application/json; charset=UTF-8",
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data);
//         if (data.success) {
//           setSuccessMsg(
//             <div
//               style={{
//                 backgroundColor: "lightgreen",
//                 textAlign: "center",
//                 marginTop: "5px",
//                 padding: "10px",
//               }}
//             >
//               SignUp Successfull
//             </div>
//           );
//           setTimeout(() => {
//             navigate("/login");
//           }, 2000);
//         }else{
//             setSuccessMsg(
//                 <div
//                   style={{
//                     backgroundColor: "red",
//                     textAlign: "center",
//                     marginTop: "5px",
//                     padding: "10px",
//                   }}
//                 >
//                   {data.message}
//                 </div>
//               );
//         }
//       })
//       .catch((e) => console.log(e));
//     setUser(initState);
//     setSelected([]);
//   }
//  return (                      
//   <div className="card-body m-6 pt-0"  class="container" style={{border:'2px solid  grey'}}>
//   <img src={logo} alt="logo" height="34" />
//   <div className="p-2 text-center">
//     <form className="needs-validation" onSubmit={(e) => handleSubmit(e)}>
//       <div className="row">
//       <div className="mb-4 col-md-6">
//           <label htmlFor="name" className="form-label">
//             Name
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="name"
//             placeholder="Enter Name"
//             required
//             value={user.name}
//             onChange={(e) =>
//               setUser((preVal) => ({ ...preVal, name: e.target.value }))
//             }
//           />
//           <div className="invalid-feedback">Please Enter Name</div>
//         </div>

//         <div className="mb-4 col-md-6">
//           <label htmlFor="useremail" className="form-label">
//             Email
//           </label>
//           <input
//             type="email"
//             className="form-control"
//             id="useremail"
//             placeholder="Enter email"
//             required
//             value={user.email}
//             onChange={(e) =>
//               setUser((preVal) => ({ ...preVal, email: e.target.value }))
//             }
//           />
//           <div className="invalid-feedback">Please Enter Email</div>
//         </div>

//         <div className="mb-4 col-md-6">
//           <label htmlFor="username" className="form-label">
//             Username
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="username"
//             placeholder="Enter username"
//             required
//             value={user.username}
//             onChange={(e) =>
//               setUser((preVal) => ({ ...preVal, username: e.target.value }))
//             }
//           />
//           <div className="invalid-feedback">Please Enter Username</div>
//         </div>

//         <div className="mb-4 col-md-6">
//           <label htmlFor="userpassword" className="form-label ">
//             Password
//           </label>
//           <input
//             type="password"
//             className="form-control"
//             id="userpassword"
//             placeholder="Enter password"
//             required
//             value={user.password}
//             onChange={(e) =>
//               setUser((preVal) => ({ ...preVal, password: e.target.value }))
//             }
//           />
//           <div className="invalid-feedback">Please Enter Password</div>
//         </div>
//       </div>
//       <div className="col-md-7">
{/* <Filter_Option */}
//   input={user}
//   setInput={setUser}
//   initialInput={user}
//   options={["country", "state", "city"]}
// />
// </div> 
//       <div className="mb-4 col-md-6"></div>
//       <label>Status: </label>
//           <select
//             name="selectedStatus"
//             defaultValue={user.status}
//             onChange={(e) => {
//               setUser((preVal) => ({ ...preVal, status: e.target.value }));
//             }}
//           >
//             <option value="INACTIVE">Inactive</option>
//             <option value="ACTIVE">Active</option>
//           </select>
//           <button onClick={() => handleButtonClick()}>Permissions</button>
//           {/* <BtnDark handleClick={() =>  handleButtonClick()} title={"Permissions"} /> */}
//           {showDiv && (
//                  <div>                
//                         <div>
//                             <div className="checkbox-container">     
//                               <input
//                                   type="checkbox"
//                                   id="selectAll"
//                                   checked={selectAll}
//                                   onChange={handleToggleAll}
//                                 />
//                                 <label htmlFor="selectAll">Select All</label>
//                                 </div>
//                              <CheckboxList items={makeManagement} title="makeManagement" selectedItems={selectedItems} setSelectedItems={setSelectedItems}   />
//                                 <CheckboxList items={countryManagement} title="countryManagement" selectedItems={selectedItems} setSelectedItems={setSelectedItems}  />
//                   <CheckboxList items={ModelMenagement} title="ModelMenagement" selectedItems={selectedItems} setSelectedItems={setSelectedItems}  selectAll={selectAll} setSelectAll={setSelectAll}  />
//                               <CheckboxList items={riderManagementItems} selectedItems={selectedItems} setSelectedItems={setSelectedItems} title="Rider Management" selectAll={selectAll} setSelectAll={setSelectAll} />
//                           <CheckboxList items={driverManagementItems} title="Driver Management" selectedItems={selectedItems} setSelectedItems={setSelectedItems}   selectAll={selectAll} setSelectAll={setSelectAll}  />
//                           <CheckboxList items={BookingManagement} title="Booking Management" selectedItems={selectedItems} setSelectedItems={setSelectedItems}  selectAll={selectAll} setSelectAll={setSelectAll}  />
//                           <CheckboxList items={Notifications} title="Notifications" selectedItems={selectedItems} setSelectedItems={setSelectedItems}  selectAll={selectAll} setSelectAll={setSelectAll}  />
//                           <CheckboxList items={Vehicletypemanagement} title="Vehicle type management" selectedItems={selectedItems} setSelectedItems={setSelectedItems}  selectAll={selectAll} setSelectAll={setSelectAll}  />
//                           <CheckboxList items={Faremanagement} title="Faremanagement" selectedItems={selectedItems} setSelectedItems={setSelectedItems}  selectAll={selectAll} setSelectAll={setSelectAll}  />
//                          <CheckboxList items={Vehiclemanagement} title="Vehiclemanagement" selectedItems={selectedItems} setSelectedItems={setSelectedItems}  selectAll={selectAll} setSelectAll={setSelectAll}  />
//                          <CheckboxList items={RentalfareManagement} title="RentalfareManagement" selectedItems={selectedItems} setSelectedItems={setSelectedItems}  selectAll={selectAll} setSelectAll={setSelectAll}  />
//                          <CheckboxList items={CourierManagement} title="CourierManagement" selectedItems={selectedItems} setSelectedItems={setSelectedItems}  selectAll={selectAll} setSelectAll={setSelectAll}  />
//                          <CheckboxList items={StateManagement} title="StateManagement" selectedItems={selectedItems} setSelectedItems={setSelectedItems}  selectAll={selectAll} setSelectAll={setSelectAll}  />
//                          <CheckboxList items={TollsManagement} title="TollsManagement" selectedItems={selectedItems} setSelectedItems={setSelectedItems}  selectAll={selectAll} setSelectAll={setSelectAll}  /> 
//                              </div>
//                              <BtnDark handleClick={handelPermision} title={"ADD"} />
//                             </div>
           
//       )}
      
 

//       <div>
//         <button
//           className="btn btn-primary waves-effect waves-light"
//           type="submit"
//         >
//           Add Admin
//         </button>
//         {successMsg}
//       </div>
//     </form>
//   </div>
// </div>
//   );
// }
