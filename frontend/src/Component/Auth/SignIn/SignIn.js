import { useContext, useState } from "react";
import Wraper from "../common/wrapper";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../../config/config";
import logo from "../../../assets/image/logo-2.png"
import { authContext } from "../../../Context/AuthContext";

let url = BASE_URL+"/auth/signIn";

export default function SignIn() {
  const [userData, setUserData] = useState({
    username: null,
    password: null,
  });
  const {setAdmin} = useContext(authContext)
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
        if (data.success) {
          setAdmin({
            name:data.name,
            email:data.email,
            username:data.username,
            token:data.token
          })
          navigate("/")
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
  }

  return (
    <Wraper>
      <div className="card-body m-3 pt-0">
                <img
                  src={logo}
                  alt="logo"
                  height="34"
                />
        <div className="p-2">
          <form className="form-horizontal" onSubmit={(e) => handleSubmit(e)}>
            <div className="mb-3">
              <label for="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter username"
                value={userData.username}
                onChange={(e) =>{setSuccessMsg(null)
                  setUserData((preVal) => ({
                    ...preVal,
                    username: e.target.value,
                  }))}
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
                  value={userData.password}
                  onChange={(e) =>{setSuccessMsg(null)
                    setUserData((preVal) => ({
                      ...preVal,
                      password: e.target.value,
                    }))}
                  }
                />
              </div>
            </div>
            <div class="mt-5 d-grid">
              <button
                class="btn btn-primary waves-effect waves-light"
                type="submit"
              >
                Log In
              </button>
              {successMsg}
            </div>

            <div class="mt-4 text-center">
              <a
                onClick={() => navigate("/reset")}
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
