import { useState,useEffect } from "react";
import Text_Input from "../../Common/Inputs/Text_Input";
import Management_container from "../../Common/Management_container";
import BtnDark from "../../Common/Buttons/BtnDark";
import Select from "react-select";
import Selection_Input from "../../Common/Inputs/Selection_input";
import BASE_URL from "../../../config/config";
import SelectWithValue from "../../Common/Inputs/SelectWithValue";
import { useNavigate } from "react-router-dom";
import Number_Input from "../../Common/Inputs/Number_Input";

const forUsersOption = [
  { value: "ADMIN", label: "Admin" },
  { value: "DRIVER", label: "Driver" },
  { value: "RIDER", label: "Rider" },
];
const initialReferral = {
    forUsers:"",
    countryId:"",
    stateId:"",
    cityId:"",
    stateId:"",
    title:"",
    amountToApplier:0,
    maxAmountToReferrer:0,
    amountToReferrer:0,
    maxFreeRideToReferrer:0,
    freeRideToApplier:false,
    freeRideToReferrer:false
}
export default function AddReferral() {
    const [referral,setReferral] = useState(initialReferral)
    let [countryOption, setCountryOption] = useState([]);
    let [stateOption, setStateOption] = useState([]);
    let [cityOption, setCityOption] = useState([]);
    const navigate = useNavigate();

  useEffect(() => {
    fetch(BASE_URL + "/country/", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        let arr = data.map((ele) => {
          return { value: ele._id, title: ele.name };
        });
        setCountryOption(arr);
      });
  }, []);

  useEffect(() => {
    referral.countryId &&
      fetch(BASE_URL + "/state/" + referral?.countryId, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          let arr = data.states.map((ele) => {
            return { value: ele._id, title: ele.name };
          });
          setStateOption(arr);
        });
  }, [referral?.countryId]);

  useEffect(() => {
    if (referral.countryId && referral.stateId) {
      fetch(BASE_URL + `/city/${referral.stateId}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          let arr = data.cities.map((ele) => {
            return { value: ele._id, title: ele.name };
          });
          setCityOption(arr);
        });
    } else setCityOption([]);
  }, [referral?.countryId, referral?.stateId]);

  function handleSelect(e) {
    let arr = e.map((ele) => ele.value);
    setReferral((preVal) => ({ ...preVal, forUsers: arr }));
  }

  function handleSubmit() {
    fetch(BASE_URL+"/referral/",{
        method:"POST",
        body:JSON.stringify(referral),
        headers:{
            "Content-type": "application/json; charset=UTF-8",
        }
    }).then(res=>res.json())
    .then(data=>console.log(data))
    navigate(-1)
  }


    return(
        <Management_container title={"Add Referral"}>
        <div
        class="row"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div class="col-lg-6">
          <div class="card">
            <div class="card-body">
              <form className="w-100">
                <Text_Input
                  input={referral}
                  setInput={setReferral}
                  lebel_text={"Title"}
                  setKey={"title"}
                />
                <SelectWithValue
                  reset={["stateId", "cityId"]}
                  options={countryOption}
                  label={"Country"}
                  input={referral}
                  setInput={setReferral}
                  setKey={"countryId"}
                />
                <SelectWithValue
                  options={stateOption}
                  reset={["cityId"]}
                  label={"State"}
                  input={referral}
                  setInput={setReferral}
                  setKey={"stateId"}
                />
                <SelectWithValue
                  options={cityOption}
                  label={"City"}
                  input={referral}
                  setInput={setReferral}
                  setKey={"cityId"}
                />

                <label className="ms-3 mb-0">For Users</label>
                <Select
                  className="basic-multi-select m-3"
                  classNamePrefix="select"
                  isMulti
                  options={forUsersOption}
                  onChange={handleSelect}
                />
                <Selection_Input
                  options={["ACTIVE", "INACTIVE"]}
                  input={referral}
                  setInput={setReferral}
                  setKey={"status"}
                  lebel_text={"Status :"}
                />
                <h3>For Referrer</h3>

                <div class="form-check mb-3">
                    <input class="form-check-input" type="checkbox"
                    onClick={e=>setReferral(preVal=>({...preVal,freeRideToReferrer:e.target.checked}))}
                    />
                    <label class="form-check-label">
                        Free Ride
                    </label>
                </div>
                <Number_Input
                  input={referral}
                  setInput={setReferral}
                  lebel_text={"Max Free Ride"}
                  setKey={"maxFreeRideToReferrer"}
                  type={"number"}
                />
                <Number_Input
                  input={referral}
                  setInput={setReferral}
                  lebel_text={"Amount"}
                  setKey={"amountToReferrer"}
                />
                <Number_Input
                  input={referral}
                  setInput={setReferral}
                  lebel_text={"Max Amount"}
                  setKey={"maxAmountToReferrer"}
                />
                <h3>For Applier</h3>
                <div class="form-check mb-3">
                    <input class="form-check-input" type="checkbox"
                    onClick={e=>setReferral(preVal=>({...preVal,freeRideToApplier:e.target.checked}))}
                    />
                    <label class="form-check-label">
                        Free Ride
                    </label>
                </div>
                
                <Number_Input
                  input={referral}
                  setInput={setReferral}
                  lebel_text={"Amount"}
                  setKey={"amountToApplier"}
                />
                
                <BtnDark handleClick={handleSubmit} title={"Add Referral"} />
              </form>
            </div>
          </div>
        </div>
      </div>
        </Management_container>
    )
};
