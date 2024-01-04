import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../../config/config";
import logo from "../../../assets/image/logo-2.png"
import { useEffect } from "react";
import Management_container from "../../Common/Management_container";
const url = BASE_URL+'/avaialibilityManagement/'

console.log("url",url)



let initState = {
  country:"",
  state:"",
  city:"",
  pinCodeMapping:""
};

export default function AddAvaialibilityManagement(){
  let [user, setUser] = useState(initState);
  const navigate = useNavigate();
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
  
   


  console.log("user",user)

  function handleSubmit(e){
    e.preventDefault();
    fetch(url,{
        method:"POST",
        body:JSON.stringify(user),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
    })
    .then(res=>res.json())
    .then(data=>{
        if(data.success) setSuccessMsg(
            <span style={{backgroundColor:"lightgreen"}}>{data.message}</span>
        )
        else setSuccessMsg(
            <span style={{backgroundColor:"red"}}>{data.message}</span>
        )
    })
    .catch(e=>
        setSuccessMsg(<h4 style={{backgroundColor:"red"}}>{e.message}</h4>))
}

 return (     
    <Management_container>                                
  <div className="card-body m-6 pt-0"  class="container" style={{border:'1px solid  grey',width:'750px'}}>
  <img src={logo} alt="logo" height="34" />
  <div className="p-2">
    <form className="needs-validation" onSubmit={(e) => handleSubmit(e)}>
      <div className="row" >
    
        <div className="mb-4 col-md-6">
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
        <div className="mb-4 col-md-6">
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
        <div className="mb-4 col-md-6">
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


<div className="mb-4 col-md-6">
          <label htmlFor="userpassword" className="form-label ">
            PinCodeMapping
          </label>
          <input
            type="password"
            className="form-control"
            id="userpassword"
            placeholder="Enter password"
            required
            value={user.pinCodeMapping}
            onChange={(e) =>
              setUser((preVal) => ({ ...preVal, pinCodeMapping: e.target.value }))
            }
          />
        </div>

       
    
      </div>   
      
      <div  className="mb-4 col-md-6">
        <button
          className="btn btn-primary waves-effect waves-light"
          type="submit"
        >
          Add Avaialibility
        </button>
        {successMsg}
      </div>
    </form>
  </div>
</div>
</Management_container>   
  );
}