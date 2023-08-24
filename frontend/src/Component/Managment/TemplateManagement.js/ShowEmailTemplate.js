import React from 'react';
import { Button, Modal } from "react-bootstrap";

const EmailTemplate = ({ template,show,setIsOpen }) => {
  return (
    <Modal 
        show={show}
        onHide={()=>setIsOpen(false)}
        size="lg">
          <Modal.Header closeButton>
          <Modal.Title>
         Email Template
          </Modal.Title>
          </Modal.Header>

          <Modal.Body>
    <div>
    <div className="row">
        <h5 className="col-md-1">Title</h5><span className="col ms-2">{template.title}</span>
        </div>
        <div className="row">
        <h5 className="col-md-1">Subject</h5><span className="col ms-3">{template.subject}</span>
        </div>
        <h5>Template Body</h5>
      <div dangerouslySetInnerHTML={{ __html: template.body }} />
    </div>
    </Modal.Body>
          <Modal.Footer>
            <Button onClick={()=>setIsOpen(false)} variant="danger">Close</Button>
          </Modal.Footer>
          
        </Modal>
  );
};

export default EmailTemplate;