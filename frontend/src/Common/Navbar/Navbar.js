import { useContext, useEffect } from "react";
import { authContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar({ inactive, setInactive }) {
  useEffect(() => {
    if (inactive) {
      document.body.classList.add("sidebar-enable", "vertical-collpsed");
    } else {
      document.body.classList.remove("sidebar-enable", "vertical-collpsed");
    }
  }, [inactive]);

  const navigate = useNavigate();

  const { admin, setAdmin, initialAdmin } = useContext(authContext);

  useEffect(() => {
    if (!admin.token && !localStorage.getItem("token")) navigate("/login");
  }, [admin]);

  return (
    <header id='page-topbar'>
      <div className='navbar-header'>
        <div className='d-flex'>
          {/* <!-- LOGO --> */}
          <div className='navbar-brand-box'>
            <p className='logo logo-light'>
              {inactive ? (
                <span className='logo-sm'>
                  <img src='assets/images/logo-light.svg' alt='' height='22' />
                </span>
              ) : (
                <span className='logo-lg'>
                  <img src='assets/images/logo-light.png' alt='' height='19' />
                </span>
              )}
            </p>
          </div>

          <button
            onClick={() => setInactive(!inactive)}
            type='button'
            className='btn btn-sm px-3 font-size-16 header-item waves-effect'
          >
            <i className='fa fa-fw fa-bars'></i>
          </button>
        </div>

        <div className='d-flex'>
          <div className='dropdown d-inline-block'>
            <button
              type='button'
              className='btn header-item waves-effect'
              id='page-header-user-dropdown'
              data-bs-toggle='dropdown'
              aria-haspopup='true'
              aria-expanded='false'
            >
              <img
                className='rounded-circle header-profile-user'
                src='assets/images/users/avatar-1.jpg'
                alt='Header Avatar'
              />
              <span className='d-none d-xl-inline-block ms-1' key='t-henry'>
                {admin.name}
              </span>
              <i className='mdi mdi-chevron-down d-none d-xl-inline-block'></i>
            </button>
            <div className='dropdown-menu dropdown-menu-end'>
              {/* <!-- item--> */}
              <p className='dropdown-item'>
                <i className='bx bx-user font-size-16 align-middle me-1'></i>{" "}
                <span key='t-profile'>Profile</span>
              </p>
              <p className='dropdown-item'>
                <i className='bx bx-wallet font-size-16 align-middle me-1'></i>{" "}
                <span key='t-my-wallet'>My Wallet</span>
              </p>
              <p className='dropdown-item d-block'>
                <span className='badge bg-success float-end'>11</span>
                <i className='bx bx-wrench font-size-16 align-middle me-1'></i>{" "}
                <span key='t-settings'>Settings</span>
              </p>
              <p className='dropdown-item'>
                <i className='bx bx-lock-open font-size-16 align-middle me-1'></i>{" "}
                <span key='t-lock-screen'>Lock screen</span>
              </p>
              <div className='dropdown-divider'></div>
              <p
                onClick={() => {
                  setAdmin(initialAdmin);
                  localStorage.removeItem("token");
                }}
                className='dropdown-item text-danger'
              >
                <i className='bx bx-power-off font-size-16 align-middle me-1 text-danger'></i>{" "}
                <span key='t-logout'>Logout</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
