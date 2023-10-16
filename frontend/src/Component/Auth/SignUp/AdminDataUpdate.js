import { useState } from "react";
import Wraper from "../common/wrapper";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../../config/config";
import logo from "../../../assets/image/logo-2.png";
import { useLocation } from "react-router-dom";


export default function AdminDataUpdate() {
  const location = useLocation();
  const p = location.state.admin;
    const [user, setUser] = useState(p);
  const navigate = useNavigate();
  const [successMsg, setSuccessMsg] = useState("");
  let url = BASE_URL + "/auth/update/" + user.id;

  function handleSubmit(e) {
    console.log("data",e)
    e.preventDefault();
    const newdata = {
      name: user.name,
      email: user.email,
      username: user.username,
      password: user.password,
      status: user.status,
    };

    fetch(url, {
      method: "PUT",
      body: JSON.stringify({id:user.id,newdata }),
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
             Update Successfull
            </div>
          );

          setTimeout(() => {
            navigate("/login");
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
    setUser(p);
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  

  return (
    <Wraper loginpage={true}>
      <div className="card-body m-3 pt-0">
        <img src={logo} alt="logo" height="34" />
        <div className="p-2">
        <form className="needs-validation" onSubmit={(e) => handleSubmit(e)}>
                    <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder="Enter Name"
                required
                value={user.name}
                onChange={handleInputChange}
              />
              <div className="invalid-feedback">Please Enter Name</div>
            </div>

            <div className="mb-3">
              <label htmlFor="useremail" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="useremail"
                name="email"
                placeholder="Enter email"
                required
                value={user.email}
                onChange={handleInputChange}
              />
              <div className="invalid-feedback">Please Enter Email</div>
            </div>

            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                placeholder="Enter username"
                required
                value={user.username}
                onChange={handleInputChange}
              />
              <div className="invalid-feedback">Please Enter Username</div>
            </div>

            <div className="mb-3">
              <label htmlFor="userpassword" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="userpassword"
                name="password"
                placeholder="Enter password"
                required
                value={user.password}
                onChange={handleInputChange}
              />
              <div className="invalid-feedback">Please Enter Password</div>
            </div>
            <label>Status: </label>
            <select
              name="status"
              value={user.status}
              onChange={handleInputChange}
            >
              <option value="INACTIVE">Inactive</option>
              <option value="ACTIVE">Active</option>
            </select>

            <div className="mt-4 d-grid">
              <button
                className="btn btn-primary waves-effect waves-light"
                type="submit"
              >
                Update Admin
              </button>
            </div>
          </form>
          {successMsg && <div className="mt-3">{successMsg}</div>}
        </div>
      </div>
    </Wraper>
  );
}
