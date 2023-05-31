import React from "react";
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import "./find.css";
import RecommendUsers from "./recommendUsers";
import RecommendTeams from "./recommendTeams";

function Find() {
  const navigate = useNavigate();
  const location = useLocation();
  //console.log(location.state);
  const [selectedTeamBtn, setSelectedTeamBtn] = useState(true);
  const [selectedUserBtn, setSelectedUserBtn] = useState(false);
  const clickTeam = () => {
    setSelectedTeamBtn(true);
    setSelectedUserBtn(false);
    navigate("/find/recommend/team");
  };
  const clickUser = () => {
    setSelectedTeamBtn(false);
    setSelectedUserBtn(true);
    navigate("/find/recommend/user");
  };

  useEffect(() => {
    if (location.state !== null) {
      setSelectedTeamBtn(location.state?.team);
      setSelectedUserBtn(location.state?.user);
    }
  }, [location.state]);

  return (
    <>
      <div className="rc-group">
        <div className={selectedTeamBtn ? "rc-team selected" : "rc-team shadow"} onClick={clickTeam}>
          팀 추천
        </div>
        <div className={selectedUserBtn ? "rc-user selected" : "rc-user shadow"} onClick={clickUser}>
          유저 추천
        </div>
      </div>
      <div className="find">
        <Routes>
          <Route path="team" element={<RecommendTeams />}></Route>
          <Route path="user" element={<RecommendUsers />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default Find;
