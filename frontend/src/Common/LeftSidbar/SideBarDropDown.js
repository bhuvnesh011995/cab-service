import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
let previousMenu = "",
  nextMenu = "",
  onListElement = "out";
const SideBarDropDown = ({ ele, i }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (ele?.children?.listArray)
      ele.children.listArray.map(
        (path) => `/${path.to}` == pathname && handleSubMenuToggle(ele),
      );
  }, []);

  const handleSubMenuToggle = (ele) => {
    if (previousMenu == ele.id) {
      previousMenu = "";
    }
    if (nextMenu != ele.id) {
      if (previousMenu.length) closePreviousMenu();
      previousMenu = ele.id;
      nextMenu = ele.id;
    }
    ele.children.isOpen = !ele.children.isOpen;
  };

  const closePreviousMenu = () => {
    const previousElement = document.getElementById(previousMenu);
    if (previousElement) {
      previousElement.click();
    }
  };

  const renderSubMenu = (children) => {
    if (!children?.isOpen || !children || children?.listArray.length === 0)
      return null;
    return (
      <ul className='submenu'>
        {children?.listArray.map((child, index) => (
          <li
            key={index}
            onMouseOver={() => (onListElement = "over")}
            onMouseOut={() => (onListElement = "out")}
            className={pathname === `/${child.to}` ? "mm-active" : ""}
          >
            <Link to={child.to} className='waves-effect'>
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

    if (ele.children?.listArray) {
      classes += " has-arrow";
    }

    return classes;
  }

  return (
    <li
      className={
        pathname === `/${ele.to}` || ele.id == nextMenu ? "mm-active" : ""
      }
      id={ele.id}
      onClick={() => {
        if (ele.children?.listArray) {
          if (onListElement == "out") handleSubMenuToggle(ele);
        } else {
          closePreviousMenu();
          nextMenu = "";
          previousMenu = "";
        }
      }}
    >
      <Link to={ele.to} className={getClass(ele)}>
        <i className={ele.icon}></i>
        <span>{ele.name}</span>
      </Link>
      {renderSubMenu(ele.children)}
    </li>
  );
};

export default SideBarDropDown;
