import Text_Input from "./Inputs/Text_Input";
import Selection_Input from "./Inputs/Selection_input";
import "./common.css";
import Date_input from "./Inputs/Date_input";
import BtnDark from "./Buttons/BtnDark";
import Date_range from "./Inputs/Date_range";
import { useEffect, useState } from "react";
import BASE_URL from "../../config/config";

export default function Filter_Option({
  input,
  setInput,
  initialInput,
  options,
  btn1_title,
  btn2_title,
  handleClick1,
  handleClick2,
  children,
}) {
  let [countryOption, setCountryOption] = useState([]);
  let [stateOption, setStateOption] = useState([]);
  let [cityOption, setCityOption] = useState([]);
  const [vehicleTypeOption, setVehicleTypeOption] = useState([]);
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    if (options.includes("country")) {
      fetch(BASE_URL + "/country/", {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          let arr = [];
          data.forEach((ele) => arr.push(ele.name));
          setCountryOption(arr);
        });
    }

    if (options.includes("vehicleType")) {
      fetch(BASE_URL + "/vehicletype/", {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          let arr = [];
          data.data.forEach((ele) => arr.push(ele.name));
          setVehicleTypeOption(arr);
        });
    }

    if (options.includes("package")) {
      fetch(BASE_URL + "/rentalPackage/", {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          let arr = data.packages.map((ele) => ele.name);
          setPackages(arr);
        });
    }
  }, []);

  useEffect(() => {
    if (options.includes("state") && input?.country) {
      fetch(BASE_URL + "/state/?country=" + input?.country, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          let arr = [];
          data.forEach((ele) => arr.push(ele.name));
          setStateOption(arr);
        });
    }
  }, [input?.country]);

  useEffect(() => {
    if (options.includes("city") && input.country && input.state) {
      fetch(BASE_URL + `/city/${input.country}/${input.state}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          let arr = [];
          data.cities.forEach((ele) => arr.push(ele.name));
          setCityOption(arr);
        });
    } else setCityOption([]);
  }, [input?.country, input?.state]);

  return (
    <form style={{ margin: "10px" }}>
      <div className="row">
        <div className="col-lg-2 inputField">
          {options.includes("package") && (
            <Selection_Input
              options={packages}
              input={input}
              setInput={setInput}
              lebel_text={"Package : "}
              setKey={"package"}
            />
          )}

          {options.includes("country") && (
            <Selection_Input
              options={countryOption}
              input={input}
              setInput={setInput}
              lebel_text={"Country : "}
              setKey={"country"}
              reset={["state", "city"]}
            />
          )}
          {options.includes("state") && (
            <Selection_Input
              options={stateOption}
              input={input}
              setInput={setInput}
              lebel_text={"State : "}
              setKey={"state"}
              reset={["city"]}
            />
          )}
          {options.includes("city") && (
            <Selection_Input
              options={cityOption}
              input={input}
              setInput={setInput}
              lebel_text={"City : "}
              setKey={"city"}
            />
          )}
          {options.includes("vehicleType") && (
            <Selection_Input
              options={vehicleTypeOption}
              input={input}
              setInput={setInput}
              lebel_text={"VehicleType : "}
              setKey={"vehicleType"}
            />
          )}
          {options.includes("name") && (
            <Text_Input
              input={input}
              lebel_text={"Name :"}
              setKey={"name"}
              setInput={setInput}
            />
          )}
          {options.includes("username") && (
            <Text_Input
              input={input}
              lebel_text={"username :"}
              setKey={"username"}
              setInput={setInput}
            />
          )}
          {options.includes("make") && (
            <Text_Input
              input={input}
              lebel_text={"make :"}
              setKey={"make"}
              setInput={setInput}
            />
          )}
          {options.includes("status") && (
            <Selection_Input
              options={["ACTIVE", "INACTIVE"]}
              input={input}
              setInput={setInput}
              lebel_text={"Status : "}
              setKey={"status"}
            />
          )}

          {options.includes("from") && (
            <Date_input
              setKey={"from"}
              setInput={setInput}
              lebel_text={"From :"}
            />
          )}
          {options.includes("to") && (
            <Date_input setKey={"to"} setInput={setInput} lebel_text={"To :"} />
          )}
          <div>
            {btn1_title && (
              <BtnDark handleClick={handleClick1} title={btn1_title} />
            )}
            {btn2_title && (
              <BtnDark handleClick={handleClick2} title={btn2_title} />
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
