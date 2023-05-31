import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from "react-router-dom";
import "./floatingButton.css"

function FloatingButton() {
  const [isOpen1, setIsOpen1] = useState(false);
  const menuRef = useRef(null);

  const handleMenuClick = (boxNumber) => {
    if (boxNumber === 1) {
      setIsOpen1(!isOpen1);
    }
  };

  const closeMenu = () => {
    setIsOpen1(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const menus = [
    { name: "프로필", path: `/mypage/profile/${localStorage.getItem("email")}` },
    { name: "멤버 관리", path: "/mypage/teamMembers"},
    { name: "팀 관리", path: "/mypage/userTeams"},
  ];
  
  return (
      <div className={`box ${isOpen1 ? 'click' : ''}`}>
        <div className="menu" ref={menuRef}>
          <div className={`menu-round-box ${isOpen1 ? 'open' : ''}`}>
            <ul>
              {menus.map((menu, index) => (
                <li key={index}>
                  <NavLink to={menu.path} activeClassName="active" exact>
                    {menu.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <button className="menu-btn" onClick={() => handleMenuClick(1)}>
            메뉴
          </button>
        </div>
      </div>
  );
}
export default FloatingButton;