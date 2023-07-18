import { Link } from "react-router-dom";

export default function Wraper({ children,loginpage=false }) {
    let year = new Date().getFullYear()
    let go;
    !loginpage?go="/signUp":go="/signIn"
  return (
    <div class="account-pages my-5 pt-sm-5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-8 col-lg-6 col-xl-5">
            <div class="card overflow-hidden">{children}</div>
            <div class="mt-5 text-center">
              <div>
                <p>
                  Don't have an account ?{" "}
                  <Link to={go} class="fw-medium text-primary">
                    {" "}
                    {!loginpage?"Signup now":"Login"}{" "}
                  </Link>{" "}
                </p>
                <p>
                  © {year}{" "}
                  Skote. Crafted with <i class="mdi mdi-heart text-danger"></i>{" "}
                  by Themesbrand
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
