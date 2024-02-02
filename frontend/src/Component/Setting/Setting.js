import { useEffect, useState } from "react";
import Title from "../Common/Title";
import BASE_URL from "../../config/config";
import Content from "./Content";
import SettingFeilds from "./SettingFeilds";
import BtnDark from "../Common/Buttons/BtnDark";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchSetting, getSettings } from "../../Redux/features/settingReducer";

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
    watch,
    reset,
    formState: { errors, dirtyFields, isDirty },
  } = useForm();
  const [ready, setReady] = useState(false);
  const settings = useSelector(getSettings);
  const dispatch = useDispatch();

  useEffect(() => {
    if (ready) dispatch(fetchSetting());
  }, [ready]);
  useEffect(() => {
    if (ready && settings) reset(settings);
    else setReady(true);
  }, [ready, settings]);

  const onSubmit = (data) => {
    console.log(data, "data");
    console.log(isDirty, "isdirty");
    console.log(dirtyFields, "dirtyfields");
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

                {isDirty && (
                  <div className="d-flex justify-content-center">
                    <button className="btn btn-primary" type="submit">
                      Save
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
