import { Link, NavLink, useLocation } from "react-router-dom";
import dashboardrows from "../../data/dashboardrows";
import SideBarDropDown from "./SideBarDropDown";
import { authContext } from "../../Context/AuthContext";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { getPermissions } from "../../Redux/features/authReducer";

export default function LeftSidebar() {
  let list;
  // const {admin}=useContext(authContext)
  //  console.log('pppppp',permissions)
  const permissions = useSelector(getPermissions);
  list = dashboardrows.map((ele, i) => <SideBarDropDown ele={ele} key={i} />);

  return (
    <div className='vertical-menu'>
      <div data-simplebar className='h-100'>
        {/* <!--- Sidemenu --> */}
        <div id='sidebar-menu'>
          {/* <!-- Left Menu Start --> */}
          <ul className='metismenu list-unstyled' id='side-menu'>
            {/* <li>
                                <Link to="/dashboard" className="waves-effect">
                                    <i className="bi bi-house"></i>
                                    <span key="t-dashboards">Dashboards</span>
                                </Link>
                            </li>*/}

            {/* <li>
                                <a href="javascript: void(0);" className="waves-effect">
                                    <i className="bi bi-person"></i>
                                    <span key="t-dashboards">Admin User Management</span>
                                </a>
                            </li>
                            <li>
                                <a href="javascript: void(0);" className="waves-effect">
                                    <i class="bi bi-ev-front"></i>
                                    <span key="t-dashboards">Make Management</span>
                                </a>
                            </li>  */}
            {list}
          </ul>
        </div>
        {/* <!-- Sidebar --> */}
      </div>
    </div>
  );
}
