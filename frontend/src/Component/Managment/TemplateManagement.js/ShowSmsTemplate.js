import { Button, Modal } from "react-bootstrap";

export default function SmsTemplate({ template,show,setIsOpen }) {
    return (
        <Modal 
            show={show}
            onHide={()=>setIsOpen(false)}
            size="sm">
              <Modal.Header closeButton>
              <Modal.Title>
             Sms Template
              </Modal.Title>
              </Modal.Header>
    
              <Modal.Body>
        <div>
        <div className="row mb-3" >
        <h5 className="col-md-3">Title</h5><span className="col-md-6">{template.title}</span>
        </div>
          <h5 className="text-bold">Template Body</h5>
          <p>{template.body}</p>
        </div>
        </Modal.Body>
              <Modal.Footer>
                <Button onClick={()=>setIsOpen(false)} variant="danger">Close</Button>
              </Modal.Footer>
              
            </Modal>
      );
};
