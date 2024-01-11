import { useCallback } from "react";
import { Modal } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";

export default function AddNew({ show, setShow }) {
  const {
    handleSubmit,
    register,
    reset,
    watch,
    control,
    formState: { errors, dirtyFields, isDirty },
  } = useForm();
  const onSubmit = useCallback(async (data) => {
    console.log(data);
  }, []);
  return (
    <>
      <Modal size="md" show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Admin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label" htmlFor="name">
                    Name :
                  </label>

                  <input
                    {...register("name")}
                    type="text"
                    className="form-control"
                    placeholder="Enter Name"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label" htmlFor="username">
                    Username :
                  </label>

                  <input
                    {...register("username")}
                    type="text"
                    className="form-control"
                    placeholder="Enter Username"
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label" htmlFor="country">
                    Country :
                  </label>
                  <Controller
                    name="country"
                    control={control}
                    rules={{ required: "this is required field" }}
                    render={({ field }) => (
                      <select {...field} className="form-control">
                        <option value={""}>Choose...</option>
                      </select>
                    )}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label" htmlFor="state">
                    Country :
                  </label>
                  <Controller
                    name="state"
                    control={control}
                    rules={{ required: "this is required field" }}
                    render={({ field }) => (
                      <select {...field} className="form-control">
                        <option value={""}>Choose...</option>
                      </select>
                    )}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label" htmlFor="city">
                    City :
                  </label>
                  <Controller
                    name="city"
                    control={control}
                    rules={{ required: "this is required field" }}
                    render={({ field }) => (
                      <select {...field} className="form-control">
                        <option value={""}>Choose...</option>
                      </select>
                    )}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label" htmlFor="password">
                    Password :
                  </label>

                  <input
                    {...register("password")}
                    type="password"
                    className="form-control"
                    placeholder="Enter Username"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label" htmlFor="password">
                    Status :
                  </label>

                  <select {...register("status")} className="form-control">
                    <option value={""}>Choose...</option>
                    <option value={"ACTIVE"}>Active</option>
                    <option value={"INACTIVE"}>Inactive</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="text-right">
              <button type="submit" className="btn btn-success">
                Add
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
