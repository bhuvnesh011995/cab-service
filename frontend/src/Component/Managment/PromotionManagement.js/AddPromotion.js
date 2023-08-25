import { useEffect, useState } from "react";
import Text_Input from "../../Common/Inputs/Text_Input";
import Management_container from "../../Common/Management_container";
import BtnDark from "../../Common/Buttons/BtnDark";
import Select from "react-select";
import Selection_Input from "../../Common/Inputs/Selection_input";
import BASE_URL from "../../../config/config";
import SelectWithValue from "../../Common/Inputs/SelectWithValue";
import { useNavigate } from "react-router-dom";

const forUsersOption = [
  { value: "ADMIN", label: "Admin" },
  { value: "DRIVER", label: "Driver" },
  { value: "RIDER", label: "Rider" },
];

const initialPromotion = {
  title: "",
  status: "",
  countryId: "",
  stateId: "",
  cityId: "",
  description: "",
  forUsers: [],
};
export default function AddPromotion() {
  const [promotion, setPromotion] = useState(initialPromotion);
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
    promotion.countryId &&
      fetch(BASE_URL + "/state/" + promotion?.countryId, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          let arr = data.states.map((ele) => {
            return { value: ele._id, title: ele.name };
          });
          setStateOption(arr);
        });
  }, [promotion?.countryId]);

  useEffect(() => {
    if (promotion.countryId && promotion.stateId) {
      fetch(BASE_URL + `/city/${promotion.stateId}`, {
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
  }, [promotion?.countryId, promotion?.stateId]);

  function handleSelect(e) {
    let arr = e.map((ele) => ele.value);
    setPromotion((preVal) => ({ ...preVal, forUsers: arr }));
  }

  function handleSubmit() {
    fetch(BASE_URL+"/promotion/self/",{
        method:"POST",
        body:JSON.stringify(promotion),
        headers:{
            "Content-type": "application/json; charset=UTF-8",
        }
    }).then(res=>res.json())
    .then(data=>console.log(data))
    navigate(-1)
  }

  return (
    <Management_container title={"New Promotion"}>
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
                  input={promotion}
                  setInput={setPromotion}
                  lebel_text={"Title"}
                  setKey={"title"}
                />
                <SelectWithValue
                  reset={["stateId", "cityId"]}
                  options={countryOption}
                  label={"Country"}
                  input={promotion}
                  setInput={setPromotion}
                  setKey={"countryId"}
                />
                <SelectWithValue
                  options={stateOption}
                  reset={["cityId"]}
                  label={"State"}
                  input={promotion}
                  setInput={setPromotion}
                  setKey={"stateId"}
                />
                <SelectWithValue
                  options={cityOption}
                  label={"City"}
                  input={promotion}
                  setInput={setPromotion}
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
                  input={promotion}
                  setInput={setPromotion}
                  setKey={"status"}
                  lebel_text={"Status :"}
                />

                <div className="m-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    rows={3}
                    onChange={(e) =>
                      setPromotion((preVal) => ({
                        ...preVal,
                        description: e.target.value,
                      }))
                    }
                    type={"text"}
                    placeholder={"Promotion description ...."}
                    value={promotion.description}
                  />
                </div>
                <BtnDark handleClick={handleSubmit} title={"Add Promotion"} />
              </form>
            </div>
          </div>
        </div>
      </div>
    </Management_container>
  );
}
