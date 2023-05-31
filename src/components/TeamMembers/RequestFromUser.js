import React from "react";
import "./RequestFromUser.css";
function RequestFromUser({
  requestInfo,
  requestListFromUser,
  setRequestListFromUser,
}) {
  const matchId = requestInfo.id;
  const userInfo = requestInfo.info;
  const userMsg = requestInfo.message;
  const userField=requestInfo.field;
  const refresh_token = localStorage.getItem("refresh-token");
  const login_token = localStorage.getItem("login-token");
  const approveRequest = () => {
    fetch(`${process.env.REACT_APP_API_URL}/user-to-team/${matchId}/approve`, {
      method: "post",
      headers: {
        "refresh-token": refresh_token,
        "login-token": login_token, //헤더로 로그인 토큰 넣어야 삭제됨
      },
    })
      .then((response) => response.json())
      .then((obj) => {
        console.log("obj", obj);
        setRequestListFromUser(
          requestListFromUser.filter((data) => {
            return data.id != matchId;
          })
        );
      });
  };
  const refuseRequest = () => {
    fetch(`${process.env.REACT_APP_API_URL}/user-to-team/${matchId}/fuckyou`, {
      method: "post",
      headers: {
        "refresh-token": refresh_token,
        "login-token": login_token, //헤더로 로그인 토큰 넣어야 삭제됨
      },
    })
      .then((response) => response.json())
      .then((obj) => {
        console.log("obj", obj);
        setRequestListFromUser(
          requestListFromUser.filter((data) => {
            return data.id != matchId;
          })
        );
      });
  };
  return (
    <div className="request-container">
      <div className="re-user-field"><h3>{userField}</h3></div>
      <img className="re-user-image" src={userInfo.profileImageUrl} />
      <div className="re-user-info">
        <div className="re-user-nickname">{userInfo.nickname}</div>
        <hr style={{ marginTop: "10px", marginBottom: "5px" }} />
        <div className="flex js-between  pd-right">
          <div className="re-user-email">Email : {userInfo.email}</div>
          <div className="re-user-grade">{userInfo.grade}학년</div>
        </div>
        <div className="user-msg">"{userMsg}"</div>
      </div>
      <div className="btn-grp">
        <button
         className="re-user-chat-btn"
          onClick={() => {
            const chatWindow = window.open(
              `/chat?userId=${userInfo.id}&waitingId=${matchId}&nickname=${userInfo.nickname}&mode=team`,
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
          }}
        >
          채팅
        </button>
        <button class="re-user-approve-btn" onClick={approveRequest}>수락</button>
        <button class="re-user-refuse-btn"onClick={refuseRequest}>거절</button>
      </div>
    </div>
  );
}
export default RequestFromUser;