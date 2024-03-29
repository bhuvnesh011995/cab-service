import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../../config/config";
import logo from "../../../assets/image/logo-2.png";
import { authContext } from "../../../Context/AuthContext";
import { useForm } from "react-hook-form";
import { namePattern, passwordPattern } from "../../../Common/validations";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  getError,
  getStatus,
  loggedUser,
  login,
} from "../../../Redux/features/authReducer";

export default function SignIn() {
  // const { setAdmin, admin } = useContext(authContext);
  const navigate = useNavigate();

  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const status = useSelector(getStatus);
  const error = useSelector(getError);
  useEffect(() => {
    if (status === "idle") dispatch(loggedUser());
    else if (status === "success") {
      toast.info("user already loggedin");
      navigate("/");
    } else if (status === "succeeded") {
      toast.success("login successfull");
      navigate("/");
    } else if (status === "error")
      toast.error(error.message || "some error occured");
  }, [status, loggedUser]);

  const loginUser = async (userData) => {
    dispatch(login(userData));
  };

  return (
    // <div  className="card-body m-3 pt-0">
    <div class="my-5 pt-sm-5">
      <div class="container">
        <div class="row justify-content-center">
          <div
            class="col-md-8 col-lg-6 col-xl-5"
            style={{ border: "1px solid gray" }}
          >
            <img src={logo} alt="logo" height="34" />
            <div className="p-2">
              <form
                className="form-horizontal"
                onSubmit={handleSubmit(loginUser)}
              >
                <div className="mb-3">
                  <label for="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter username"
                    {...register("username", {
                      required: "Please Enter Username",
                      pattern: namePattern,
                    })}
                  />
                  {errors?.username && (
                    <span className="text-danger">
                      {errors.username.message}
                    </span>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <div className="input-group auth-pass-inputgroup">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Enter password"
                      {...register("password", {
                        required: "Please Enter password",
                      })}
                    />
                    {errors?.password && (
                      <span className="text-danger">
                        {errors.password.message}
                      </span>
                    )}
                  </div>
                </div>
                <div class="mt-5 d-grid">
                  <button
                    class="btn btn-primary waves-effect waves-light"
                    type="submit"
                  >
                    Log In
                  </button>
                </div>

                <div class="mt-4 text-center">
                  <p
                    onClick={() => navigate("/reset")}
                    style={{ cursor: "pointer" }}
                    class="text-muted"
                  >
                    <i class="mdi mdi-lock me-1"></i> Forgot your password?
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
