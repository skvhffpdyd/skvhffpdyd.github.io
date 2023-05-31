import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MyTeamCard } from "./myTeamCard";

function AppliedTeamList() {
  const [appliedTeamsList, setAppliedTeamsList] = useState(null);
  const navigate = useNavigate();

  const refresh_token = localStorage.getItem("refresh-token");
  const login_token = localStorage.getItem("login-token");
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/user-to-team/all-my-request`, {
      headers: {
        "refresh-token": refresh_token,
        "login-token": login_token,
      },
    })
      .then((response) => response.json())
      .then((obj) => {
        setAppliedTeamsList(obj.data);
        console.log(obj);
      });
  }, []);

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
  const goTeam = (link) => {
    navigate(`/list/team/${link}`);
  };

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

  return (
    <div>
      {appliedTeamsList == null ? (
        <div>지원한 팀이 없습니다.</div>
      ) : (
        appliedTeamsList.map((data) => (
          <div key={data.info.teamId} className="joined-team-card-ryu">
            <MyTeamCard team={data.info} />
            <div className="joinedTeam-card-bottom">
              <p>수락 대기중</p>
              <button className="chatBtn" onClick={() => 채팅(data.info.teamLeader,data.id)}>
                채팅
              </button>
              <button className="exitBtn">취소</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default AppliedTeamList;
