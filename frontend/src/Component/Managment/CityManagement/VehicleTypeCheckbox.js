import { useState } from "react";
import { Row } from "react-bootstrap";

export default function VehicletypeCheckbox() {
  return (
    <Row className="mb-3">
      <div className=" col-md-3">
        <div className="text-center form-check">
          <input type="checkbox" className="form-check-input" />
          <label className="form-check-label">sedan</label>
        </div>
      </div>
      <div className=" col-md-9">
        <div className="d-flex justify-content-center">
          <div className=" form-check d-flex align-items-center me-2">
            <input type="checkbox" className="form-check-input" />
            <label className="form-check-label">Indvidual</label>
          </div>
          <div className=" form-check d-flex align-items-center me-2">
            <input type="checkbox" className="form-check-input " />
            <label className="form-check-label">Rental</label>
          </div>
          <div className=" form-check d-flex align-items-center me-2">
            <input type="checkbox" className="form-check-input" />
            <label className="form-check-label">Outstation</label>
          </div>
        </div>
      </div>
    </Row>
  );
}
