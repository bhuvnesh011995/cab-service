import { useEffect, useState } from "react";
import Text_Input from "../../Common/Inputs/Text_Input";
import Management_container from "../../Common/Management_container";
import BtnDark from "../../Common/Buttons/BtnDark";
import BASE_URL from "../../../config/config";
import { useNavigate } from "react-router-dom";
import { Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addPage } from "../../../Redux/features/pageReducer";

const initialState = {
  name: "",
  description: "",
  key: "",
};
let timer;
export default function AddPage() {
  const [page, setPage] = useState(initialState);
  const [succMsg, setSuccMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    return clearTimeout(timer);
  }, []);

  function handleSubmit() {
    fetch(BASE_URL + "/page", {
      method: "POST",
      body: JSON.stringify(page),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setSuccMsg(
            <span style={{ backgroundColor: "lightgreen" }}>
              {data.message}
            </span>
          );
          timer = setTimeout(() => navigate("/pageManagement"), 2000);
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
                <label>
                  Name
                  <input />
                </label>
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
                <label>
                  key
                  <input />
                </label>
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

export const AddNewPage = ({ show, setShow }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    control,
    formState: { errors, dirtyFields, isDirty },
  } = useForm();
  const dispatch = useDispatch();
  function onSubmit(data) {
    dispatch(addPage(data));
  }
  return (
    <Modal size="md" show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Page</Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <Row>
            <div className="col-md-3 mb-3">
              <label className="form-label" htmlFor="name">
                Name :{" "}
              </label>
            </div>
            <div className="col-md-9 mb-3">
              <input
                {...register("name", { required: "this is required field" })}
                className="form-control"
                placeholder="Enter Name"
              />
              {errors.name && (
                <span style={{ color: "red" }}>{errors.name.message}</span>
              )}
            </div>

            <div className="col-md-3 mb-3">
              <label className="form-label" htmlFor="name">
                Meta Description :{" "}
              </label>
            </div>
            <div className="col-md-9 mb-3">
              <textarea
                {...register("metaDescription", {
                  required: "this is required field",
                })}
                className="form-control"
                placeholder="Enter Meta Description ..."
              ></textarea>
              {errors.metaDescription && (
                <span style={{ color: "red" }}>
                  {errors.metaDescription.message}
                </span>
              )}
            </div>

            <div className="col-md-3 mb-3">
              <label className="form-label" htmlFor="name">
                Meta Key :{" "}
              </label>
            </div>
            <div className="col-md-9 mb-3">
              <input
                {...register("metaKey", { required: "this is required field" })}
                className="form-control"
                placeholder="Enter Meta Key"
              />
              {errors.metaKey && (
                <span style={{ color: "red" }}>{errors.metaKey.message}</span>
              )}
            </div>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-danger" onClick={() => setShow(false)}>
            Cancel
          </button>
          <button className="btn btn-primary" type="submit">
            Add Page
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};
