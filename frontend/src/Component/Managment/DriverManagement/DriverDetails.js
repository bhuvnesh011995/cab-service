import { Button, Modal } from "react-bootstrap";

export default function DriverDetails ({driver,setDriver,show,setIsOpen}){

  console.log(driver)
    return(
        <Modal 
        show={show}
        onHide={()=>setIsOpen(false)}
        size="lg">
          <Modal.Header closeButton>
          <Modal.Title>
          Driver Details
          </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div style={{display:"flex", justifyContent:"space-around", flexWrap:"wrap"}}>
            <div className="row m-2" style={{width:"300px",margin:'20px'}}>
      <label className="col" style={{fontWeight: "600",}}>
        Name
      </label>
      <span className="col mb-2">{driver.firstName+" "+driver.lastName}</span>
    </div>
    <div className="row m-2" style={{width:"300px",margin:'20px'}}>
      <label className="col" style={{fontWeight: "600",}}>
        Email
      </label>
      <span className="col">{driver.email}</span>
    </div>
    <div className="row m-2" style={{width:"300px",margin:'20px'}}>
      <label className="col" style={{fontWeight: "600",}}>
        Phone
      </label>
      <span className="col">{driver.mobile}</span>
    </div>
    <div className="row m-2" style={{width:"300px",margin:'20px'}}>
      <label className="col" style={{fontWeight: "600",}}>
        DOB
      </label>
      <span className="col">{driver.DOB.slice(0,10)}</span>
    </div>
    <div className="row m-2" style={{width:"300px",margin:'20px'}}>
      <label className="col" style={{fontWeight: "600",}}>
        Country
      </label>
      <span className="col">{driver.country}</span>
    </div>
    <div className="row m-2" style={{width:"300px",margin:'20px'}}>
      <label className="col" style={{fontWeight: "600",}}>
        State
      </label>
      <span className="col">{driver.state}</span>
    </div>
    <div className="row m-2" style={{width:"300px",margin:'20px'}}>
      <label className="col" style={{fontWeight: "600",}}>
        City
      </label>
      <span className="col">{driver.city}</span>
    </div>
    <div className="row m-2" style={{width:"300px",margin:'20px'}}>
      <label className="col" style={{fontWeight: "600",}}>
        pincode
      </label>
      <span className="col">{driver.pincode}</span>
    </div>
    <div className="row m-2" style={{width:"300px",margin:'20px'}}>
      <label className="col" style={{fontWeight: "600",}}>
        Address
      </label>
      <span className="col">{driver.place}</span>
    </div>
    <div className="row m-2" style={{width:"300px",margin:'20px'}}>
      <label className="col" style={{fontWeight: "600",}}>
        Verified
      </label>
      <div className="col">{driver.verified}</div>
      
    </div>
    <div className="row m-2" style={{width:"300px",margin:'20px'}}>
      <label className="col" style={{fontWeight: "600",}}>
        Created By
      </label>
      <span className="col">{driver.createdBy}</span>
    </div>
    <div className="row m-2" style={{width:"300px",margin:'20px'}}>
      <label className="col" style={{fontWeight: "600",}}>
        CreatedAt
      </label>
      <span className="col">{driver.createdAt.slice(0,10)}</span>
    </div>
    <div className="row m-2" style={{width:"300px",margin:'20px'}}>
      <label className="col" style={{fontWeight: "600",}}>
        Modified By
      </label>
      <span className="col">{driver.updatedBy}</span>
    </div>
    <div className="row m-2" style={{width:"300px",margin:'20px'}}>
      <label className="col" style={{fontWeight: "600",}}>
        Updated At
      </label>
      <span className="col">{driver.updatedAt.slice(0,10)}</span>
    </div>
          </div>
          
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={()=>setIsOpen(false)} variant="danger">Close</Button>
          </Modal.Footer>
          
        </Modal>
    )
}