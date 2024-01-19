import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux'
export default function UpdateManufacturer({ show, setShow, data }) {

  const [manufacturer, setManufacturer] = useState({ ...data });

   const dispatch = useDispatch()
   
   
    
  return (
    <Modal size="lg" show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title> Update Manufacturer </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="needs-validation" >
          <div className="row">
            <div className="col-md-12">
              <div className="mb-4">
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
                  value={manufacturer.name}
               onChange={(e)=>{setManufacturer((prevValue) => ({ ...prevValue,name:e.target.value}))}}
                  />
              </div>    </div>
              <div className="col-md-12">
              <div className="mb-4">
            <label>Status: </label>
            <select
              name="status"
              value={manufacturer.status}
              className="form-control select2-templating "
              onChange={(e)=>{setManufacturer((prevValue) =>({ ...prevValue,status:e.target.value}))}}
           >
              <option value="INACTIVE">Inactive</option>
              <option value="ACTIVE">Active</option>
            </select>
            </div>    </div>
           
          </div>
         
        </form>
      </Modal.Body>
    </Modal>
  );
}
