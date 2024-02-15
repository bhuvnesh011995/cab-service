import Text_Input from "./Inputs/Text_Input";
import Selection_Input from "./Inputs/Selection_input";
import "./common.css";
import Date_input from "./Inputs/Date_input";
import BtnDark from "./Buttons/BtnDark";
import Date_range from "./Inputs/Date_range";
import { useEffect, useState } from "react";
import BASE_URL from "../../config/config";
import {
  fetchCountries,
  getCountries,
} from "../../Redux/features/countryReducer";
import { useDispatch, useSelector } from "react-redux";
import {
  emptyStates,
  fetchStates,
  getStates,
} from "../../Redux/features/stateReducer";
import {
  emptyCities,
  fetchCities,
  getCities,
} from "../../Redux/features/cityReducer";
import {
  fetchVehicleType,
  getAllVehicleType,
} from "../../Redux/features/vehicleTypeReducer";
import {
  fetchManufacturer,
  selectManufacturer,
} from "../../Redux/features/ManufacturerReducer";
import {
  getAllPackages,
  getPackages,
} from "../../Redux/features/packageReducer";

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
  const dispatch = useDispatch();
  const packages = useSelector(getPackages);

  const countries = useSelector(getCountries);
  const states = useSelector(getStates);
  const cities = useSelector(getCities);
  const vehicles = useSelector(getAllVehicleType);

  const manufacturer = useSelector(selectManufacturer);
  useEffect(() => {
    if (options.includes("country")) {
      dispatch(fetchCountries());
    }

    if (options.includes("vehicleType")) {
      dispatch(fetchVehicleType());
    }
    if (options.includes("manufacturer")) {
      dispatch(fetchManufacturer());
    }

    if (options.includes("package")) {
      dispatch(getAllPackages());
    }
  }, []);

  useEffect(() => {
    if (options.includes("state") && input?.country) {
      dispatch(fetchStates(input?.country));
      dispatch(emptyStates());
      dispatch(emptyCities());
    }
  }, [input?.country]);

  useEffect(() => {
    if (options.includes("city") && input.country && input.state) {
      dispatch(fetchCities(input?.state));
      dispatch(emptyCities());
    }
  }, [input?.country, input?.state]);

  return (
    <form>
      <div className='row'>
        <div className='col-lg-2 inputField'>
          {options.includes("search") && (
            <Text_Input
              input={input}
              setInput={setInput}
              setKey={"search"}
              lebel_text={"Search :"}
            />
          )}
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
              options={countries}
              input={input}
              setInput={setInput}
              lebel_text={"Country : "}
              setKey={"country"}
              reset={["state", "city"]}
            />
          )}
          {options.includes("state") && (
            <Selection_Input
              options={states}
              input={input}
              setInput={setInput}
              lebel_text={"State : "}
              setKey={"state"}
              reset={["city"]}
            />
          )}
          {options.includes("city") && (
            <Selection_Input
              options={cities}
              input={input}
              setInput={setInput}
              lebel_text={"City : "}
              setKey={"city"}
            />
          )}
          {options.includes("vehicleType") && (
            <Selection_Input
              options={vehicles}
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

          {options.includes("vehicleCategory") && (
            <Text_Input
              input={input}
              lebel_text={"vehicleCategory :"}
              setKey={"vehicleCategory"}
              setInput={setInput}
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
