import { useState } from "react";
import Header from "../common/Header";
import Wraper from "../common/wrapper";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../../config/config";

let url = BASE_URL+"/auth/signIn";

export default function SignIn() {
  const [userData, setUserData] = useState({
    username: null,
    password: null,
  });
  const navigate = useNavigate();
  let [successMsg, setSuccessMsg] = useState();

  function handleSubmit(e) {
    e.preventDefault();

    fetch(url, {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("user", JSON.stringify(data));
        if (data.success) {
          setTimeout(() => {
            navigate("/");
          }, 2000);
          setSuccessMsg(
            <div
              style={{
                backgroundColor: "lightgreen",
                textAlign: "center",
                marginTop: "5px",
                padding: "10px",
              }}
            >
              login successful
            </div>
          );
        }
        else{
          setSuccessMsg(
            <div
              style={{
                backgroundColor: "red",
                textAlign: "center",
                marginTop: "5px",
                padding: "10px",
              }}
            >
             { data.message}
            </div>
          );
        }
      })
      .catch((e) => console.log(e));

    setUserData({
      username: null,
      password: null,
    });
  }

  return (
    <Wraper>
      <Header
        heading={{
          title: "Free Register",
          dec: "Get your free Skote account now.",
        }}
      />
      <div className="card-body pt-0">
        <div className="auth-logo">
          
            <div onClick={e=>navigate("/")} className="avatar-md profile-user-wid mb-4">
              <span className="avatar-title rounded-circle bg-light">
                <img
                  src="assets/images/logo-light.svg"
                  alt=""
                  className="rounded-circle"
                  height="34"
                />
              </span>
            </div>

        
            <div onClick={e=>navigate("/")} className="avatar-md profile-user-wid mb-4">
              <span className="avatar-title rounded-circle bg-light">
                <img
                  src="assets/images/logo.svg"
                  alt=""
                  className="rounded-circle"
                  height="34"
                />
              </span>
            </div>
        </div>
        <div className="p-2">
          <form className="form-horizontal" onSubmit={(e) => handleSubmit(e)}>
            <div className="mb-3">
              <label for="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
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

            <div className="mb-3">
              <label className="form-label">Password</label>
              <div className="input-group auth-pass-inputgroup">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  aria-label="Password"
                  aria-describedby="password-addon"
                  value={userData.password}
                  onChange={(e) =>
                    setUserData((preVal) => ({
                      ...preVal,
                      password: e.target.value,
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
                Log In
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

            <div class="mt-4 text-center">
              <a
                onClick={() => navigate("/resetPass")}
                style={{ cursor: "pointer" }}
                class="text-muted"
              >
                <i class="mdi mdi-lock me-1"></i> Forgot your password?
              </a>
            </div>
          </form>
        </div>
      </div>
    </Wraper>
  );
}
