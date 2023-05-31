import React from "react";
import { useState, useEffect } from "react";
import { Card } from "../Card/card";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MyTeamCard } from "../UserTeams/myTeamCard";
import "./invitedTeamList.css";
function InvitedTeamList() {
  const [invitedTeamList, setInvitedTeamList] = useState(null);
  const navigate = useNavigate();

  //로그인 토큰 저장
  const refresh_token = localStorage.getItem("refresh-token");
  const login_token = localStorage.getItem("login-token");
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/team-to-user/request-TeamToUser`, {
      headers: {
        "refresh-token": refresh_token,
        "login-token": login_token,
      },
    })
      .then((response) => response.json())
      .then((obj) => {
        setInvitedTeamList(obj.data);
        console.log(obj);
      });
  }, []);

  const agree = (matchId) => {
    const isTrue = window.confirm("신청을 수락하시겠습니까?");
    if (isTrue) {
      fetch(
        `${process.env.REACT_APP_API_URL}/team-to-user/${matchId}/approve`,
        {
          method: "POST",
          headers: {
            "refresh-token": refresh_token,
            "login-token": login_token,
          },
        }
      )
        .then((response) => response.json())
        .then((obj) => {
          setInvitedTeamList(
            invitedTeamList.filter((data) => {
              return data.matchId != matchId;
            })
          );
          alert("신청을 수락했습니다.")
        });
    }
  };
  const disagree = (matchId) => {
    const isTrue = window.confirm("신청을 거절하시겠습니까?");
    if (isTrue) {
      fetch(`${process.env.REACT_APP_API_URL}/team-to-user/${matchId}/refuse`, {
        method: "POST",
        headers: {
          "refresh-token": refresh_token,
          "login-token": login_token,
        },
      })
        .then((response) => response.json())
        .then((obj) => {
          setInvitedTeamList(
            invitedTeamList.filter((data) => {
              return data.matchId != matchId;
            })
          );
          alert("신청을 거절했습니다.")
        });
    }
  };
  const goTeam = (link) => {
    navigate(`/list/team/${link}`);
  };
  const 채팅 = (teamLeader,waitingId)=>{
    const chatWindow = window.open(
      `/chat?teamLeader=${teamLeader}&waitingId=${waitingId}&mode=user`,
      "",
      "width=450,height=650"
    );

    chatWindow.addEventListener("load", () => {
      const style = document.createElement("style");
      style.innerHTML = `
      /* 원하는 스타일 추가 */
      body {
        background-color: #f2f2f2;
      }
      /* 스크롤바 숨기기 */
      ::-webkit-scrollbar {
        display: none;
      }
    `;
      chatWindow.document.head.appendChild(style);

      // 오른쪽으로 100px 이동하고 아래로 200px 이동
      chatWindow.moveTo(100, 200);
    });
  }

  return (
    <div>
      {invitedTeamList == null ? (
        <div>팀요청이 없습니다.</div>
      ) : (
        invitedTeamList.map((data) => {
          console.log("Data", data);
          return (
            <div key={data.data.teamId} className="joined-team-card-ryu">
              <MyTeamCard team={data.data} />
              <div className="invited-btn-group">
                <button className="invited-chat-btn" onClick={()=>채팅(data.data.teamLeader,data.matchId)}>채팅</button>
                <button
                  className="invited-approve-btn"
                  onClick={() => agree(data.matchId)}
                >
                  수락
                </button>
                <button
                  className="invited-refuse-btn"
                  onClick={() => disagree(data.matchId)}
                >
                  거절
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default InvitedTeamList;
