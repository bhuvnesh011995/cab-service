import { useState } from "react";
import Selection_Input from "../../Common/Inputs/Selection_input";
import Text_Input from "../../Common/Inputs/Text_Input";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../../config/config";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";
const url = BASE_URL + "/make/";

export default function AddManufacturer({show,setShow}) {
  const [make, setMake] = useState({});
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    fetch(url, {
      method: "POST",
      body: JSON.stringify(make),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success(data.message);
          setShow(false)
        } else toast.error(data.message);
      })
      .catch((e) => toast.error("some error occured"));
  }

  return (
    <Modal size="" show={show} onHide={() => setShow(false)}>
    <Modal.Header closeButton>
      <Modal.Title>Add New  Manufacturer</Modal.Title>
    </Modal.Header>

    <Modal.Body>
            <div
        class="row"
      >
        <div class="col-lg-12">
        
              <form>
                <Text_Input
                  setInput={setMake}
                  input={make}
                  lebel_text={"name : "}
                  setKey={"name"}
                />
                <Selection_Input
                  options={["ACTIVE", "INACTIVE"]}
                  setInput={setMake}
                  input={make}
                  lebel_text={"Status : "}
                  setKey={"status"}
                />
              </form>
            </div>
          </div>
      </Modal.Body>
          <Modal.Footer>
          <button onClick={handleSubmit} type="button" class="btn btn-success">
                  Save
                </button>
          </Modal.Footer>
        </Modal>
  );
}
