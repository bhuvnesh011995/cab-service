import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../../config/config";
import logo from "../../../assets/image/logo-2.png"
import { useEffect } from "react";
import CheckboxList from "../../Managment/CheckBoxList";
import  { makeManagement, countryManagement, modelManagement, riderManagementItems, driverManagementItems  } from "../SignUp/PermissionData"
import BtnDark from "../../Common/Buttons/BtnDark";
let url = BASE_URL+"/auth/signUp";

let initState = {
  name: null,
  username: null,
  email: null,
  password: null,
  country:"",
  state:"",
  city:"",
  status:"INACTIVE"
};

export default function AddAdmin(){
  let [user, setUser] = useState(initState);
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState([]);
  const [selected, setSelected] = useState([]);
  let [successMsg, setSuccessMsg] = useState();
  const [showDiv, setShowDiv] = useState(false);
  let [countryOption,setCountryOption] = useState([]);
  let [stateOption,setStateOption] = useState([]);
  let [cityOption,setCityOption] = useState([]);
  function handleButtonClick() {
    setShowDiv(!showDiv);
  }
 
 useEffect(() => {
    console.log("User Country:", user.country); 
    console.log("User State:", user.state);
    console.log("User City:", user.city);
  
    if (user.country) {
      // Rest of the code
    }
  }, [user.country, user.state, user.city]);


  useEffect(() => {
    fetch(BASE_URL + "/country/", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        let arr = [];
        data.forEach((ele) => arr.push(ele.name));
        setCountryOption(arr);
      }); 
  }, []);

  useEffect(() => {
    if (user.country) {
      fetch(BASE_URL + `/state/?country=${user.country}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          let arr = [];
          data.forEach((ele) => arr.push(ele.name));
          setStateOption(arr);
        });
    } else {
      setStateOption([]); 
    }
  }, [user.country]);


  useEffect(() => {
    if (user.country && user.state) {
      const cityUrl = BASE_URL + `/city/?country=${user.country}&state=${user.state}`;
      console.log("URL:", cityUrl); 
      fetch(cityUrl, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("City Data:", data); 
          if (data.success) {
            const cityArray = data.cities.map((cityObject) => cityObject.name);
            setCityOption(cityArray);
          } else {
            console.error("Error fetching city data:", data.message);
            setCityOption([]); 
          }
        })
        .catch((error) => {
          console.error("Error fetching city data:", error);
          setCityOption([]); 
        });
    } else {
      setCityOption([]); 
    }
  }, [user.country, user.state]);
  
   

  useEffect(() => {
    if (selected.length > 0) {
      setUser((prevFields) => ({ ...prevFields, selected}));
    }
  }, []);

  function handelPermision(selectedItems) {
    console.log("nkxsnkxsxsxs",selected)
    setSelected(selectedItems)
    setShowDiv(false)
  }
  

  function handleSubmit(e) {
    e.preventDefault();
    const userData = { ...user, selected};
    fetch(url, {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          setSuccessMsg(
            <div
              style={{
                backgroundColor: "lightgreen",
                textAlign: "center",
                marginTop: "5px",
                padding: "10px",
              }}
            >
              SignUp Successfull
            </div>
          );
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }else{
            setSuccessMsg(
                <div
                  style={{
                    backgroundColor: "red",
                    textAlign: "center",
                    marginTop: "5px",
                    padding: "10px",
                  }}
                >
                  {data.message}
                </div>
              );
        }
      })
      .catch((e) => console.log(e));
    setUser(initState);
    setSelected([]);
  }
 return (                      
  <div className="card-body m-6 pt-0"  class="container" style={{border:'1px solid  grey',width:'750px'}}>
  <img src={logo} alt="logo" height="34" />
  <div className="p-2">
    <form className="needs-validation" onSubmit={(e) => handleSubmit(e)}>
      <div className="row">
      <div className="mb-4 col-md-4">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter Name"
            required
            value={user.name}
            onChange={(e) =>
              setUser((preVal) => ({ ...preVal, name: e.target.value }))
            }
          />
          <div className="invalid-feedback">Please Enter Name</div>
        </div>
        <div className="mb-4 col-md-4">
          <label htmlFor="useremail" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="useremail"
            placeholder="Enter email"
            required
            value={user.email}
            onChange={(e) =>
              setUser((preVal) => ({ ...preVal, email: e.target.value }))
            }
          />
          <div className="invalid-feedback">Please Enter Email</div>
        </div>

        <div className="mb-4 col-md-4">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="Enter username"
            required
            value={user.username}
            onChange={(e) =>
              setUser((preVal) => ({ ...preVal, username: e.target.value }))
            }
          />
          <div className="invalid-feedback">Please Enter Username</div>
        </div>
      </div>

      <div className="row" >
    
        <div className="mb-4 col-md-4">
        <label htmlFor="country" className="form-label ">
            Country
          </label>
        <select class="form-select" aria-label="Default select example"
         value={user.country} 
         onChange={(e) =>
          setUser((preVal) => ({ ...preVal, country: e.target.value }))  }
        >
  <option selected>Country</option>
  {countryOption.map((country) => (
      <option key={country} value={country}>
        {country}
      </option>
    ))}
</select>

        </div>
        <div className="mb-4 col-md-4">
        <label htmlFor="state" className="form-label "
     
        >
            State
          </label>
        <select class="form-select" aria-label="Default select example" 
           value={user.state}
           onChange={(e) =>
            setUser((preVal) => ({ ...preVal, state: e.target.value }))  }
        >
  <option selected>state</option>
  {stateOption.map((state) => (
  
      <option key={state} value={state}>
        {state}
      </option>
    ))}
</select>
        </div>
        <div className="mb-4 col-md-4">
  <label htmlFor="city" className="form-label ">
    City
  </label>
  <select
    className="form-select"
    aria-label="Default select example"
    value={user.city}
    onChange={(e) =>
      setUser((preVal) => ({ ...preVal, city: e.target.value }))
    }
  >
    <option value="">Select City</option>
    {cityOption.map((city) => (
      <option key={city} value={city}>
        {city}
      </option>
    ))}
  </select>
</div>


<div className="mb-4 col-md-4">
          <label htmlFor="userpassword" className="form-label ">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="userpassword"
            placeholder="Enter password"
            required
            value={user.password}
            onChange={(e) =>
              setUser((preVal) => ({ ...preVal, password: e.target.value }))
            }
          />
          <div className="invalid-feedback">Please Enter Password</div>
        </div>

        <div className="mb-4 col-md-4">
        <label htmlFor="Status" className="form-label ">
        Status
          </label>
        <select class="form-select" aria-label="Default select example"  
          name="selectedStatus"
          defaultValue={user.status}
          onChange={(e) => {
            setUser((preVal) => ({ ...preVal, status: e.target.value }));
          }}
        
        >
    <option value="INACTIVE">Inactive</option>
            <option value="ACTIVE">Active</option>
</select>
        </div>
    
      </div>
      <div >
        <BtnDark handleClick={() =>  handleButtonClick()} title={"Permissions"} />
          </div>
          {showDiv && (
        <div>
          <CheckboxList items={makeManagement} title="makeManagement" selectedItems={selectedItems} setSelectedItems={setSelectedItems}  />
          <CheckboxList items={countryManagement} title="countryManagement" selectedItems={selectedItems} setSelectedItems={setSelectedItems}  />
          <CheckboxList items={modelManagement} title="modelManagement" selectedItems={selectedItems} setSelectedItems={setSelectedItems}  />
          <CheckboxList items={riderManagementItems} title="riderManagementItems" selectedItems={selectedItems} setSelectedItems={setSelectedItems}  />
          <BtnDark handleClick={() => handelPermision(selectedItems)} title={"ADD"} />
        </div>     
      )}
      
      <div  className="mb-4 col-md-4">
        <button
          className="btn btn-primary waves-effect waves-light"
          type="submit"
        >
          Add Admin
        </button>
        {successMsg}
      </div>
    </form>
  </div>
</div>
  );
}
