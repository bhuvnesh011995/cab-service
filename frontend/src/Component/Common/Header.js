import { IconContext } from "react-icons";
import { Link } from "react-router-dom";
import dashboardrows from "../../data/dashboardrows";
import { useState } from "react";
import logo from "../../assets/image/logo-main.png"
import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"
import "./Header.css"
import * as BsIcons from "react-icons/bs"



export default function Header({children}) {
  const [sidebar, SetSidebar] = useState(true);

  function showSidebar() {
    SetSidebar(!sidebar);
  }

  return (
    <div className="header">
        <IconContext.Provider value={{ color: '#fff' }}>
            <div className="navbar" >
                <div>
                    <img src={logo} alt="logo" className="img"/>
            <Link to={"#"} >
                (<FaIcons.FaBars onClick={showSidebar} size={24}/>)
            </Link>
                </div><div>
                    <BsIcons.BsPersonGear size={30}/>
                <p>admin</p>
                </div>
            </div>
            
              <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
            <ul className='nav-menu-items'>
                <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {dashboardrows.map((item, index) => {
              return (
                <li key={index} className={'nav-item'}>
                  <Link to={item.to}>
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
            </ul>
            </nav>
            {children}
        </IconContext.Provider>
        
    </div>
  );
}
