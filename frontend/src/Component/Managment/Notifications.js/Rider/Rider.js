import { useState } from "react";
import Management_container from "../../../Common/Management_container";

export default function RiderNotification() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Management_container title={"Notification To Rider"}>
      <div class="row">
        <div class="col-lg-12">
          <div class="card">
            <div class="card-body">
              <div className="text-right">
                <button
                  className="btn btn-primary"
                  onClick={() => setIsOpen(true)}
                >
                  Add New
                </button>
                <div className="d-flex justify-content-center row">
                  <div className="col-md-2">
                    <label className="form-label">Title</label>
                    <input className="form-control" />{" "}
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Status</label>
                    <select>
                      <option>Choose...</option>
                      <option value={"ACTIVE"}>Active</option>
                      <option value={"INACTIVE"}>Inactive</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Management_container>
  );
}
