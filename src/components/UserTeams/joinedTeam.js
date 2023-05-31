import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { MyTeamCard } from "./myTeamCard"
import { useNavigate } from 'react-router-dom';
import "./joinedTeam.css"
function JoinedTeam(){
  const refresh_token = localStorage.getItem("refresh-token");
  const login_token = localStorage.getItem("login-token");
  const navigate = useNavigate();

  const [joinedTeams, setJoinedTeams] = useState([]); 
  useEffect(() => {           
    fetch(`${process.env.REACT_APP_API_URL}/teams/allMyTeams`, {
      headers: {
        "refresh-token": refresh_token,
        "login-token": login_token,
      },
    })
      .then((response) => response.json())
      .then((obj) => {
        console.log(obj);
        setJoinedTeams(obj.data);
      });
}, []);
  
    const 팀나가기=(teamId)=>{
        fetch(`${process.env.REACT_APP_API_URL}/teams/deleteMember?teamId=${teamId}&userId=${localStorage.getItem("userId")}`, {
          method:"POST",  
          headers: {
              
              "refresh-token": refresh_token,
              "login-token": login_token,
            },
          })
            .then((response) => response.json())
            .then((obj) => {
              console.log(obj);
              alert(obj.message);
              setJoinedTeams(joinedTeams.filter(data=>{
                return data.teamId!=teamId
            }))
      });
    }
    const 채팅=(data)=>{
      window.open(`/chat?waitingId=${data.teamId}&nickname=${localStorage.getItem("nickname")}&mode=room`, "_blank", "width=450,height=650");
    }
    const goTeam = (link) => {
      navigate(`/list/team/${link}`);
  }

  function isUrl(str) {
    const pattern = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z0-9]{2,4}.*$/i;
    return pattern.test(str);
  }
  function makeLink(str) {
    // 정규표현식을 이용해 문자열에서 URL 패턴을 찾아내고 링크로 변환
    const regex = /(https?:\/\/[^\s]+)/g;
    return str.replace(
      regex,
      (match) => `<a href="${match}" target="_blank">${match}</a>`
    );
  }
    
    return(
        <div className="joined-team-container" >
            {joinedTeams==null ?<div>소속된 팀이 없습니다.</div> : joinedTeams.map(data => (
                <div key={data.teamId} className="joined-team-card-ryu" > 
                    <MyTeamCard team={data} />                    
                   <div className="joinedTeam-card-bottom">
                    {isUrl(data.teamURL)==true ? <span className="teamURL"
                      dangerouslySetInnerHTML={{
                        __html: makeLink(data.teamURL),
                      }}
                    /> : <span className="teamURL">{data.teamURL}</span>}
                    <div className="joinedTeam-btn-group">
                     <button className="chatBtn" onClick={() => 채팅(data)}>채팅</button>
                     <button className="exitBtn" onClick={() => 팀나가기(data.teamId)}>팀나가기</button>
                     </div>
                     </div>
                </div>
            ))}
        </div>
    );
}
export default JoinedTeam;