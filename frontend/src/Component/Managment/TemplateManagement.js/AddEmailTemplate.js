import { useEffect } from "react";
import JoditEditor from "jodit-react";
import "react-quill/dist/quill.snow.css";
import Select from "react-select";
import { Modal } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  addEmailTemplateReducer,
  emptySelectedEmailTemplate,
  getSelectedEmail,
  getSelectedEmailTemplate,
} from "../../../Redux/features/emailTemplateReducer";

const forUsersOption = [
  { value: "ADMIN", label: "Admin" },
  { value: "DRIVER", label: "Driver" },
  { value: "RIDER", label: "Rider" },
];
const initialTemplate = {
  title: "",
  status: "",
  forUsers: [],
  subject: "",
};
export default function AddEmailTemplate({ show, setShow, viewModal, id }) {
  const dispatch = useDispatch();
  const selectedEmailTemplate = useSelector(getSelectedEmail);
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
    watch,
    control,
  } = useForm();

  useEffect(() => {
    if (id) {
      dispatch(getSelectedEmailTemplate(id));
    }
  }, []);

  useEffect(() => {
    if (selectedEmailTemplate) reset(selectedEmailTemplate);
  }, [selectedEmailTemplate]);

  const handleClose = () => {
    setShow(false);
    dispatch(emptySelectedEmailTemplate());
  };

  const addEmailTemplate = (data) => {
    dispatch(addEmailTemplateReducer(data));
    handleClose();
  };

  return (
    <Modal show={show} size='lg' onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {id ? (viewModal ? "View" : "Update") : "Add"} Email Template
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div
          class='row'
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* <div class='col-lg-6'> */}
          <div class='card'>
            <div class='card-body'>
              <form className='w-100' onSubmit={handleSubmit(addEmailTemplate)}>
                <div className='m-3'>
                  <label className='form-label'>Title</label>
                  <input
                    disabled={viewModal}
                    className='form-control'
                    {...register("title", { required: "Please Enter Title" })}
                    type={"text"}
                    placeholder={"Title"}
                  />
                  {errors?.title && (
                    <span className='text-danger'>{errors?.title.message}</span>
                  )}
                </div>
                <div className='m-3 w-60'>
                  <label className='form-label'>Subject :</label>
                  <input
                    disabled={viewModal}
                    className='form-control'
                    {...register("subject", {
                      required: "Please Enter Subject",
                    })}
                    type={"text"}
                    placeholder={"Enter Subject ..."}
                  />
                  {errors?.subject && (
                    <span className='text-danger'>
                      {errors?.subject.message}
                    </span>
                  )}
                </div>
                <label className='ms-3 mb-0'>For Users</label>
                <Controller
                  name='forUsers'
                  control={control}
                  rules={{ required: "this is required field" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      className='basic-multi-select m-3'
                      classNamePrefix='select'
                      isMulti
                      options={forUsersOption}
                      isDisabled={viewModal}
                    />
                  )}
                />
                <div className='m-3'>
                  <label className='form-label'>Status</label>
                  <select
                    disabled={viewModal}
                    style={{ width: "200px" }}
                    className='form-select'
                    {...register("status")}
                  >
                    <option value=''>select</option>
                    <option value='INACTIVE'>Inactive</option>
                    <option value='ACTIVE'>Active</option>
                  </select>
                </div>
                {/* {viewModal ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: watch("body") }}
                  ></div>
                ) : (
                  )} */}
                <Controller
                  name='body'
                  control={control}
                  rules={{ required: "this is required field" }}
                  render={({ field }) =>
                    viewModal ? (
                      <div
                        dangerouslySetInnerHTML={{ __html: watch("body") }}
                      ></div>
                    ) : (
                      <JoditEditor {...field} />
                    )
                  }
                />
                <Modal.Footer>
                  {!viewModal && (
                    <button
                      type='submit'
                      className='btn me-3 btn-outline-primary waves-effect waves-light'
                    >
                      {id ? "Update" : "Add"} Template
                    </button>
                  )}
                  <button
                    onClick={handleClose}
                    type='button'
                    className='btn me-3 btn-outline-danger waves-effect waves-light'
                  >
                    cancel
                  </button>
                </Modal.Footer>
              </form>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
