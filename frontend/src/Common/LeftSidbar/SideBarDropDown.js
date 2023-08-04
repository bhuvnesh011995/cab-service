import { useState } from "react"
import { Link, NavLink, useLocation } from "react-router-dom";


export default function SideBarDropDown({ele,i}){
    let {pathname} = useLocation();

    const [dropDown,SetDropDown] = useState(false);
    return(
        <li className={pathname === ele.to ? "mm-active" : ""}>
            <Link to={ele.to} className="waves-effect">
                <i className={ele.icon}></i>
                <span key="t-dashboards">{ele.name}</span>
                <i onClick={()=>SetDropDown(!dropDown)} class="bi bi-arrow-down"></i>
            </Link>
            {dropDown && <ul class="sub-menu">
                <li><a href="#" key="t-default">Default</a></li>
                <li><a href="#" key="t-saas">Saas</a></li>
                <li><a href="#" key="t-crypto">Crypto</a></li>
                <li><a href="#" key="t-blog">Blog</a></li>
            </ul>}
            </li>
    )
}