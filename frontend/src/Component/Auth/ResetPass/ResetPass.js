import { useState } from "react";
import Wraper from "../common/wrapper";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../../config/config";
import logo from "../../../assets/image/logo-2.png"
let initialData = {
  username: null,
  currentPassword: null,
  newPass: null,
  confirmpass: null,
};
let url = BASE_URL+"/auth/reset/";

export default function ResetPass() {
  const [userData, setUserData] = useState(initialData);
  const [passMisMatchMsg, setMissMatch] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  function confirmPass() {
    return userData.newPass === userData.confirmpass;
  }
  function handleSubmit(e) {
    e.preventDefault();

    if (!confirmPass())
      return setMissMatch("The Password Confirmation does not match");
    else {
      fetch(url + userData.username, {
        method: "POST",
        body: JSON.stringify({
          password: userData.currentPassword,
          newPassword: userData.newPass,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setSuccessMsg(
              <div
                style={{
                  backgroundColor: "lightgreen",
                  textAlign: "center",
                  marginTop: "5px",
                  padding: "10px",
                }}
              >
                Password change successful
              </div>
            );
            setTimeout(() => {
              navigate("/signIn");
            }, 3000);
          }else{
            setSuccessMsg(
                <div
                  style={{
                    backgroundColor: "red",
                    textAlign: "center",
                    marginTop: "5px",
                    padding: "10px",
                  }}
                >
                  {data.message}
                </div>
              );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <Wraper>
      <div className="card-body m-3 pt-0">
                <img
                  src={logo}
                  alt="logo"
                  height="34"
                />
        <div class="p-2">
          <form class="form-horizontal" onSubmit={(e) => handleSubmit(e)}>
            <div class="mb-3">
              <label for="username" class="form-label">
                Username
              </label>
              <input
                type="text"
                class="form-control"
                id="username"
                placeholder="Enter username"
                value={userData.username}
                onChange={(e) =>
                  setUserData((preVal) => ({
                    ...preVal,
                    username: e.target.value,
                  }))
                }
              />
            </div>
            <div class="mb-3">
              <label class="form-label">Current Password</label>
              <div class="input-group auth-pass-inputgroup">
                <input
                  type="password"
                  class="form-control"
                  placeholder="Enter password"
                  aria-label="Password"
                  aria-describedby="password-addon"
                  value={userData.currentPassword}
                  onChange={(e) =>
                    setUserData((preVal) => ({
                      ...preVal,
                      currentPassword: e.target.value,
                    }))
                  }
                />
                <button
                  class="btn btn-light "
                  type="button"
                  id="password-addon"
                >
                  <i class="mdi mdi-eye-outline"></i>
                </button>
              </div>
            </div>
            <div class="mb-3">
              <label class="form-label">Enter New Password</label>
              <div class="input-group auth-pass-inputgroup">
                <input
                  type="password"
                  class="form-control"
                  placeholder="Enter password"
                  aria-label="Password"
                  aria-describedby="password-addon"
                  value={userData.newPass}
                  onChange={(e) =>
                    setUserData((preVal) => ({
                      ...preVal,
                      newPass: e.target.value,
                    }))
                  }
                />
                <button
                  class="btn btn-light "
                  type="button"
                  id="password-addon"
                >
                  <i class="mdi mdi-eye-outline"></i>
                </button>
              </div>
            </div>

            <div class="mb-3">
              <label class="form-label">Confirm Password</label>
              <div class="input-group auth-pass-inputgroup">
                <input
                  type="password"
                  class="form-control"
                  placeholder="Enter password"
                  aria-label="Password"
                  aria-describedby="password-addon"
                  value={userData.confirmpass}
                  onChange={(e) =>
                    setUserData((preVal) => ({
                      ...preVal,
                      confirmpass: e.target.value,
                    }))
                  }
                />
                <button
                  class="btn btn-light "
                  type="button"
                  id="password-addon"
                >
                  <i className="mdi mdi-eye-outline"></i>
                </button>
              </div>
            </div>
            <span style={{ color: "red" }}>{passMisMatchMsg}</span>

            <div class="mt-3 d-grid">
              <button
                class="btn btn-primary waves-effect waves-light"
                type="submit"
              >
                Change Password
              </button>
              {successMsg}
            </div>
          </form>
        </div>
      </div>
    </Wraper>
  );
}
