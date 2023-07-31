import { useState } from "react";
import Wraper from "../common/wrapper";
import Header from "../common/Header";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../../config/config";
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
      <Header
        heading={{
          title: "Change Password With Ease",
          dec: "enjoying with skote service ? rate us now",
        }}
      />
      <div class="card-body pt-0">
        <div class="auth-logo">
          <a href="index.html" class="auth-logo-light">
            <div class="avatar-md profile-user-wid mb-4">
              <span class="avatar-title rounded-circle bg-light">
                <img
                  src="assets/images/logo-light.svg"
                  alt=""
                  class="rounded-circle"
                  height="34"
                />
              </span>
            </div>
          </a>

          <a href="index.html" class="auth-logo-dark">
            <div class="avatar-md profile-user-wid mb-4">
              <span class="avatar-title rounded-circle bg-light">
                <img
                  src="assets/images/logo.svg"
                  alt=""
                  class="rounded-circle"
                  height="34"
                />
              </span>
            </div>
          </a>
        </div>
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
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                id="remember-check"
              />
              <label class="form-check-label" for="remember-check">
                Remember me
              </label>
            </div>

            <div class="mt-3 d-grid">
              <button
                class="btn btn-primary waves-effect waves-light"
                type="submit"
              >
                Change Password
              </button>
              {successMsg}
            </div>

            <div class="mt-4 text-center">
              <h5 class="font-size-14 mb-3">Sign in with</h5>

              <ul class="list-inline">
                <li class="list-inline-item">
                  <a
                    href="javascript::void()"
                    class="social-list-item bg-primary text-white border-primary"
                  >
                    <i class="mdi mdi-facebook"></i>
                  </a>
                </li>
                <li class="list-inline-item">
                  <a
                    href="javascript::void()"
                    class="social-list-item bg-info text-white border-info"
                  >
                    <i class="mdi mdi-twitter"></i>
                  </a>
                </li>
                <li class="list-inline-item">
                  <a
                    href="javascript::void()"
                    class="social-list-item bg-danger text-white border-danger"
                  >
                    <i class="mdi mdi-google"></i>
                  </a>
                </li>
              </ul>
            </div>
          </form>
        </div>
      </div>
    </Wraper>
  );
}
