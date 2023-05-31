import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import SidebarItem from "./sidebarItem";
import "./sidebar.css"

const Menu = styled.div`
  width: 100px;
`
const email = localStorage.getItem("email");

function Sidebar() {
  const menus = [
    { name: "프로필", path: `/mypage/profile/${localStorage.getItem("email")}` },
    { name: "멤버 관리", path: "/mypage/teamMembers"},
    { name: "팀 관리", path: "/mypage/userTeams"},
  ];
  return (    
    <div className="side">
      <div className="sidebar">
        <div id="sidebar_main">
          <p>마이페이지</p>
        </div>
      <Menu>
        {menus.map((menu, index) => {
          return (
            <NavLink             
              style={{color: "gray", textDecoration: "none"}}
              to={menu.path}
              key={index}              
            >
              <SidebarItem menu={menu} />
             
            </NavLink>
          );
        })}
         <div className="name-tag">{localStorage.getItem("nickname")}</div>
      </Menu>
      </div>
    </div>    
  );
}

export default Sidebar;