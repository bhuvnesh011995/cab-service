import { useEffect, useState } from "react";
import Text_Input from "../../Common/Inputs/Text_Input";
import Management_container from "../../Common/Management_container";
import BtnDark from "../../Common/Buttons/BtnDark";
import BASE_URL from "../../../config/config";
import { useNavigate } from "react-router-dom";

const initialState = {
  name: "",
  description: "",
  key: "",
};
let timer
export default function AddPage() {
  const [page, setPage] = useState(initialState);
  const [succMsg, setSuccMsg] = useState("");
  const navigate = useNavigate()

  useEffect(()=>{
    return clearTimeout(timer)
  },[])

  function handleSubmit() {
    fetch(BASE_URL + "/page", {
      method: "POST",
      body: JSON.stringify(page),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setSuccMsg(
            <span style={{ backgroundColor: "lightgreen" }}>
              {data.message}
            </span>
          );
          timer = setTimeout(()=>navigate("/pageManagement"),2000)
        } else {
          setSuccMsg(
            <span style={{ backgroundColor: "red" }}>{data.message}</span>
          );
        }
      });
  }
  return (
    <Management_container title={"Add Page"}>
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
              <form>
                <Text_Input
                  lebel_text={"Name : "}
                  setKey={"name"}
                  setInput={setPage}
                />
                <div class="mb-3">
                  <label class="form-label">Meta Description</label>
                  <input
                    style={{ height: "80px" }}
                    class="form-control"
                    onChange={(e) =>
                      setPage((preVal) => ({
                        ...preVal,
                        description: e.target.value,
                      }))
                    }
                    type="text"
                    placeholder="Meta Description...."
                  />
                </div>
                <Text_Input
                  lebel_text={"Name : "}
                  setKey={"key"}
                  setInput={setPage}
                />
                <div className="d-flex justify-content-center">
                  <div className="d-flex flex-column">
                    <BtnDark title={"Add"} handleClick={handleSubmit} />
                    {succMsg}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Management_container>
  );
}
