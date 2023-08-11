import { Link, useLocation } from "react-router-dom";


export default function SideBarDropDown({ele,i}){
    let {pathname} = useLocation();

    return(
        <li className={pathname === ele.to ? "mm-active" : ""}>
            <Link to={ele.to} className="waves-effect">
                <i className={ele.icon}></i>
                <span>{ele.name}</span>
            </Link>
            </li>
    )
}