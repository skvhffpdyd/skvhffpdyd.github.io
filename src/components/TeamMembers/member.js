import React from "react";
import GroupIcon from "@mui/icons-material/Group";
import GroupRemoveIcon from "@mui/icons-material/GroupRemove";
import SearchIcon from "@mui/icons-material/Search";
import "./member.css";
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import DeleteIcon from '@mui/icons-material/Delete';
import CrownImg from "../../assets/images/crown.png";
import human from "../../assets/images/human.png";
function Member({ memberInfo,teamId,memberList,setMemberList }) {
  const userId = localStorage.getItem("userId");
  const refresh_token = localStorage.getItem("refresh-token");
  const login_token = localStorage.getItem("login-token");
  console.log("memberInfo",memberInfo);
  console.log("teamId",teamId)
  const deleteMember = (teamId) => {
    fetch(`${process.env.REACT_APP_API_URL}/teams/deleteMember?teamId=${teamId}&userId=${memberInfo.id}`,{
      method : "post",
      headers: {
        "refresh-token": refresh_token,
        "login-token": login_token, //헤더로 로그인 토큰 넣어야 삭제됨
      },
    }).then(res => res.json()).
    then(obj=>{
      setMemberList(memberList.filter(data=>{
        return memberInfo.id != data.id}
      ))
    })
      
    
  };
  return (
    <div className="member">
      <div className="member-container">
        <div className="request-top">
          {userId == memberInfo.id ? (
            <div style={{ height: "2em" }}></div>
          ) : (
            // <div className="delete-member">delete</div>
            <PersonRemoveIcon onClick={()=>deleteMember(teamId)}/>
          )}
        </div>
        <img className="user-image" src={memberInfo.profileImageUrl} />
        <div className="user-nickname">
          {userId == memberInfo.id ? (
            <>
              <div className="member-role">
                <img src={CrownImg} width={30} />
              </div>
            </>
          ) : (
            <>
              <div className="member-role">
                <img src={human} width={20} />
              </div>
            </>
          )}
          {memberInfo.nickname}
        </div>

        <div className="user-info">
          <div className="grid-50-50">
            <div className="user-email">{memberInfo.email}</div>
            <div className="user-grade">{memberInfo.grade}학년</div>
          </div>
          <div className="user-keywords">
            {memberInfo.memberKeywords.map((keyword) => (
              <div className="user-keyword">
                {`${keyword.category}/${keyword.field}${
                  keyword.sub == "none" ? "" : "(" + keyword.sub + ")"
                }`}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Member;
