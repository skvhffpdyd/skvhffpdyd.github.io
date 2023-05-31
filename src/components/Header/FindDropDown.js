import React from "react";
import { useNavigate } from "react-router-dom";
import "./drop.css";
function FindDropDown({ showDropdown, setShowDropdown }) {
  const navigate = useNavigate();
  return (
    <span className={showDropdown ? "drop-menu" : "drop-menu-hidden"} onMouseEnter={() => setShowDropdown(true)}>
      <div
        className="drop-item"
        onClick={(e) => {
            navigate("/find/recommend/team", {
              state: {
                user: false,
                team: true,
              },
            });
          }}
      >
        {" "}
        팀 추천
      </div>
      <div
        className="drop-item"
        onClick={(e) => {
            navigate("/find/recommend/user", {
              state: {
                user: true,
                team: false,
              },
            });
          }}
      >
        {" "}
        유저 추천
      </div>
    </span>
  );
}
export default FindDropDown;
