import { useState } from "react";
import Header from "../common/Header";
import Wraper from "../common/wrapper";
import { useNavigate } from "react-router-dom";

let url = "http://localhost:8080/test/api/v1/auth/signUp";
let initState = {
  name: null,
  username: null,
  email: null,
  password: null,
  status:"INACTIVE"
};

export default function SignUp() {
  let [user, setUser] = useState(initState);
  const navigate = useNavigate();

  let [successMsg, setSuccessMsg] = useState();
  function handleSubmit(e) {
    e.preventDefault();
    fetch(url, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
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
              SignUp Successfull
            </div>
          );

          setTimeout(() => {
            navigate("/signIn");
          }, 2000);
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
      .catch((e) => console.log(e));
    setUser(initState);
  }

  return (
    <Wraper loginpage={true}>
      <Header
        heading={{
          title: "Welcome Back !",
          dec: "Sign in to continue to Skote.",
        }}
      />
      <div className="card-body pt-0">
        <div className="auth-logo">
          <a href="index.html" className="auth-logo-light">
            <div className="avatar-md profile-user-wid mb-4">
              <span className="avatar-title rounded-circle bg-light">
                <img
                  src="assets/images/logo-light.svg"
                  alt=""
                  className="rounded-circle"
                  height="34"
                />
              </span>
            </div>
          </a>
        </div>
        <div className="p-2">
          <form className="needs-validation" onSubmit={(e) => handleSubmit(e)}>
            <div className="mb-3">
              <label for="useremail" class="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter Name"
                required
                value={user.name}
                onChange={(e) =>
                  setUser((preVal) => ({ ...preVal, name: e.target.value }))
                }
              />
              <div className="invalid-feedback">Please Enter Name</div>
            </div>

            <div className="mb-3">
              <label for="useremail" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="useremail"
                placeholder="Enter email"
                required
                value={user.email}
                onChange={(e) =>
                  setUser((preVal) => ({ ...preVal, email: e.target.value }))
                }
              />
              <div className="invalid-feedback">Please Enter Email</div>
            </div>

            <div className="mb-3">
              <label for="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Enter username"
                required
                value={user.username}
                onChange={(e) =>
                  setUser((preVal) => ({ ...preVal, username: e.target.value }))
                }
              />
              <div className="invalid-feedback">Please Enter Username</div>
            </div>

            <div className="mb-3">
              <label for="userpassword" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="userpassword"
                placeholder="Enter password"
                required
                value={user.password}
                onChange={(e) =>
                  setUser((preVal) => ({ ...preVal, password: e.target.value }))
                }
              />
              <div className="invalid-feedback">Please Enter Password</div>
            </div>
            <lebel>Status: </lebel>
            <select 
            name="selectedStatus" 
            defaultValue={user.status}
            onChange={e=>{setUser(preVal=>({...preVal,status:e.target.value}))}}
            >
                <option value="INACTIVE">Inactive</option>
                <option value="ACTIVE">Active</option>
            </select>

            <div className="mt-4 d-grid">
              <button
                className="btn btn-primary waves-effect waves-light"
                type="submit"
              >
               Add Admin
              </button>
              {successMsg}
            </div>

            <div className="mt-4 text-center">
              <h5 className="font-size-14 mb-3">Sign up using</h5>

              <ul className="list-inline">
                <li className="list-inline-item">
                  <a
                    href="javascript::void()"
                    className="social-list-item bg-primary text-white border-primary"
                  >
                    <i className="mdi mdi-facebook"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a
                    href="javascript::void()"
                    className="social-list-item bg-info text-white border-info"
                  >
                    <i className="mdi mdi-twitter"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a
                    href="javascript::void()"
                    className="social-list-item bg-danger text-white border-danger"
                  >
                    <i className="mdi mdi-google"></i>
                  </a>
                </li>
              </ul>
            </div>

            <div className="mt-4 text-center">
              <p className="mb-0">
                By registering you agree to the Skote{" "}
                <a href="#" className="text-primary">
                  Terms of Use
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </Wraper>
  );
}
