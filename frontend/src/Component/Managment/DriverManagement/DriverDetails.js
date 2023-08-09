import { Modal } from "react-bootstrap";

export default function DriverDetails ({show,setIsOpen}){
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
          <div className="row" style={{ margin: "10px" }}>
      <label className="col" style={{fontWeight: "600",}}>
        Name
      </label><span className="col">
          <span>Bhuvnesh</span>
        </span>
    </div>
          </Modal.Body>
          
        </Modal>
    )
}