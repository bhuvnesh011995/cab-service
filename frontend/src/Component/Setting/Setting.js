import { useEffect, useState } from "react";
import Title from "../Common/Title";
import BASE_URL from "../../config/config";
import Content from "./Content";
import SettingFeilds from "./SettingFeilds";
import BtnDark from "../Common/Buttons/BtnDark";

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

  function handleSubmit(){
    fetch(BASE_URL + "/setting/",{
        method:"PUT",
        body:JSON.stringify(updates),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
    })

    setList(null)

    fetch(BASE_URL + "/setting/", {
        method: "GET",
      }).then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setList(preVal=>(
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
              }))
            );
          }
        })
  }

  function handleCancel(){
    fetch(BASE_URL + "/setting/", {
        method: "GET",
      }).then((res) => res.json())
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
          <div class="row">
            <div class="col-lg-13">
              <div class="card">
                <div class="card-body">
                  <div>
                    <div className="d-flex flex-wrap">
                      {list || "Loading....."}
                    </div>
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
      </div>
    </div>
  );
}
