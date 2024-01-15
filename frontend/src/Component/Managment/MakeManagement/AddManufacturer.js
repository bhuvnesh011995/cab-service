import { useState } from "react";
import Selection_Input from "../../Common/Inputs/Selection_input";
import Text_Input from "../../Common/Inputs/Text_Input";
import BASE_URL from "../../../config/config";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";
import {useDispatch ,useSelector} from "react-redux";
import {postManufacturer,fetchManufacturer} from "../../../Redux/features/ManufacturerReducer";
export default function AddManufacturer({show,setShow}) {
  const [make, setMake] = useState({});
  const [successMsg, setSuccessMsg] = useState("");
  const dispatch = useDispatch() 
  
  function handleSubmit(e) {
    e.preventDefault();
   dispatch(postManufacturer(make))
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
