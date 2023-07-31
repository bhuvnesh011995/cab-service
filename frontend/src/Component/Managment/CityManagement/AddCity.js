import { useEffect, useState } from "react";
import Selection_Input from "../../Common/Inputs/Selection_input";
import Management_container from "../../Common/Management_container";
import Text_Input from "../../Common/Inputs/Text_Input";
import BtnDark from "../../Common/Buttons/BtnDark";
import VehicletypeCheckbox from "./VehicleTypeCheckbox";
import BASE_URL from "../../../config/config";

let initialInput = {
  name: "",
  country: "",
  state: "",
  status: "",
  utcOffset: "",
  vehicleService: [],
};
export default function AddCity() {
  const [options, setOptions] = useState([]);
  const [city, setCity] = useState(initialInput);
  const [state, setState] = useState();
  const[vehicleService,setVehicleService] = useState();
  useEffect(() => {
    fetch(BASE_URL+"/country/", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        let arr = [];
        data.forEach((ele) => arr.push(ele.name));
        setOptions(arr);
      });

      fetch(BASE_URL+"/vehicletype/",{
        method:"GET"
      }).then(res=>res.json())
      .then(data=>{
        if(data.success){
           let arr = data.data.map((ele,i)=>{
                let runMode = ele.runMode.map((ele,i)=>{
                    return(
                        <div key={i} class="form-check form-check-primary mb-3">
                            <input class="form-check-input" type="checkbox" />
                            <label class="form-check-label">
                            {ele.name}
                            </label>
                        </div>
                    )
                })
                return(
                  <VehicletypeCheckbox setCity={setCity} city={city} ele={ele} i = {i} runMode ={runMode}/>
                )
            })
            setVehicleService(arr)
        }
      })
  }, []);

  useEffect(() => {
    if (city.country) {
      fetch(
        BASE_URL+"/state/?country=" + city.country,
        {
          method: "GET",
        }
      )
        .then((res) => res.json())
        .then((data) => {
          let arr = [];
          data.forEach((ele) => arr.push(ele.name));
          setState(arr);
        });
    } else setState([]);
  }, [city.country]);



  function handleSubmit (e){
    e.preventDafault()
    return
  }
  return (
    <Management_container title={"Add City"}>
     <div class="row" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
    <div class="col-lg-10">
      <div class="card">
        <div class="card-body">
          <form>
            <div class="row">
              <Selection_Input
              options={options}
              setInput={setCity}
              input={city}
              lebel_text={"Country : "}
              setKey={"country"}
            />
            <Selection_Input
              options={state}
              setInput={setCity}
              input={city}
              lebel_text={"State : "}
              setKey={"state"}
            />
            </div>
            
            <Text_Input
              input={city}
              lebel_text={"Name :"}
              setKey={"name"}
              setInput={setCity}
            />
            <Text_Input
              input={city}
              lebel_text={"UTCOffset :"}
              setKey={"utcOffset"}
              setInput={setCity}
            />
            <Selection_Input
              options={["ACTIVE", "INACTIVE"]}
              input={city}
              setInput={setCity}
              lebel_text={"Status : "}
              setKey={"status"}
            /></form>
        
            <div> <label>Vehicle Service</label>
                {vehicleService}
            </div>
            <BtnDark handleClick={handleSubmit} title={"Add City"} />
      </div></div></div></div>
    </Management_container>
  );
}
