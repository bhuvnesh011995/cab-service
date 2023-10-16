import { useState } from "react";
import Selection_Input from "../../Common/Inputs/Selection_input";
import Text_Input from "../../Common/Inputs/Text_Input";
import { useNavigate } from "react-router-dom";
import Management_container from "../../Common/Management_container";
import BtnDark from "../../Common/Buttons/BtnDark";
import BASE_URL from "../../../config/config";
import { useLocation } from "react-router-dom";

export default function MakeUpdateManagement() {
  const location = useLocation();
  const data = location.state.Make;

  const [make, setMake] = useState({
    id: data.id,
    name: data.name,
    status: data.status,
  });

  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  const url = BASE_URL + "/make/update/" + make.id;

  function handleSubmit(e) {
    e.preventDefault();

    const newdata = {
      name: make.name,
      status: make.status,
    };

    fetch(url, {
      method: "PUT",
      body: JSON.stringify({id:make.id,newdata }),
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
              Update Successful
            </div>
          );
        }
      });
  }

  return (
    <Management_container title={"Edit Make"}>
      <div className="row" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div className="col-lg-6">
          <div className="card">
            <div className="card-body">
            <form className="needs-validation" onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  placeholder="Enter Name"
                  required
                  value={make.name}  
                  onChange={(e) => setMake({ ...make, name: e.target.value })}
                />
                <label>Status: </label>
                <select
                  name="status"
                  value={make.status}
                  onChange={(e) => setMake({ ...make, status: e.target.value })}
                >
                  <option value="INACTIVE">Inactive</option>
                  <option value="ACTIVE">Active</option>
                </select>
                <div className="mt-4 d-grid">
              <button
                className="btn btn-primary waves-effect waves-light"
                type="submit"
              >
                Update Make
              </button>
            </div>
                {successMsg}
              </form>
            </div>
          </div>
        </div>
      </div>
    </Management_container>
  );
}
