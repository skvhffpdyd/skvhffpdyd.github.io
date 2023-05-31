import React, { useState, useEffect } from "react";
import { Routes,Route } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';
import styled from "styled-components";
import Teams from "./teams";
import Sidebar from "./sidebar";
import RecommendList from "./recommendList"
import InvitedTeamList from "../InvitedTeamList/invitedTeamList";
import TeamMembers from "../TeamMembers/teamMembers";
import UserTeams from "../UserTeams/userTeams";
import ProfilePage from "../../pages/ProfilePage";
import FloatingButton from "./floatingButton";
import "./mypage.css"
import ChatSetting from "../ChatSetting/chatSetting"
const Center = styled.div`
  height: 92vh;
  display: flex;
  flex-direction: row;
`
function MyPage() {
    const isSidebarVisible = useMediaQuery({ maxWidth: 768 });
    return (     
        <div id="mypage"> 
            {!isSidebarVisible && <Sidebar />}
            {isSidebarVisible && <FloatingButton/>}
            <div id="routes">
                <Routes>
                    <Route path="/profile/*" element={<><ChatSetting/><ProfilePage/></>}></Route>
                    <Route path="/team" element={<><ChatSetting/><Teams/></>}></Route>
                    <Route path="/recommend" element={<><ChatSetting/><RecommendList/></>}></Route>
                    <Route path="/invitedTeamList" element={<><ChatSetting/><InvitedTeamList/></>}></Route>
                    <Route path="/teamMembers" element={<><ChatSetting/><TeamMembers/></>}></Route>UserTeams
                    <Route path="/userTeams" element={<><ChatSetting/><UserTeams/></>}></Route>
                </Routes>
            </div>   
        </div>
    );
}

export default MyPage;