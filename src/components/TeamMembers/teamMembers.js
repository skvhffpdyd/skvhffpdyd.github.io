import React, { useState, useEffect } from "react";
import { Select, MenuItem } from "@mui/material";
import "./teamMembers.css";
import Member from "./member";
import RequestFromUser from "./RequestFromUser";
import RequestSendToUser from "./requestListSendToUser";
import {useNavigate} from "react-router-dom";
function TeamMembers() {
  const navigate=useNavigate();
  const refresh_token = localStorage.getItem("refresh-token");
  const login_token = localStorage.getItem("login-token");
  const [memberList, setMemberList] = useState(null);
  const [mypagedata, setMyPageData] = useState();

  const [requestListFromUser, setRequestListFromUser] = useState(null);
  const [requestListSendToUser, setRequestListSendToUser] = useState(null);
  const [inputs, setInputs] = useState({
    selectedTeam: 0,
    menu: "소속된 팀원",
  });
  const { selectedTeam, menu } = inputs; //비구조화 할당

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/mypage`, {
      headers: {
        "refresh-token": refresh_token,
        "login-token": login_token,
      },
    })
      .then((response) => response.json())
      .then((obj) => {
        setMyPageData(obj.data);
        console.log(obj);
        fetch(
          `${process.env.REACT_APP_API_URL}/teams/getMembersFromMyTeam?teamId=${obj.data.myAllTeams[selectedTeam].teamId}`,
          {
            headers: {
              "refresh-token": refresh_token,
              "login-token": login_token, //헤더로 로그인 토큰 넣어야 삭제됨
            },
          }
        )
          .then((response) => response.json())
          .then((obj) => {
            console.log("obj", obj);
            setMemberList(obj.data);
            console.log("memberList", memberList);
          });
      });
  }, []);

  useEffect(() => {
    if (mypagedata != undefined) {
      if (menu == "소속된 팀원") {
        console.log("menu", menu);
        fetch(
          `${process.env.REACT_APP_API_URL}/teams/getMembersFromMyTeam?teamId=${mypagedata.myAllTeams[selectedTeam].teamId}`,
          {
            headers: {
              "refresh-token": refresh_token,
              "login-token": login_token, //헤더로 로그인 토큰 넣어야 삭제됨
            },
          }
        )
          .then((response) => response.json())
          .then((obj) => {
            console.log("obj", obj);
            setMemberList(obj.data);
            console.log("memberList", memberList);
          });

        console.log("팀원 가져오기");
      } else if (menu == "지원한 유저") {
        console.log("menu", menu);
        fetch(
          `${process.env.REACT_APP_API_URL}/user-to-team/allRequestFromUser?teamId=${mypagedata.myAllTeams[selectedTeam].teamId}`,
          {
            headers: {
              "refresh-token": refresh_token,
              "login-token": login_token, //헤더로 로그인 토큰 넣어야 삭제됨
            },
          }
        )
          .then((response) => response.json())
          .then((obj) => {
            console.log("obj", obj);
            setRequestListFromUser(obj.data);
            console.log("requestListFromUser", requestListFromUser);
          });
      } else {
        //팀이 초대한 유저 즉 유저정보를
        console.log("menu", menu);
        fetch(
          `${process.env.REACT_APP_API_URL}/team-to-user/allRequestTeamToUser?teamId=${mypagedata.myAllTeams[selectedTeam].teamId}`,
          {
            headers: {
              "refresh-token": refresh_token,
              "login-token": login_token, //헤더로 로그인 토큰 넣어야 삭제됨
            },
          }
        )
          .then((response) => response.json())
          .then((obj) => {
            console.log("obj", obj);
            setRequestListSendToUser(obj.data);
            console.log("requestListSendToUser", requestListSendToUser);
          });
      }
    } else {
      console.log(mypagedata);
    }
  }, [selectedTeam,menu]);


  const onChange = (e) => {
    const { name, value } = e.target;
    const nextInputs = {
      //spread 문법. 현재 상태의 내용이 이 자리로 온다.
      ...inputs,
      [name]: value,
    };
    //객체를 새로운 상태로 쓰겠다.
    setInputs(nextInputs);
  };
  if (mypagedata === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <div className="tm">      
      <div className="teamMembers_container">
      {mypagedata!=null && mypagedata.myAllTeams.length==0 ? <div className="no-teams">현재 팀이 없습니다! <div onClick={()=>navigate("/post/team")}>팀 만들기</div></div> :
        <>
        <div className="teamMembers_title">
          <label>팀별</label>
          <Select
            style={{ width: "50%" }}
            value={selectedTeam}
            onChange={onChange}
            name="selectedTeam"
          >
            {mypagedata.myAllTeams.map((data, index) => (
              <MenuItem key={index} value={index}>
                {data.title}
              </MenuItem>
            ))}
          </Select>
          <hr />
        </div>        
        <div className="teamMembers_body_top">        
          <h2>팀 구성원</h2>
          <Select
            style={{ width: "50%" }}
            value={menu}
            onChange={onChange}
            name="menu"
          >
            <MenuItem value="소속된 팀원">소속된 팀원</MenuItem>
            <MenuItem value="지원한 유저">지원한 유저</MenuItem>
            <MenuItem value="초대한 유저">초대한 유저</MenuItem>
          </Select>
        </div>
        
        <div className="memberList-container">  
            {memberList!=null && menu == "소속된 팀원"
              ? memberList.map((memberInfo) => <Member memberInfo={memberInfo} memberList={memberList} setMemberList={setMemberList} teamId={mypagedata.myAllTeams[selectedTeam].teamId}/>)
              : null}
            {requestListFromUser!=null  && menu == "지원한 유저"
              ? requestListFromUser.map((requestInfo,index) => <RequestFromUser requestInfo={requestInfo} requestListFromUser={requestListFromUser} setRequestListFromUser={setRequestListFromUser}/>)
              : null}
            {requestListSendToUser!=null && menu == "초대한 유저"
              ? requestListSendToUser.map((requestInfo,index) => <RequestSendToUser requestInfo={requestInfo} requestListSendToUser={requestListSendToUser} setRequestListSendToUser={setRequestListSendToUser}/>)
              : null}
        </div>        
        {mypagedata.myAllTeams == null ? "현재 팀이 없습니다." : null}
        </>
      }
      </div>   
    </div>
  );
}

export default TeamMembers;