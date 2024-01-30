import { useEffect, useState } from "react";
import Management_container from "../../Common/Management_container";
import Text_Input from "../../Common/Inputs/Text_Input";
import Selection_Input from "../../Common/Inputs/Selection_input";
import BtnDark from "../../Common/Buttons/BtnDark";
import BASE_URL from "../../../config/config";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { Modal, Row } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import ReactSelect from "react-select";
import { useDispatch, useSelector } from "react-redux";
import {
  addSms,
  getSmsTemplate,
  updateSmsTemplate,
} from "../../../Redux/features/smsTemplateReducer";
import { toast } from "react-toastify";

const forUsersOption = [
  { value: "ADMIN", label: "Admin" },
  { value: "DRIVER", label: "Driver" },
  { value: "RIDER", label: "Rider" },
];
const initialTemplate = {
  title: "",
  status: "",
  forUsers: [],
  body: "",
};

export default function AddSmsTemplate() {
  const [template, setTemplate] = useState(initialTemplate);
  const navigate = useNavigate();

  function handleSubmit() {
    fetch(BASE_URL + "/template/sms/", {
      method: "POST",
      body: JSON.stringify({ ...template }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log(data.message);
          navigate(-1);
        } else console.log("error occered");
      })
      .catch((error) => console.log("error", error));
  }

  function handleSelect(e) {
    let arr = e.map((ele) => ele.value);
    setTemplate((preVal) => ({ ...preVal, forUsers: arr }));
  }

  return (
    <Management_container title={"Create Email Template"}>
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
              <form className="w-100">
                <Text_Input
                  input={template}
                  setInput={setTemplate}
                  lebel_text={"Title"}
                  setKey={"title"}
                />
                <label className="ms-3 mb-0">For Users</label>
                <Select
                  className="basic-multi-select m-3"
                  classNamePrefix="select"
                  isMulti
                  options={forUsersOption}
                  onChange={handleSelect}
                />
                <Selection_Input
                  options={["ACTIVE", "INACTIVE"]}
                  input={template}
                  setInput={setTemplate}
                  setKey={"status"}
                  lebel_text={"Status :"}
                />

                <div className="m-3">
                  <label className="form-label">Body</label>
                  <textarea
                    className="form-control"
                    rows={3}
                    onChange={(e) =>
                      setTemplate((preVal) => ({
                        ...preVal,
                        body: e.target.value,
                      }))
                    }
                    type={"text"}
                    placeholder={"sms body ...."}
                    value={template.body}
                  />
                </div>
                <BtnDark handleClick={handleSubmit} title={"Add Template"} />
              </form>
            </div>
          </div>
        </div>
      </div>
    </Management_container>
  );
}

export const AddNew = function ({ show, setShow }) {
  const dispatch = useDispatch();
  const [ready, setReady] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, dirtyFields, isDirty },
  } = useForm();
  const smsTemplate = useSelector(getSmsTemplate);
  useEffect(() => {
    if (ready && smsTemplate) {
      let data = { ...smsTemplate, forUsers: [] };
      smsTemplate.forUsers.forEach(
        (ele, i) => (data.forUsers[i] = { value: ele, label: ele })
      );
      reset(data);
    } else setReady(true);
  }, [ready, smsTemplate]);

  const onSubmit = function (data) {
    data.forUsers = data.forUsers?.map((ele) => ele.value) ?? [];
    if (!smsTemplate) {
      dispatch(addSms(data));
    } else {
      let updatedFields = Object.keys(dirtyFields);
      if (!updatedFields.length) return toast.info("change some field first");
      let updatedData = {};
      updatedFields.forEach((field) => (updatedData[field] = data[field]));

      dispatch(updateSmsTemplate({ id: smsTemplate._id, data: updatedData }));
    }
  };
  return (
    <Modal show={show} size="md" onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Add Sms Template</Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <Row>
            <div className="col-md-3 mb-3">
              <label className="form-label" htmlFor="title">
                Title :
              </label>
            </div>
            <div className="col-md-9 mb-3">
              <input
                {...register("title", {
                  required: "this is required field",
                  minLength: {
                    value: 5,
                    message: "char length should be greater then 5",
                  },
                })}
                className="form-control"
                placeholder="Enter Title"
              />
              {errors.title && (
                <span style={{ color: "red" }}>{errors.title.message}</span>
              )}
            </div>

            <div className="col-md-3 mb-3">
              <label className="form-label" htmlFor="title">
                For Users :
              </label>
            </div>
            <div className="col-md-9 mb-3">
              <Controller
                name="forUsers"
                rules={{ required: "this is required field" }}
                control={control}
                render={({ field }) => (
                  <ReactSelect
                    isMulti
                    {...field}
                    options={[
                      { value: "ADMIN", label: "Admin" },
                      { value: "DRIVER", label: "Driver" },
                      { value: "RIDER", label: "Rider" },
                    ]}
                  />
                )}
              />{" "}
              {errors.forUsers && (
                <span style={{ color: "red" }}>{errors.forUsers.message}</span>
              )}
            </div>

            <div className="col-md-3 mb-3">
              <label className="form-label" htmlFor="status">
                Status :
              </label>
            </div>
            <div className="col-md-9 mb-3">
              <select className="form-control" {...register("status")}>
                <option value={""}>Choose...</option>
                <option value={"ACTIVE"}>Active</option>
                <option value={"INACTIVE"}>Inactive</option>
              </select>
              {errors.status && (
                <span style={{ color: "red" }}>{errors.status.message}</span>
              )}
            </div>

            <div className="col-md-3 mb-3 d-flex align-items-center">
              <label className="form-label" htmlFor="title">
                SMS Body :
              </label>
            </div>
            <div className="col-md-9 mb-3">
              <textarea
                {...register("body", {
                  required: "this is required field",
                  minLength: {
                    value: 10,
                    message: "write at least 10 character",
                  },
                })}
                style={{ width: "100%" }}
                placeholder="SMS Body..."
                rows={3}
              ></textarea>
              {errors.body && (
                <span style={{ color: "red" }}>{errors.body.message}</span>
              )}
            </div>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <div className="text-right">
            <button
              onClick={() => setShow(false)}
              className="btn btn-danger me-3"
            >
              Cancel
            </button>
            <button className="btn btn-primary" type="submit">
              Add
            </button>
          </div>
        </Modal.Footer>
      </form>
    </Modal>
  );
};
