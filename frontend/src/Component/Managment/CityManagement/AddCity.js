import { useEffect, useState } from "react";
import Selection_Input from "../../Common/Inputs/Selection_input";
import Management_container from "../../Common/Management_container";
import "./addCity.css";
import Text_Input from "../../Common/Inputs/Text_Input";
import BtnDark from "../../Common/Buttons/BtnDark";

let initialInput = {
  name: "",
  country: "",
  state: "",
  status: "",
  utcOffset: "",
  vehicalService: [],
};
export default function AddCity() {
  const [options, setOptions] = useState([]);
  const [city, setCity] = useState(initialInput);
  const [state, setState] = useState();
  const[vehicleService,setVehicleService] = useState();
  useEffect(() => {
    fetch("http://localhost:8080/test/api/v1/country/", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        let arr = [];
        data.forEach((ele) => arr.push(ele.name));
        setOptions(arr);
      });

      fetch("http://localhost:8080/test/api/v1/vehicaltype/",{
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
                    <div className="vehicleService" key={i}>
                        <div>
                  <div class="form-check form-check-primary mb-3">
                    <input class="form-check-input" type="checkbox" />
                    <label class="form-check-label">
                      {ele.name}
                    </label>
                  </div>
                </div>
                <div className="runMode">
                    {runMode}
                </div>
                    </div>
                )
            })
            setVehicleService(arr)
        }
      })
  }, []);

  useEffect(() => {
    if (city.country) {
      fetch(
        "http://localhost:8080/test/api/v1/state/?country=" + city.country,
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
      <div className="addCityContainar">
        <div className="ml-5 mt-3">
          <form>
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
        </div>
            <div className="allService">
                {vehicleService}
            </div>
            <BtnDark handleClick={handleSubmit} title={"Add City"} />
      </div>
    </Management_container>
  );
}
