import { useEffect, useState } from "react";
import Title from "../Common/Title";
import BASE_URL from "../../config/config";
import Content from "./Content";
import SettingFeilds from "./SettingFeilds";
import BtnDark from "../Common/Buttons/BtnDark";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSettingStatus,
  fetchSetting,
  getSettings,
  settingStatus,
  updateSetting,
} from "../../Redux/features/settingReducer";
import { toast } from "react-toastify";

export default function Setting() {
  const [list, setList] = useState();
  const [updates, setUpdates] = useState({});

  useEffect(() => {
    fetch(BASE_URL + "/setting/", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setList(
            SettingFeilds.map((ele) => {
              return (
                <Content
                  key={ele.value}
                  setUpdates={setUpdates}
                  setKey={ele.value}
                  heading={ele.heading}
                  text={data.settingPage[ele.value]}
                />
              );
            })
          );
        }
      });
  }, []);

  function handleSubmit() {
    fetch(BASE_URL + "/setting/", {
      method: "PUT",
      body: JSON.stringify(updates),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    setList(null);

    fetch(BASE_URL + "/setting/", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setList((preVal) =>
            SettingFeilds.map((ele) => {
              return (
                <Content
                  key={ele.value}
                  setUpdates={setUpdates}
                  setKey={ele.value}
                  heading={ele.heading}
                  text={data.settingPage[ele.value]}
                />
              );
            })
          );
        }
      });
  }

  function handleCancel() {
    fetch(BASE_URL + "/setting/", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setList(
            SettingFeilds.map((ele) => {
              return (
                <Content
                  key={ele.value}
                  setUpdates={setUpdates}
                  setKey={ele.value}
                  heading={ele.heading}
                  text={data.settingPage[ele.value]}
                />
              );
            })
          );
        }
      });
  }

  return (
    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
          <Title title={"Settings"} />

          <div class="card">
            <div class="card-body">
              <div>
                <div className="d-flex flex-wrap">{list || "Loading....."}</div>
                <div className="d-flex justify-content-center">
                  <BtnDark title={"Save"} handleClick={handleSubmit} />
                  <BtnDark title={"cancel"} handleClick={handleCancel} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const Settings = () => {
  const {
    register,
    handleSubmit,
    resetField,
    watch,
    reset,
    formState: { errors, dirtyFields, isDirty },
  } = useForm();
  const [ready, setReady] = useState(false);
  const settings = useSelector(getSettings);
  const dispatch = useDispatch();
  const status = useSelector(settingStatus);
  useEffect(() => {
    if (ready) dispatch(fetchSetting());
  }, [ready]);
  useEffect(() => {
    if (ready && settings) {
      console.log("hi");
      reset(settings);
    } else setReady(true);
  }, [ready, settings]);

  useEffect(() => {
    if (ready && status === "updated") {
      toast.success("setting updated");
      // resetField();
      dispatch(clearSettingStatus());
    }
  }, [ready, status]);

  const onSubmit = (data) => {
    console.log(dirtyFields, "dirty");
    console.log(isDirty, "isdirty");
    const updatedFields = Object.keys(dirtyFields);
    if (!isDirty || !updatedFields.length)
      return toast.info("change some field first");

    let updatedData = {};
    updatedFields.forEach((field) => (updatedData[field] = data[field]));
    dispatch(updateSetting(updatedData));
  };
  return (
    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
          <Title title={"Settings"} />

          <div class="card">
            <div class="card-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  {SettingFeilds.map((field) => (
                    <div className="col-md-6 mb-3">
                      <div className="row">
                        <div className="col-md-4">
                          <label className="form-label">{field.heading}</label>
                        </div>
                        <div className="col-md-7">
                          {/* <label className="form-label">
                        fdsf@gmail.c0m <i className="bi bi-pencil"></i>
                      </label> */}
                          <input
                            {...register(field.value)}
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {isDirty && Object.keys(dirtyFields).length && (
                  <div className="d-flex justify-content-center">
                    <button className="btn btn-primary me-3" type="submit">
                      Update
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        reset(settings);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
