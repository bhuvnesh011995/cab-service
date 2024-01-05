import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const SideBarDropDown = ({ ele, i }) => {
  const { pathname } = useLocation();
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const handleSubMenuToggle = () => {
    
    setIsSubMenuOpen(!isSubMenuOpen );
    
  };

  const renderSubMenu = (children) => {
    if (!isSubMenuOpen || !children || children.length === 0) return null;

    return (
      <ul className="submenu">
        {children.map((child, index) => (
          <li key={index} className={pathname === child.to ? "mm-active" : ""}>
            <Link to={child.to} className="waves-effect">
              <span>{child.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    );
  };
  function getClass(ele) {
    let classes = "waves-effect";
  
    if (pathname === ele.to) {
      classes += "  mm-active";
    }
      
    if (ele.children ) {
      classes += " has-arrow";
    }
  
    return classes;
  }
  
  return (
    <li className={pathname === ele.to ? "mm-active" : ""}>
      <Link
        to={ele.to}
        className={getClass(ele)}
        onClick={  ele.children ? handleSubMenuToggle : undefined}
      >
        <i className={ele.icon}></i>
        <span>{ele.name}</span>
      </Link>
      {renderSubMenu(ele.children)}
    </li>
  );
};

export default SideBarDropDown;
