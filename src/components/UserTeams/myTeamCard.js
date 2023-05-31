import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {Chip } from "@mui/material";
import "./myTeamCard.css";
import PersonIcon from '@mui/icons-material/Person';
export const MyTeamCard = (team) => {
  const navigate = useNavigate();
  const [data, setData] = useState(team);
  const a=[];
  const langArr = Object.keys(team.team.teamLanguage).filter(
    (key) => key !== "id" && team.team.teamLanguage[key] !== 0
  );
  const frameworkArr = Object.keys(team.team.teamFramework).filter(
    (key) => key !== "id" && team.team.teamFramework[key] !== 0
  );
  const dbArr = Object.keys(team.team.teamDatabase).filter(
    (key) => key !== "id" && team.team.teamDatabase[key] !== 0
  );

  const combinedArr = langArr.concat(frameworkArr, dbArr);
  return (
    <div
      className="myTeam-card-wrapper"
      onClick={() => {
        navigate(`/list/team/${data.team.teamId}`);
      }}
    >
      <div className="myTeam-card-image">
        {data.team.imagePaths.length!=0? data.team.imagePaths.map((filename) => (
          <img src={`${filename}`} alt={filename} key={filename} />
        )) : <div className="default-image">No Image</div>}
      </div>
      
      <div className="myTeam-card-info">
        <div className="myTeam-card-title">
          <h3 className="myTeam-card-text">{data.team.title}</h3>
        </div>
        <div className="myTeam-card-keyword">
          <h5 className="myTeam-card-text-keyword">
            {data.team.teamKeyword == null
              ? "미확인"
              : `#${data.team.teamKeyword.category} / ${data.team.teamKeyword.field}`}
            {data.team.teamKeyword.sub == "none"
              ? null
              : ` ${data.team.teamKeyword.sub.toUpperCase()}반`}{" "}
          </h5>
        </div>
        <div className="myTeam-card-count">
        <div className="myTeam-card-text font-small right mg-top-5px"><Chip sx={{padding : "auto",height : "25px"}} icon={<PersonIcon fontSize="small"/>} label={data.team.currentTeamMemberCount}/></div>
        </div>
      </div>
    </div>
  );
};