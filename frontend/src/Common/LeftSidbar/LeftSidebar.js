import { Link, NavLink, useLocation } from "react-router-dom";
import dashboardrows from "../../data/dashboardrows";
import SideBarDropDown from "./SideBarDropDown";

export default function LeftSidebar(){
    
    let list = dashboardrows.map((ele,i)=>{
        return(
            <SideBarDropDown ele={ele} i={i} />
        )
    })
    return(
        <div className="vertical-menu">

                <div data-simplebar className="h-100">

                    {/* <!--- Sidemenu --> */}
                    <div id="sidebar-menu">
                        {/* <!-- Left Menu Start --> */}
                        <ul className="metismenu list-unstyled" id="side-menu">

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
    )
}